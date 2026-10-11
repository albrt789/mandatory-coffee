# Mandatory Coffee

Website statis (HTML, CSS, JavaScript), tanpa build tool.

## Struktur
- `index.html`     : Beranda (Home, Tentang, Menu, Ulasan, Kontak)
- `reservasi.html` : halaman Reservasi meja
- `css/style.css`, `js/main.js`
- `assets/`        : logo, hero.jpg, interior.jpg

## Menjalankan
Buka `index.html` di browser.

## Yang perlu diganti
- Nomor WhatsApp tujuan reservasi: `WA` di `js/main.js`
- Menu dan harga: objek `MENU` di `js/main.js`
- Alamat, jam buka, kontak, peta: `index.html` (bagian footer)
- Foto: ganti `assets/hero.jpg` dan `assets/interior.jpg`

## Catatan
Ulasan disimpan di localStorage browser pengunjung. Untuk ulasan yang dibagikan ke semua pengunjung, hubungkan ke backend (Firebase/Supabase).
