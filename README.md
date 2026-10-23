# Kang Parkir

Game kasual satu jari di browser. Kamu jadi tukang parkir di depan Toko Sinar Jaya: atur motor dan mobil di lahan sempit, tiup peluit, tagih Rp2.000, dan jangan sampai ada yang kabur tanpa bayar.

**Main sekarang:** https://thofik93.github.io/kang-parkir/

## Cara main

- **Seret** kendaraan dari jalan ke lajur parkir. Motor masuk ke lajur kecil atau trotoar, mobil ke lajur besar.
- Setiap lajur seperti tumpukan: kendaraan yang masuk terakhir harus keluar duluan.
- Label **BENTAR / SEDANG / LAMA** menunjukkan berapa lama pemiliknya belanja. Taruh yang lama di posisi paling dalam.
- Saat tanda **!** muncul, **ketuk** kendaraannya untuk mengeluarkan dan menagih. Kalau cepat, kamu dapat tip.
- Motor yang menghalangi boleh digeser. Mobil tidak bisa digeser.
- Ada motor yang **kabur**. Ketuk cepat sebelum hilang dari layar.
- Tiga komplain dalam sehari dan kamu diusir pemilik toko. Kumpulkan setoran harian sebelum jam 21.00.

Setiap hari ada kendaraan baru: mobil di hari 2, ojol di hari 3, dan Fortuner yang gak sabaran di hari 4. Setelah itu, setorannya terus naik.

## Teknis

Satu file `index.html` tanpa build dan tanpa dependensi. Grafis memakai Canvas 2D, suara dibuat dengan WebAudio, dan progres disimpan di `localStorage` browser.

Untuk menjalankannya secara lokal, cukup buka `index.html` di browser.
