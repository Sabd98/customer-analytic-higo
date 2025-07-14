Cara Pemakaian: 

1. Buka link : https://github.com/Sabd98/customer-analytic-higo
2. Kemudian unduh repository atau git clone
3. Buka IDE masing-masing (VSCode,sublime,dll)
4. Redirect ke folder customer-analytic-be dahulu
5. Jika di pc sudah pasang node.js runtime environment, anda bisa install package dependency
dengan ketik sesuai maing-masing package manager yang biasa dipakai:
npm install|npm i | bun i | yarn install| yarn add
6. Kemudian pasang .env untuk koneksi dari database mongo atlas dengan isi bisa cek
langkah dari file pdf saya. "Dokumentasi Technical Test HIGO Fullstack - Sabda Avicenna.pdf"
7. Kemudian jalankan server dengan ketik npm run dev | bun run dev | npm start | bun start
8. Jika sudah lihat info port jalan dimana, link swagger api, dan MongoDB connected,
berarti server berhasil dijalankan dan sudah connect db mongo atlas saya.
9. Buka link swagger untuk cek api yang tersedia: http://localhost:5000/api-docs
10. Tes satu-satu API yang tersedia apakah berjalan dan outputnya seperti apa. Panduan
lengkap cek pdf "Dokumentasi Technical Test HIGO Fullstack - Sabda Avicenna.pdf"
11. Setelah tes API, redirect ke customer-analytic-fe atau buka link url frontendnya yang sudah dideploy dan dihost di: https://cusboard.vercel.app/
Jika menjalankan secara manual:
12. Install package dependency, bisa cek ulang langkah 5
13. Jalankan build dengan npm run build | bun run build | yarn run build (opsional)
14. Jalankan aplikasi fe, bisa cek ulang langkah 7 untuk perintahnya.
15. Setelah run development/production berhasil, maka akan redirect ke link web.
16. Website sudah berhasil dirender dan digunakan. Semoga sukses!