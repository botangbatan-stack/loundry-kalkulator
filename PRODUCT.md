# Daftar Produk — LaundryCalc

Dokumen ini merangkum daftar fitur dan hal yang perlu dipastikan dari PRD **LaundryCalc & Catalog (v1.1)** sebelum masuk ke tahap desain dan pembuatan kode.

## Daftar Fitur

Cakupan pengerjaan saat ini difokuskan sampai **FT-06** sesuai permintaan pengguna.

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | - | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | FT-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-01, FT-02, FT-03, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | - | Ditunda |

## Keputusan Klarifikasi Tahap 1 (Disetujui Pengguna)

1. **Format Rupiah:** Tanpa spasi (contoh: `Rp18.000`).
2. **Keadaan awal & pembulatan berat:** Layanan pertama (`Cuci Lipat`) otomatis terpilih saat halaman dibuka, kolom berat awal kosong, dan input berat dibulatkan ke kelipatan `0,1` kg terdekat.
3. **Nomor WhatsApp & cakupan fitur:** Memakai nomor contoh `6281234567890` untuk prototipe dan pengerjaan dibatasi sampai `FT-06` (`FT-07` ditunda).
4. **Penjelasan radius & format pewangi di pesan WhatsApp:** Radius maksimal 5 km ditampilkan sebagai keterangan teks pada opsi Antar-Jemput; nominal biaya pewangi pada template WhatsApp mengikuti hasil hitung yang sudah diformat Rupiah.

## Catatan PRD yang Sudah Terjawab

1. **Format penulisan Rupiah berbeda di dalam PRD** — Diputuskan memakai tanpa spasi (`Rp18.000`).
2. **Keadaan awal kalkulator dan pembulatan input berat** — Diputuskan layanan pertama terpilih, berat awal kosong, pembulatan ke kelipatan `0,1` kg terdekat.
3. **Nomor WhatsApp tujuan toko masih berupa contoh kosong** — Diputuskan memakai `6281234567890`.
4. **Cakupan Fitur 7 (Info Jam Operasional Toko)** — Diputuskan ditunda, fokus sampai `FT-06`.
5. **Format jam operasional dan tampilan biaya pewangi pada pesan WhatsApp** — Biaya pewangi mengikuti nominal hasil hitung Rupiah, keterangan radius maksimal 5 km ditampilkan sebagai info teks.
