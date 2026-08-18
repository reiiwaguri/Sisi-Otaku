# Sisi Otaku

Website info & jadwal anime — jadwal tayang harian, genre, sinopsis, dan pencarian anime, semua diambil **langsung dan otomatis dari MyAnimeList** (lewat Jikan API, gratis & tanpa API key). Admin tinggal mengatur link streaming per judul; tidak perlu upload data anime manual lagi.

- Kode login admin: `83e14vghreiwa`
- Login pengguna: bebas pakai username/Gmail apa saja (tanpa server, jadi tanpa password sungguhan)
- Jadwal, poster, genre, sinopsis: **live dari MyAnimeList**, selalu terbaru, tidak perlu di-update manual
- Link streaming (Otakudesu/Nontonanime/Anoboy): diatur admin per anime, tersimpan di **localStorage browser** (lihat catatan di bawah)
- Bookmark pengguna: juga tersimpan di localStorage per perangkat

## Cara admin mengatur link streaming

1. Login admin dengan kode di atas.
2. Buka anime apa saja (dari jadwal atau hasil pencarian).
3. Di bagian "Nonton di", tekan ikon rantai di sebelah kanan tombol platform, tempel link asli, lalu Simpan.
4. Kalau link belum diisi, tombol otomatis mengarah ke halaman pencarian judul di situs terkait — jadi tetap berfungsi sebelum diisi manual.

---

## 1. Coba dulu di komputer sendiri (opsional tapi disarankan)

Butuh [Node.js](https://nodejs.org) versi 18 ke atas terpasang lebih dulu.

```bash
npm install
npm run dev
```

Buka link yang muncul di terminal (biasanya `http://localhost:5173`).

---

## 2. Upload ke GitHub

1. Buat repository baru di GitHub, misal namanya `sisi-otaku`. **Jangan** centang "Add README" (repo harus kosong).
2. Di folder project ini, jalankan:

```bash
git init
git add .
git commit -m "Sisi Otaku - awal"
git branch -M main
git remote add origin https://github.com/USERNAME-KAMU/sisi-otaku.git
git push -u origin main
```

Ganti `USERNAME-KAMU` dengan username GitHub kamu.

**Penting:** buka file `vite.config.js` dan pastikan baris `base:` cocok dengan nama repo kamu, contoh:

```js
base: "/sisi-otaku/",
```

Kalau nama repo kamu berbeda (misalnya `anime-web`), ubah jadi `"/anime-web/"`.

---

## 3. Jadikan web (pilih salah satu cara)

### Cara A — GitHub Pages (gratis, paling simpel, sudah otomatis)

1. Di GitHub, buka repo → **Settings** → **Pages**.
2. Di bagian **Build and deployment**, pilih Source: **GitHub Actions**.
3. Push ke branch `main` (langkah di atas) akan otomatis men-trigger workflow yang sudah disiapkan di `.github/workflows/deploy.yml` — dia akan build dan deploy sendiri.
4. Tunggu 1-2 menit, cek tab **Actions** di repo sampai muncul centang hijau.
5. Web kamu akan bisa diakses di:
   `https://USERNAME-KAMU.github.io/sisi-otaku/`

### Cara B — Vercel (gratis, sedikit lebih cepat & auto-HTTPS custom domain)

1. Buka [vercel.com](https://vercel.com), login pakai akun GitHub.
2. Klik **Add New → Project**, pilih repo `sisi-otaku`.
3. Framework Preset otomatis terdeteksi **Vite** — biarkan default, klik **Deploy**.
4. **Penting:** karena Vercel tidak pakai sub-folder seperti GitHub Pages, buka `vite.config.js` dan ubah:
   ```js
   base: "/",
   ```
   sebelum push, atau ubah di Vercel lalu redeploy.
5. Selesai — dapat link seperti `sisi-otaku.vercel.app`.

### Cara C — Netlify (gratis, mirip Vercel)

1. Buka [netlify.com](https://netlify.com) → **Add new site → Import an existing project** → pilih repo GitHub kamu.
2. Build command: `npm run build`, Publish directory: `dist`.
3. Sama seperti Vercel, ubah `base: "/"` di `vite.config.js` sebelum deploy.

---

## Catatan penting soal data

**Jadwal, poster, genre, sinopsis** — selalu live dari MyAnimeList, sama untuk semua pengunjung, tidak perlu dikelola.

**Link streaming yang diisi admin** dan **bookmark pengguna** — masih tersimpan di **localStorage** browser masing-masing orang. Artinya:

- Link streaming yang kamu isi dari satu perangkat **tidak otomatis muncul** di perangkat lain.
- Kalau orang lain buka dari browser/HP berbeda, link streaming yang mereka lihat masih yang default (pencarian otomatis) sampai kamu isi juga dari perangkat itu, atau sampai disambungkan ke database bersama.

Ini paling cocok untuk demo atau kalau kamu satu-satunya admin yang mengelola dari perangkat yang sama. Kalau nanti kamu mau link streaming yang diisi admin otomatis muncul untuk **semua** pengunjung dari perangkat mana pun, langkah selanjutnya adalah menyambungkan ke backend seperti **Supabase** atau **Firebase** (gratis untuk skala kecil) — cukup bilang saja, saya bisa bantu sambungkan.

## Sumber data & batasan

- Data anime diambil dari **Jikan API** (`https://api.jikan.moe/v4`), API tidak resmi yang membaca dari MyAnimeList — gratis, tanpa perlu daftar atau API key.
- Jikan punya batas jumlah permintaan (sekitar 60x per menit), jadi web ini sengaja memberi jeda kecil antar permintaan dan menyimpan cache sementara per hari supaya tidak kena limit saat dipakai wajar.
- Livechart.me tidak dipakai karena tidak menyediakan API publik gratis untuk diakses langsung dari browser.

---

## Struktur folder

```
sisi-otaku/
├── src/
│   ├── App.jsx        ← seluruh logika & tampilan web
│   ├── main.jsx        ← entry point React
│   └── index.css        ← Tailwind
├── index.html
├── vite.config.js       ← ganti "base" sesuai nama repo/hosting
├── package.json
└── .github/workflows/deploy.yml   ← auto-deploy ke GitHub Pages
```
