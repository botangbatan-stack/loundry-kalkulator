// Fungsi validasi dan normalisasi formulir data pemesan untuk LaundryCalc.

export interface CustomerFormInput {
  customerName: string;
  pickupAddress: string;
  notes: string;
}

export interface CustomerFormErrors {
  customerName?: string;
  pickupAddress?: string;
}

export interface CustomerValidationResult {
  isValid: boolean;
  errors: CustomerFormErrors;
  firstErrorField: 'customerName' | 'pickupAddress' | null;
  normalized: {
    customerName: string;
    pickupAddress: string;
    notes: string;
  };
}

export const CUSTOMER_NAME_ERROR =
  'Masukkan nama Anda, contoh: Budi Santoso.';
export const PICKUP_ADDRESS_ERROR =
  'Masukkan alamat penjemputan (maks 5 km), contoh: Jl. Melati No. 12.';
export const SELF_DROPOFF_LABEL = 'Antar Sendiri ke Toko';

/**
 * Memvalidasi input data pemesan setelah menghapus spasi di awal dan akhir teks.
 */
export function validateCustomerForm(
  input: CustomerFormInput,
  requiresPickupAddress: boolean,
): CustomerValidationResult {
  const customerName = input.customerName.trim();
  const pickupAddressRaw = input.pickupAddress.trim();
  const notesRaw = input.notes.trim();

  const errors: CustomerFormErrors = {};

  if (!customerName) {
    errors.customerName = CUSTOMER_NAME_ERROR;
  }

  if (requiresPickupAddress && !pickupAddressRaw) {
    errors.pickupAddress = PICKUP_ADDRESS_ERROR;
  }

  const firstErrorField = errors.customerName
    ? 'customerName'
    : errors.pickupAddress
      ? 'pickupAddress'
      : null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
    normalized: {
      customerName,
      pickupAddress: requiresPickupAddress
        ? pickupAddressRaw
        : SELF_DROPOFF_LABEL,
      notes: notesRaw || '-',
    },
  };
}
