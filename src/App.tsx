// Komponen utama aplikasi LaundryCalc yang mengatur langkah bertahap dan alur pemesanan.
import {useRef, useState} from 'react';
import {AddOnSelector} from './components/AddOnSelector';
import {CustomerForm} from './components/CustomerForm';
import {FloatingPriceSummary} from './components/FloatingPriceSummary';
import {ServiceCatalog} from './components/ServiceCatalog';
import {StepIndicator, type StepItem} from './components/StepIndicator';
import {WeightInputSection} from './components/WeightInputSection';
import {WhatsAppPreviewPanel} from './components/WhatsAppPreviewPanel';
import {
  MAIN_SERVICES,
  STORE_INFO,
  UI_CONFIG,
  type AddOnCode,
  type ServiceCode,
} from './config';
import {
  calculateOrderBreakdown,
  isValidActualWeight,
  parseWeightInput,
  type SelectedAddOns,
} from './lib/calculator';
import {formatBeratKg} from './lib/format';
import {
  SELF_DROPOFF_LABEL,
  validateCustomerForm,
  type CustomerFormErrors,
  type CustomerFormInput,
} from './lib/validation';
import {
  buildWhatsAppDeepLink,
  buildWhatsAppOrderMessage,
} from './lib/whatsapp';

const STEPS: readonly StepItem[] = [
  {number: 1, label: 'Layanan'},
  {number: 2, label: 'Berat'},
  {number: 3, label: 'Pemesan'},
];

