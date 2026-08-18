# Sisi Otaku

Website info & jadwal anime — cari anime, lihat jadwal per hari, upload anime lewat panel admin, dan bookmark anime favorit.

- Kode login admin: `83e14vghreiwa`
- Login pengguna: bebas pakai username/Gmail apa saja (tanpa server, jadi tanpa password sungguhan)
- Data anime & bookmark tersimpan di **localStorage browser** (per perangkat/browser masing-masing — belum ada database bersama, lihat catatan di bawah)

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

Saat ini anime yang diupload admin dan bookmark pengguna tersimpan di **localStorage** browser masing-masing orang yang membuka web. Artinya:

- Anime yang kamu tambahkan lewat HP kamu **tidak otomatis muncul** di HP orang lain.
- Kalau orang lain buka cache/browser berbeda, datanya kosong.

Ini paling cocok untuk demo, uji coba pribadi, atau kalau kamu satu-satunya yang mengelola dan menonton dari perangkat yang sama.

Kalau nanti kamu mau semua pengunjung melihat anime yang sama (database beneran), langkah selanjutnya adalah menghubungkan ke backend seperti **Supabase** atau **Firebase** (gratis untuk skala kecil) — cukup bilang saja, saya bisa bantu sambungkan.

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
