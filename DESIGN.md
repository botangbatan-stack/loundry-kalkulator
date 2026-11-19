# Keputusan Desain — LaundryCalc

Dokumen ini mencatat seluruh keputusan desain yang disepakati pada Tahap 2 serta aturan tampilan yang berlaku untuk aplikasi **LaundryCalc**.

## Keputusan Desain Pengguna

| Aspek | Pilihan Disetujui | Penerapan |
| :--- | :--- | :--- |
| Kesan visual | Ramah dan hangat | Font `Plus Jakarta Sans` (ketebalan 400, 500, 600) |
| Warna aksen | Biru (`blue`) | `bg-blue-700`, hover `bg-blue-800`, `text-blue-700`, `bg-blue-50`, garis tepi terpilih `border-blue-700` |
| Sapaan pengguna | Anda | Seluruh label, teks bantuan, dan pesan memakai kata sapaan "Anda" |
| Susunan halaman | Langkah bertahap | Alur dibagi ke dalam beberapa langkah berurutan yang jelas di layar |
| Posisi aksi utama | Bar yang menempel di bawah layar | Tombol pindah langkah dan ringkasan biaya berada pada bar bawah yang menempel di layar |
| Gambar | Tanpa gambar | Kartu layanan menampilkan teks tarif, durasi pengerjaan, dan keterangan ringkas tanpa foto atau placeholder |

## Token Visual & Tata Letak

- **Latar dan permukaan:** Latar halaman `bg-neutral-50`, panel atau kartu `bg-white`.
- **Pemisah dan garis tepi:** Gunakan perbedaan warna latar antarpermukaan; `border-neutral-200` dipakai untuk input, pilihan, dan pemisah tipis. Tidak menumpuk kartu di dalam kartu.
- **Sudut:** Kartu dan panel `rounded-2xl`, tombol dan input `rounded-xl`, badge `rounded-full`.
- **Bayangan:** Hanya pada bar melayang/menempel di bawah layar memakai `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`.
- **Tipografi:** `Plus Jakarta Sans` lewat `@fontsource/plus-jakarta-sans` (400, 500, 600). Judul halaman `text-2xl`, judul bagian `text-lg`, isi `text-base`, label `text-sm`, angka utama `text-3xl`. Angka memakai `tabular-nums`, ukuran teks dalam input minimal `16px`.
- **Aksesibilitas:** Dirancang mulai lebar layar `360px`, area sentuh minimal `44 × 44 px`, kontras teks minimal `4,5:1`, cincin fokus `focus-visible` 2 px warna aksen biru dengan jarak 2 px.
- **Bahasa dan angka:** Bahasa Indonesia sesuai EYD V, Rupiah tanpa spasi (`Rp18.000`), desimal memakai koma tanpa nol di belakang (`4,5` dan `3`).
