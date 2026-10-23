# Kang Parkir

Game kasual satu jari tentang menjadi tukang parkir. Atur motor dan mobil di lahan sempit, tiup peluit, tagih tarifnya, dan jangan sampai ada yang kabur tanpa bayar. Tersedia di web, dan siap dirilis untuk Android dan iOS.

**Main di browser:** https://thofik93.github.io/kang-parkir/

## Cara main

- **Seret** kendaraan dari jalan ke lajur parkir. Motor masuk ke lajur kecil atau trotoar, mobil ke lajur besar.
- Setiap lajur seperti tumpukan: kendaraan yang masuk terakhir harus keluar duluan.
- Label **BENTAR / SEDANG / LAMA** menunjukkan lama belanja pemiliknya. Taruh yang lama di posisi paling dalam.
- Saat tanda **!** muncul, **ketuk** kendaraannya untuk menagih. Makin cepat, makin besar tipnya. Tiga layanan cepat berturut-turut memberi bonus **Prima**.
- Motor yang menghalangi bisa digeser. Mobil tidak bisa.
- Ketuk cepat motor yang **kabur** sebelum hilang dari layar.
- **Tutup palang** untuk menahan kendaraan baru sebentar saat parkiran penuh.

## Sistem permainan

- **Karier per hari.** Setiap hari ada setoran ke bos. Pilih lokasi dan tarif sebelum membuka parkiran.
- **Lokasi.** Toko Sinar Jaya (hari 1), Pasar Pagi Sukamaju (hari 5), dan Masjid Raya Al-Ikhlas (hari 8). Tiap lokasi punya tata letak dan pola keramaian sendiri.
- **Tarif.** Murah, Normal, atau Mahal. Tarif mengubah kesabaran pelanggan, keramaian, dan peluang kabur.
- **Kejadian** mulai hari 3: hujan, patroli Satpol PP (trotoar harus kosong), dan rombongan arisan. Semuanya diumumkan di prakiraan.
- **Aturan uang:**
  - Pendapatan = tarif + tip.
  - Kalau pendapatan mencapai setoran, bos mengambil jumlah setoran, lalu kamu bayar makan Rp5.000 dan denda kalau ada. Sisanya masuk tabungan.
  - Kalau pendapatan kurang dari setoran, semuanya diambil bos dan hari diulang.
  - Kamu tidak pernah berutang. Semua angka tercatat di nota harian.
- **Warung Bu Tini.** Peralatan yang mengubah permainan, dan kosmetik yang hanya mengubah tampilan.
- **Alasan untuk kembali:**
  - Tiga misi harian. Hadiahnya tetap dibayar walaupun setoran gagal.
  - Enam pangkat dengan bonus setiap naik pangkat.
  - Pelanggan spesial berbintang dengan tip besar, dan album untuk mengoleksinya.
  - Bonus kopi pagi saat bermain di hari berikutnya. Kalau terlewat, hitungannya mulai lagi tanpa ada yang hilang.

Sengaja tidak ada sistem energi, loot box, timer yang memaksa, maupun streak yang menghukum.

## Teknis

- `index.html`: seluruh game dalam satu file. Grafis memakai Canvas 2D, suara dibuat dengan WebAudio, dan progres disimpan di `localStorage`. Tanpa build dan tanpa dependensi. File ini juga yang ditayangkan di GitHub Pages.
- `android/`, `ios/`: proyek native [Capacitor 7](https://capacitorjs.com) yang membungkus `index.html`.
- `privacy.html`: kebijakan privasi untuk toko aplikasi.
- `scripts/`: menyalin web ke `www/` dan membuat gambar sumber ikon dan splash.

```bash
npm install
npm run sync          # perbarui proyek native setelah index.html berubah
npm run android:apk   # APK debug untuk dicoba di HP
npm run ios           # buka di Xcode
```

Langkah rilis ke Play Store dan App Store ada di [RELEASE.md](RELEASE.md), dan teks listing toko ada di [STORE.md](STORE.md).
