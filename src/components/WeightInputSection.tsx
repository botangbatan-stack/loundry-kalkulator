// Komponen input berat cucian, tombol penyesuaian cepat, dan notifikasi minimum charge sesuai FT-02.
import {AlertCircle, Info, Minus, Plus} from 'lucide-react';
import type {RefObject} from 'react';
import {STORE_INFO, type MainService} from '../config';
import {
  calculateBilledWeight,
  calculateMainServiceCost,
  isMinimumChargeApplied,
  isValidActualWeight,
  parseWeightInput,
} from '../lib/calculator';
import {formatBeratKg, formatRupiah} from '../lib/format';

interface WeightInputSectionProps {
  selectedService: MainService;
  weightInput: string;
  weightError: string | null;
  inputRef: RefObject<HTMLInputElement | null>;
  onChangeWeightInput: (nextValue: string) => void;
}

const STEP_DELTA_KG = 0.5;

export function WeightInputSection({
  selectedService,
  weightInput,
  weightError,
  inputRef,
  onChangeWeightInput,
}: WeightInputSectionProps) {
  const parsedWeight = parseWeightInput(weightInput);
  const validWeight = isValidActualWeight(parsedWeight);
  const minChargeActive = isMinimumChargeApplied(parsedWeight);
  const billedWeight = validWeight ? calculateBilledWeight(parsedWeight) : null;
  const mainCost =
    billedWeight !== null
      ? calculateMainServiceCost(billedWeight, selectedService.pricePerKg)
      : null;

  const handleAdjustWeight = (delta: number) => {
    const base = validWeight ? parsedWeight : 0;
    const nextRaw = Math.round((base + delta) * 10) / 10;
    const clamped = Math.max(0.1, nextRaw);
    onChangeWeightInput(formatBeratKg(clamped));
  };

  const canDecrement = validWeight && parsedWeight > 0.1;

  return (
    <section aria-labelledby="judul-berat-cucian">
      <h2
        id="judul-berat-cucian"
        className="text-lg font-semibold text-neutral-900"
      >
        Berat Cucian
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Paket terpilih: {selectedService.name} ({formatRupiah(selectedService.pricePerKg)}/kg).
      </p>

      <div className="mt-4 rounded-2xl bg-white p-5">
        <label
          htmlFor="input-berat-cucian"
          className="block text-sm font-medium text-neutral-900"
        >
          Perkiraan berat cucian (kg)
        </label>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleAdjustWeight(-STEP_DELTA_KG)}
            disabled={!canDecrement}
            aria-label="Kurangi 0,5 kg"
            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
          >
            <Minus className="h-4 w-4" />
          </button>

          <input
            ref={inputRef}
            id="input-berat-cucian"
            name="weight"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={weightInput}
            onChange={(event) => onChangeWeightInput(event.target.value)}
            placeholder="Contoh: 2,5"
            aria-invalid={Boolean(weightError)}
            aria-describedby={
              weightError ? 'bantuan-berat error-berat' : 'bantuan-berat'
            }
            className={`min-h-[44px] w-full rounded-xl border px-4 text-base text-neutral-900 placeholder:text-neutral-500 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              weightError
                ? 'border-red-700 bg-red-50'
                : 'border-neutral-200 bg-white'
            }`}
          />

          <button
            type="button"
            onClick={() => handleAdjustWeight(STEP_DELTA_KG)}
            aria-label="Tambah 0,5 kg"
            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <p id="bantuan-berat" className="mt-2 text-sm text-neutral-600">
          Isi angka dalam kg, contoh 2,5 atau 4.
        </p>

        {weightError && (
          <div
            id="error-berat"
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{weightError}</span>
          </div>
        )}

        {minChargeActive && (
          <div
            role="status"
            className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Ketentuan minimum {formatBeratKg(STORE_INFO.minimumChargeKg)} kg
              berlaku. Berat ditagih menjadi{' '}
              {formatBeratKg(STORE_INFO.minimumChargeKg)} kg.
            </span>
          </div>
        )}

        {validWeight && billedWeight !== null && mainCost !== null && (
          <div className="mt-4 border-t border-neutral-200 pt-4 space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-neutral-600">Berat ditagih</span>
              <span className="font-semibold text-neutral-900 tabular-nums">
                {formatBeratKg(billedWeight)} kg
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-neutral-600">Biaya layanan utama</span>
              <span className="text-base font-semibold text-blue-700 tabular-nums">
                {formatRupiah(mainCost)}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
