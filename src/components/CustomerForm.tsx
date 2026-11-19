// Komponen formulir data pemesan (Nama, Alamat kondisional, dan Catatan) sesuai FT-05.
import {AlertCircle, CheckCircle2} from 'lucide-react';
import type {RefObject} from 'react';
import {STORE_INFO} from '../config';
import {
  SELF_DROPOFF_LABEL,
  type CustomerFormErrors,
  type CustomerFormInput,
} from '../lib/validation';

interface CustomerFormProps {
  values: CustomerFormInput;
  errors: CustomerFormErrors;
  isDeliveryActive: boolean;
  isReadyNoticeVisible: boolean;
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
  onChangeField: (field: keyof CustomerFormInput, value: string) => void;
}

export function CustomerForm({
  values,
  errors,
  isDeliveryActive,
  isReadyNoticeVisible,
  nameInputRef,
  addressInputRef,
  onChangeField,
}: CustomerFormProps) {
  return (
    <section aria-labelledby="judul-data-pemesan">
      <h2
        id="judul-data-pemesan"
        className="text-lg font-semibold text-neutral-900"
      >
        Data Pemesan
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Lengkapi data Anda sebelum mengirim pesanan.
      </p>

      <div className="mt-4 rounded-2xl bg-white p-5 space-y-5">
        <div>
          <label
            htmlFor="input-nama-pemesan"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama Pemesan
          </label>
          <input
            ref={nameInputRef}
            id="input-nama-pemesan"
            name="customerName"
            type="text"
            autoComplete="name"
            value={values.customerName}
            onChange={(event) =>
              onChangeField('customerName', event.target.value)
            }
            placeholder="Contoh: Budi Santoso"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={
              errors.customerName ? 'error-nama-pemesan' : undefined
            }
            className={`mt-2 min-h-[44px] w-full rounded-xl border px-4 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              errors.customerName
                ? 'border-red-700 bg-red-50'
                : 'border-neutral-200 bg-white'
            }`}
          />
          {errors.customerName && (
            <div
              id="error-nama-pemesan"
              role="alert"
              className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errors.customerName}</span>
            </div>
          )}
        </div>

        {isDeliveryActive ? (
          <div>
            <label
              htmlFor="input-alamat-jemput"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat Penjemputan
            </label>
            <textarea
              ref={addressInputRef}
              id="input-alamat-jemput"
              name="pickupAddress"
              autoComplete="street-address"
              rows={3}
              value={values.pickupAddress}
              onChange={(event) =>
                onChangeField('pickupAddress', event.target.value)
              }
              placeholder="Contoh: Jl. Melati No. 12, RT 02/03"
              aria-invalid={Boolean(errors.pickupAddress)}
              aria-describedby={
                errors.pickupAddress
                  ? 'bantuan-alamat error-alamat-jemput'
                  : 'bantuan-alamat'
              }
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                errors.pickupAddress
                  ? 'border-red-700 bg-red-50'
                  : 'border-neutral-200 bg-white'
              }`}
            />
            <p id="bantuan-alamat" className="mt-1 text-sm text-neutral-600">
              Area penjemputan maksimal radius {STORE_INFO.pickupRadiusMaxKm}{' '}
              km.
            </p>
            {errors.pickupAddress && (
              <div
                id="error-alamat-jemput"
                role="alert"
                className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errors.pickupAddress}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="border-y border-neutral-200 py-3">
            <p className="text-sm font-medium text-neutral-900">
              Metode Pengantaran
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              {SELF_DROPOFF_LABEL}
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor="input-catatan-khusus"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan Khusus
          </label>
          <textarea
            id="input-catatan-khusus"
            name="notes"
            autoComplete="off"
            rows={2}
            value={values.notes}
            onChange={(event) => onChangeField('notes', event.target.value)}
            placeholder="Contoh: Baju dinas dan sutra jangan dicampur"
            aria-describedby="bantuan-catatan"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
          <p id="bantuan-catatan" className="mt-1 text-sm text-neutral-600">
            Opsional, contoh: pisahkan baju putih.
          </p>
        </div>

        {isReadyNoticeVisible && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Data pemesan lengkap dan siap dikirim.</span>
          </div>
        )}
      </div>
    </section>
  );
}
