# Rilis ke Play Store dan App Store

Panduan ini untuk merilis Kang Parkir versi aplikasi. Kode native sudah siap: aplikasinya bisa di-build, terkunci di mode portrait, punya ikon dan splash, serta tombol back Android sudah diatur. Yang tersisa adalah langkah yang butuh akun developer kamu sendiri.

## Yang perlu disiapkan

| | Google Play | Apple App Store |
|---|---|---|
| Akun | [Google Play Console](https://play.google.com/console), sekali bayar USD 25 | [Apple Developer Program](https://developer.apple.com/programs/), USD 99 per tahun |
| Alat | Android Studio (JDK 21 bawaannya dipakai oleh skrip build) | Xcode di Mac |
| ID aplikasi | `io.github.thofik93.kangparkir` | `io.github.thofik93.kangparkir` |
| Kebijakan privasi | https://thofik93.github.io/kang-parkir/privacy.html | sama |

ID aplikasi tidak bisa diubah setelah rilis pertama. Kalau mau ganti, ubah dulu di `capacitor.config.json`, `android/app/build.gradle` (`namespace` dan `applicationId`), dan Bundle Identifier di Xcode.

## Alur kerja harian

```bash
npm install
npm run sync      # salin index.html ke www/ lalu ke proyek Android & iOS
npm run android   # buka di Android Studio
npm run ios       # buka di Xcode
```

`index.html` di root adalah satu-satunya sumber game. Setiap kali selesai mengubahnya, jalankan `npm run sync`.

## Android (Google Play)

### 1. Buat kunci upload (sekali saja)

```bash
keytool -genkey -v -keystore ~/kang-parkir-upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

Simpan file `.jks` dan kata sandinya di tempat aman. Kalau hilang, kamu tidak bisa memperbarui aplikasi tanpa proses reset ke Google.

Lalu buat `android/keystore.properties`. File ini sudah masuk `.gitignore`, jadi jangan di-commit.

```properties
storeFile=/Users/NAMA_KAMU/kang-parkir-upload.jks
storePassword=KATA_SANDI
keyAlias=upload
keyPassword=KATA_SANDI
```

### 2. Build bundle rilis

```bash
npm run android:bundle
# hasil: android/app/build/outputs/bundle/release/app-release.aab
```

### 3. Isi Play Console

1. Buat aplikasi baru: nama "Kang Parkir", jenis **Game**, gratis.
2. **Data safety**: pilih *Tidak mengumpulkan data* dan *Tidak membagikan data*.
3. **Rating konten** (kuesioner IARC): tidak ada kekerasan, judi, atau konten dewasa. Hasilnya biasanya Semua Umur atau 3+.
4. **Target audiens**: 13+ paling aman. Memilih anak-anak memicu persyaratan tambahan dari program Families.
5. **Listing**: salin teks dari `STORE.md`. Siapkan ikon 512×512 (`assets/icon-only.png`, perkecil dulu), gambar fitur 1024×500, dan minimal 2 screenshot HP.
6. Unggah `app-release.aab` ke **Pengujian internal** dulu, coba di HP sendiri, lalu promosikan ke **Produksi**.

Akun Play Console pribadi yang baru dibuat wajib melakukan pengujian tertutup dengan minimal 12 penguji selama 14 hari sebelum bisa rilis produksi. Ajak teman sejak awal.

### Naik versi

Di `android/app/build.gradle`, naikkan `versionCode` (bilangan bulat, wajib selalu naik) dan `versionName` (contoh `1.1.0`).

## iOS (App Store)

1. `npm run ios` untuk membuka Xcode.
2. Pilih target **App**, lalu di tab **Signing & Capabilities** pilih Team dari akun Apple Developer-mu.
3. Di [App Store Connect](https://appstoreconnect.apple.com), buat aplikasi baru dengan Bundle ID `io.github.thofik93.kangparkir`.
4. Di Xcode, pilih perangkat **Any iOS Device**, lalu **Product → Archive → Distribute App → App Store Connect**.
5. Isi App Store Connect:
   - **App Privacy**: *Data Not Collected*.
   - **Age Rating**: 4+.
   - **Kategori**: Games → Casual (kedua: Simulation).
   - **Screenshot**: wajib untuk iPhone 6,9" (contoh: iPhone 16 Pro Max di simulator). Ambil dengan `xcrun simctl io booted screenshot layar.png`.
   - **Export compliance** sudah dijawab di `Info.plist` (`ITSAppUsesNonExemptEncryption = NO`).
6. Uji lewat **TestFlight**, lalu **Submit for Review**.

Naik versi: ubah **Version** dan **Build** di tab General target App.

### Catatan review Apple

Apple kadang menolak aplikasi yang hanya membungkus situs web (pedoman 4.2). Kang Parkir aman karena game-nya tersimpan di dalam aplikasi, bisa dimainkan offline, dan memakai fitur native (haptic, status bar). Saat submit, tulis di catatan untuk reviewer bahwa ini game lengkap yang berjalan offline.

## Monetisasi (belum aktif)

Versi ini sengaja tanpa iklan dan tanpa pembelian, supaya proses review pertama mulus dan label "Data Not Collected" tetap benar. Rencana yang cocok untuk game ini:

- **Iklan berhadiah opsional** (AdMob, plugin `@capacitor-community/admob`): menggandakan bonus misi harian, atau memberi kesempatan kedua untuk menangkap motor yang kabur. Hanya muncul kalau pemain menekannya sendiri.
- **Kosmetik berbayar** (rompi, topi, payung pos) lewat In-App Purchase, di samping kosmetik yang dibeli dengan uang di dalam game.
- **Sekali bayar untuk menghapus iklan.**

Kalau iklan atau pembelian ditambahkan, perbarui Data safety, App Privacy, dan `privacy.html`.
