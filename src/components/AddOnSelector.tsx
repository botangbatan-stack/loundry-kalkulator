// Komponen pilihan layanan tambahan (Antar-Jemput dan Pewangi Premium) sesuai FT-03.
import {Check} from 'lucide-react';
import {ADD_ONS, type AddOnCode} from '../config';
import {calculateSingleAddOnCost, type SelectedAddOns} from '../lib/calculator';
import {formatRupiah} from '../lib/format';

interface AddOnSelectorProps {
  selectedAddOns: SelectedAddOns;
  billedWeightKg: number | null;
  onToggleAddOn: (code: AddOnCode) => void;
}

export function AddOnSelector({
  selectedAddOns,
  billedWeightKg,
  onToggleAddOn,
}: AddOnSelectorProps) {
  return (
    <section aria-labelledby="judul-layanan-tambahan" className="mt-6">
      <h2
        id="judul-layanan-tambahan"
        className="text-lg font-semibold text-neutral-900"
      >
        Layanan Tambahan (Opsional)
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Tambahkan layanan sesuai kebutuhan Anda.
      </p>

      <div className="mt-4 space-y-3">
        {ADD_ONS.map((addOn) => {
          const isChecked = selectedAddOns[addOn.code];
          const computedCost = calculateSingleAddOnCost(
            addOn.code,
            isChecked,
            billedWeightKg,
          );
          const inputId = `addon-${addOn.code}`;

          const rateLabel =
            addOn.calculationType === 'flat'
              ? `+${formatRupiah(addOn.price)}`
              : `+${formatRupiah(addOn.price)}/kg ditagih`;

          return (
            <label
              key={addOn.code}
              htmlFor={inputId}
              className={`flex min-h-[44px] cursor-pointer items-start justify-between gap-3 rounded-2xl border p-4 transition-colors duration-150 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                isChecked
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                id={inputId}
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleAddOn(addOn.code)}
                className="sr-only"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-base font-semibold text-neutral-900">
                    {addOn.name}
                  </span>
                  <span className="text-sm font-semibold text-blue-700 tabular-nums whitespace-nowrap">
                    {rateLabel}
                  </span>
                </div>

                <p className="mt-1 text-sm text-neutral-600">{addOn.notes}</p>

                {isChecked &&
                  addOn.calculationType === 'per_billed_kg' &&
                  billedWeightKg !== null && (
                    <p className="mt-2 text-sm font-medium text-blue-700 tabular-nums">
                      Tambahan pewangi: +{formatRupiah(computedCost)}
                    </p>
                  )}
              </div>

              <span
                aria-hidden="true"
                className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                  isChecked
                    ? 'border-blue-700 bg-blue-700 text-white'
                    : 'border-neutral-300 bg-white text-transparent'
                }`}
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
