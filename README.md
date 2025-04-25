# Chatbot Web App

![Project Screenshot](https://github.com/IzzulGod/Sorach1o-Chatbot/project1.png) <!-- Ganti dengan link screenshot proyek Anda -->

Sebuah aplikasi chatbot berbasis web yang menggunakan API dari OpenRouter untuk menghasilkan respon cerdas. Dibangun dengan HTML, CSS, dan JavaScript, dan dihosting di Netlify dengan menggunakan Netlify Functions untuk menyimpan API key secara aman.

## Fitur Utama

- **Chat Interaktif**: Berbicara dengan chatbot yang menggunakan model AI canggih melalui OpenRouter API
- **Manajemen Percakapan**:
  - Buat percakapan baru dengan tombol "New Chat"
  - Akses history chat melalui sidebar
  - Hapus percakapan yang tidak diperlukan
- **Keamanan**: API key disimpan dengan aman menggunakan Netlify Functions
- **Responsif**: Desain yang bekerja baik di desktop maupun mobile

## Teknologi yang Digunakan

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Netlify Functions (Serverless functions)
- **API**: OpenRouter
- **Hosting**: Netlify

## Cara Menjalankan Secara Lokal

1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/reponame.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd reponame
   ```
3. Install Netlify CLI (jika belum ada):
   ```bash
   npm install -g netlify-cli
   ```
4. Jalankan secara lokal:
   ```bash
   netlify dev
   ```
5. Buka browser dan akses `http://localhost:8888`

## Konfigurasi

1. Buat file `.env` di root direktori dengan konten:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```
2. Untuk produksi, set environment variable di dashboard Netlify:
   - Buka situs Netlify Anda
   - Pergi ke "Site settings" > "Build & deploy" > "Environment"
   - Tambahkan variable `OPENROUTER_API_KEY` dengan API key Anda


## Demo

Tautan demo live: [https://sorachio.netlify.app](https://sorachio.netlify.app) 

## Kontribusi

Pull request dipersilakan. Untuk perubahan besar, buka issue terlebih dahulu untuk mendiskusikan apa yang ingin Anda ubah.

## Lisensi

[MIT](https://choosealicense.com/licenses/mit/)

---

Dibuat oleh [Izzul God] 
