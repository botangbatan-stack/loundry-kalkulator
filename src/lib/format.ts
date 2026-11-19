// Fungsi pemformatan angka tunggal (Rupiah dan berat) untuk seluruh aplikasi LaundryCalc.

/**
 * Memformat bilangan bulat Rupiah tanpa spasi setelah Rp dan titik pemisah ribuan.
 * Contoh: 18000 -> "Rp18.000"
 */
export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(rounded);
  return `Rp${formatted}`;
}

/**
 * Memformat angka berat dalam kg memakai koma dan tanpa nol berlebih di belakang.
 * Contoh: 4.5 -> "4,5", 3.0 -> "3"
 */
export function formatBeratKg(weightKg: number): string {
  const rounded = Math.round(weightKg * 10) / 10;
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(rounded);
}
