// Fungsi perhitungan berat ditagih, validasi berat, dan biaya layanan serta tambahan LaundryCalc.
import {ADD_ONS, STORE_INFO, UI_CONFIG, type AddOnCode} from '../config';

export type SelectedAddOns = Record<AddOnCode, boolean>;

export interface CostBreakdown {
  billedWeightKg: number | null;
  mainCost: number;
  deliveryCost: number;
  fragranceCost: number;
  addOnsCost: number;
  totalEstimate: number;
}

/**
 * Mengurai teks input berat (menerima koma maupun titik), menghapus spasi,
 * dan membulatkan ke kelipatan 0,1 kg terdekat. Mengembalikan null jika bukan angka valid.
 */
export function parseWeightInput(rawValue: string): number | null {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return null;
  }

  const normalized = trimmed.replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.round(parsed * 10) / 10;
}

/**
 * Memeriksa apakah berat aktual memenuhi batas minimal input yang valid (>= 0,1 kg).
 */
export function isValidActualWeight(weightKg: number | null): weightKg is number {
  return weightKg !== null && weightKg >= UI_CONFIG.minWeightInputKg;
}

/**
 * Menghitung berat ditagih berdasarkan aturan minimum charge (minimal 3 kg).
 */
export function calculateBilledWeight(actualWeightKg: number): number {
  return Math.max(STORE_INFO.minimumChargeKg, actualWeightKg);
}

/**
 * Menentukan apakah ketentuan minimum charge 3 kg sedang diberlakukan.
 */
export function isMinimumChargeApplied(actualWeightKg: number | null): boolean {
  return (
    isValidActualWeight(actualWeightKg) &&
    actualWeightKg < STORE_INFO.minimumChargeKg
  );
}

/**
 * Menghitung biaya layanan utama sebagai bilangan bulat Rupiah.
 */
export function calculateMainServiceCost(
  billedWeightKg: number,
  pricePerKg: number,
): number {
  return Math.round(billedWeightKg * pricePerKg);
}

/**
 * Menghitung biaya satu layanan tambahan berdasarkan tipe perhitungannya.
 */
export function calculateSingleAddOnCost(
  code: AddOnCode,
  isActive: boolean,
  billedWeightKg: number | null,
): number {
  if (!isActive) {
    return 0;
  }

  const addOn = ADD_ONS.find((item) => item.code === code);
  if (!addOn) {
    return 0;
  }

  if (addOn.calculationType === 'flat') {
    return addOn.price;
  }

  if (billedWeightKg === null) {
    return 0;
  }

  return Math.round(billedWeightKg * addOn.price);
}

/**
 * Menghitung rincian lengkap biaya utama, biaya tambahan, dan total estimasi.
 */
export function calculateOrderBreakdown(
  actualWeightKg: number | null,
  pricePerKg: number,
  selectedAddOns: SelectedAddOns,
): CostBreakdown {
  const validWeight = isValidActualWeight(actualWeightKg);
  const billedWeightKg = validWeight
    ? calculateBilledWeight(actualWeightKg)
    : null;
  const mainCost =
    billedWeightKg !== null
      ? calculateMainServiceCost(billedWeightKg, pricePerKg)
      : 0;
  const deliveryCost = calculateSingleAddOnCost(
    'T01',
    selectedAddOns.T01,
    billedWeightKg,
  );
  const fragranceCost = calculateSingleAddOnCost(
    'T02',
    selectedAddOns.T02,
    billedWeightKg,
  );
  const addOnsCost = deliveryCost + fragranceCost;
  const totalEstimate = mainCost + addOnsCost;

  return {
    billedWeightKg,
    mainCost,
    deliveryCost,
    fragranceCost,
    addOnsCost,
    totalEstimate,
  };
}
