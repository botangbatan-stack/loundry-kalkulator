// Konfigurasi data bisnis toko, katalog layanan, layanan tambahan, dan pengaturan tampilan LaundryCalc.

export type ServiceCode = 'L01' | 'L02' | 'L03';
export type AddOnCode = 'T01' | 'T02';
export type CalculationType = 'flat' | 'per_billed_kg';

export interface MainService {
  code: ServiceCode;
  name: string;
  pricePerKg: number;
  durationDays: number;
  description: string;
}

export interface AddOnService {
  code: AddOnCode;
  name: string;
  price: number;
  calculationType: CalculationType;
  notes: string;
}

export const STORE_INFO = {
  appName: 'LaundryCalc',
  name: 'Laundry UMKM',
  whatsappNumber: '6281234567890',
  openingHours: '08:00 - 20:00 WIB',
  pickupHours: '09:00 - 17:00 WIB',
  pickupRadiusMaxKm: 5,
  minimumChargeKg: 3.0,
} as const;

export const MAIN_SERVICES: readonly MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    pricePerKg: 6000,
    durationDays: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    pricePerKg: 8000,
    durationDays: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    pricePerKg: 15000,
    durationDays: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
] as const;

export const ADD_ONS: readonly AddOnService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculationType: 'flat',
    notes: 'Area penjemputan radius max 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculationType: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
] as const;

export const UI_CONFIG = {
  defaultServiceCode: 'L01' as ServiceCode,
  weightStepKg: 0.1,
  minWeightInputKg: 0.1,
  accentColor: 'blue' as const,
  userPronoun: 'Anda' as const,
  layoutMode: 'stepped' as const,
  primaryActionPosition: 'sticky_bottom' as const,
  useImages: false,
} as const;
