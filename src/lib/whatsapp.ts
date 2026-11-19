// Fungsi penyusun teks template pesanan dan tautan deep-link WhatsApp sesuai BL-03 PRD.
import {STORE_INFO, type MainService} from '../config';
import type {CostBreakdown, SelectedAddOns} from './calculator';
import {formatBeratKg, formatRupiah} from './format';

export interface WhatsAppOrderParams {
  customerName: string;
  service: MainService;
  actualWeightKg: number;
  breakdown: CostBreakdown;
  selectedAddOns: SelectedAddOns;
  pickupAddress: string;
  notes: string;
}

/**
 * Menyusun pesan WhatsApp mengikuti template baku pada PRD Bagian 7.
 */
export function buildWhatsAppOrderMessage(params: WhatsAppOrderParams): string {
  const {
    customerName,
    service,
    actualWeightKg,
    breakdown,
    selectedAddOns,
    pickupAddress,
    notes,
  } = params;

  const billedWeightKg = breakdown.billedWeightKg ?? actualWeightKg;
  const deliveryLine = selectedAddOns.T01
    ? `Ya (+${formatRupiah(breakdown.deliveryCost)})`
    : 'Tidak';
  const fragranceLine = selectedAddOns.T02
    ? `Ya (+${formatRupiah(breakdown.fragranceCost)})`
    : 'Tidak';

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${customerName}`,
    `*Layanan Utama:* ${service.name}`,
    `*Estimasi Berat:* ${formatBeratKg(actualWeightKg)} kg (Berat Ditagih: ${formatBeratKg(billedWeightKg)} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryLine}`,
    `- Pewangi Premium: ${fragranceLine}`,
    '',
    `*Alamat Penjemputan:* ${pickupAddress}`,
    `*Catatan Khusus:* ${notes}`,
    '',
    `*Estimasi Total Biaya:* *${formatRupiah(breakdown.totalEstimate)}*`,
    '',
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

/**
 * Membuat tautan resmi wa.me dengan pesan yang sudah di-encode secara aman.
 */
export function buildWhatsAppDeepLink(
  message: string,
  whatsappNumber: string = STORE_INFO.whatsappNumber,
): string {
  const sanitizedNumber = whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
}