const WEIGHT_ERROR_MESSAGE =
  'Masukkan berat minimal 0,1 kg, contoh: 2,5.';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceCode, setSelectedServiceCode] = useState<ServiceCode>(
    UI_CONFIG.defaultServiceCode,
  );
  const [weightInput, setWeightInput] = useState<string>('');
  const [weightError, setWeightError] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOns>({
    T01: false,
    T02: false,
  });
  const [customerForm, setCustomerForm] = useState<CustomerFormInput>({
    customerName: '',
    pickupAddress: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<CustomerFormErrors>({});
  const [hasSubmittedOrder, setHasSubmittedOrder] = useState<boolean>(false);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null);

  const selectedService =
    MAIN_SERVICES.find((item) => item.code === selectedServiceCode) ??
    MAIN_SERVICES[0];

  const parsedWeight = parseWeightInput(weightInput);
  const hasValidWeight = isValidActualWeight(parsedWeight);
  const breakdown = calculateOrderBreakdown(
    parsedWeight,
    selectedService.pricePerKg,
    selectedAddOns,
  );

  const maxReachableStep = hasValidWeight ? 3 : 2;

  const previewMessage = buildWhatsAppOrderMessage({
    customerName: customerForm.customerName.trim() || '[Nama Pemesan]',
    service: selectedService,
    actualWeightKg: hasValidWeight ? parsedWeight : 0,
    breakdown,
    selectedAddOns,
    pickupAddress: selectedAddOns.T01
      ? customerForm.pickupAddress.trim() || '[Alamat Penjemputan]'
      : SELF_DROPOFF_LABEL,
    notes: customerForm.notes.trim() || '-',
  });
  const previewWhatsappUrl = buildWhatsAppDeepLink(previewMessage);

  const handleWeightChange = (nextValue: string) => {
    setWeightInput(nextValue);
    setHasSubmittedOrder(false);
    if (weightError) {
      const nextParsed = parseWeightInput(nextValue);
      if (isValidActualWeight(nextParsed)) {
        setWeightError(null);
      }
    }
  };

  const handleToggleAddOn = (code: AddOnCode) => {
    setSelectedAddOns((prev) => {
      const next = {...prev, [code]: !prev[code]};
      if (code === 'T01' && !next.T01) {
        setFormErrors((prevErr) => ({...prevErr, pickupAddress: undefined}));
      }
      return next;
    });
    setHasSubmittedOrder(false);
  };

  const handleChangeCustomerField = (
    field: keyof CustomerFormInput,
    value: string,
  ) => {
    setCustomerForm((prev) => ({...prev, [field]: value}));
    setHasSubmittedOrder(false);
    if (field === 'customerName' && formErrors.customerName && value.trim()) {
      setFormErrors((prev) => ({...prev, customerName: undefined}));
    }
    if (field === 'pickupAddress' && formErrors.pickupAddress && value.trim()) {
      setFormErrors((prev) => ({...prev, pickupAddress: undefined}));
    }
  };

  const handleProceedFromStep2 = () => {
    const currentParsed = parseWeightInput(weightInput);
    if (!isValidActualWeight(currentParsed)) {
      setWeightError(WEIGHT_ERROR_MESSAGE);
      weightInputRef.current?.focus();
      return;
    }

    setWeightInput(formatBeratKg(currentParsed));
    setWeightError(null);
    setCurrentStep(3);
  };

  const handleStepSelect = (targetStep: number) => {
    if (targetStep === 3 && !hasValidWeight) {
      setCurrentStep(2);
      setWeightError(WEIGHT_ERROR_MESSAGE);
      return;
    }
    setCurrentStep(targetStep);
  };

  const handleSendToWhatsApp = () => {
    if (!hasValidWeight) {
      setCurrentStep(2);
      setWeightError(WEIGHT_ERROR_MESSAGE);
      return;
    }

    const validation = validateCustomerForm(customerForm, selectedAddOns.T01);
    setFormErrors(validation.errors);
    if (!validation.isValid) {
      setHasSubmittedOrder(false);
      if (validation.firstErrorField === 'customerName') {
        nameInputRef.current?.focus();
      } else if (validation.firstErrorField === 'pickupAddress') {
        addressInputRef.current?.focus();
      }
      return;
    }

    const finalMessage = buildWhatsAppOrderMessage({
      customerName: validation.normalized.customerName,
      service: selectedService,
      actualWeightKg: parsedWeight,
      breakdown,
      selectedAddOns,
      pickupAddress: validation.normalized.pickupAddress,
      notes: validation.normalized.notes,
    });
    const finalUrl = buildWhatsAppDeepLink(finalMessage);

    setHasSubmittedOrder(true);

    const anchor = document.createElement('a');
    anchor.href = finalUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const renderPrimaryAction = () => {
    if (currentStep === 1) {
      return (
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="min-h-[44px] flex-1 rounded-xl bg-blue-700 px-5 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
        >
          Lanjut Isi Berat
        </button>
      );
    }

    if (currentStep === 2) {
      return (
        <button
          type="button"
          onClick={handleProceedFromStep2}
          className="min-h-[44px] flex-1 rounded-xl bg-blue-700 px-5 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
        >
          Lanjut ke Pemesan
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleSendToWhatsApp}
        className="min-h-[44px] flex-1 rounded-xl bg-blue-700 px-5 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
      >
        Kirim ke WhatsApp
      </button>
    );
  };

  const secondaryAction =
    currentStep > 1 ? (
      <button
        type="button"
        onClick={() => setCurrentStep(currentStep - 1)}
        className="min-h-[44px] shrink-0 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
      >
        Kembali
      </button>
    ) : undefined;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-40">
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-neutral-900">
              {STORE_INFO.appName}
            </h1>
            <span className="text-sm text-neutral-600">{STORE_INFO.name}</span>
          </div>
          <div className="mt-2">
            <StepIndicator
              steps={STEPS}
              currentStep={currentStep}
              maxReachableStep={Math.min(
                currentStep === 1 ? 2 : maxReachableStep,
                3,
              )}
              onStepSelect={handleStepSelect}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {currentStep === 1 && (
          <ServiceCatalog
            selectedServiceCode={selectedServiceCode}
            onSelectService={(code) => {
              setSelectedServiceCode(code);
              setHasSubmittedOrder(false);
            }}
          />
        )}

        {currentStep === 2 && (
          <>
            <WeightInputSection
              selectedService={selectedService}
              weightInput={weightInput}
              weightError={weightError}
              inputRef={weightInputRef}
              onChangeWeightInput={handleWeightChange}
            />
            <AddOnSelector
              selectedAddOns={selectedAddOns}
              billedWeightKg={breakdown.billedWeightKg}
              onToggleAddOn={handleToggleAddOn}
            />
          </>
        )}

        {currentStep === 3 && (
          <>
            <CustomerForm
              values={customerForm}
              errors={formErrors}
              isDeliveryActive={selectedAddOns.T01}
              isReadyNoticeVisible={false}
              nameInputRef={nameInputRef}
              addressInputRef={addressInputRef}
              onChangeField={handleChangeCustomerField}
            />
            <WhatsAppPreviewPanel
              message={previewMessage}
              whatsappUrl={previewWhatsappUrl}
              hasSubmitted={hasSubmittedOrder}
            />
          </>
        )}
      </main>

      <FloatingPriceSummary
        selectedService={selectedService}
        selectedAddOns={selectedAddOns}
        breakdown={breakdown}
        primaryAction={renderPrimaryAction()}
        secondaryAction={secondaryAction}
      />
    </div>
  );
}
