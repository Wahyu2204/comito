# Comito - PR Description Generator

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Prisma v7 + Prisma Postgres
- NextAuth.js v4 (GitHub OAuth)
- Groq API (Llama-3.3-70b-versatile) untuk generate deskripsi PR

## Project Structure
- `app/` - Pages, Layouts, & API routes (Prioritaskan Server Components)
- `components/` - Reusable UI components (Gunakan `'use client'` HANYA jika butuh interaktivitas/state)
- `lib/` - Utility functions (contoh: ekspor Prisma client)
- `actions/` - Next.js Server Actions (Wajib gunakan `'use server'`)
- `prisma/schema.prisma` - Database schema

## 🧠 Core AI Rules & Coding Style
1. **TypeScript First:** Selalu gunakan TypeScript strict mode. Dilarang keras menggunakan tipe `any`.
2. **UI/UX Aesthetics:** Gunakan desain yang sangat minimalis, *clean*, dan estetis (monochrome/hitam-putih). Gunakan class Tailwind `font-mono` untuk elemen yang berkaitan dengan kode, terminal, atau UI teknis. Hindari warna mencolok atau shadow yang berlebihan.
3. **Database Workflow:** Jika kamu menyarankan perubahan atau penambahan model pada `schema.prisma`, selalu ingatkan untuk menjalankan `npx prisma generate` dan `npx prisma db push`.
4. **Data Fetching:** Gunakan Server Actions untuk mutasi data dan Server Components untuk membaca data dari Prisma secara langsung tanpa rute API tambahan.
5. **Error Handling:** Selalu bungkus pemanggilan API eksternal (GitHub API, Groq API) dan operasi database di dalam blok `try/catch`. Pastikan pesan error ditampilkan dengan baik ke sisi *client*.

## Current Progress & Tasks
- [x] Initial project setup
- [x] Database schema creation (User, Account, Session, Generation)
- [x] NextAuth.js setup dengan GitHub Provider (Scope: `repo` sudah aktif)
- [x] Dashboard UI Layout (Sidebar minimalis)
- [x] Server Action untuk narik GitHub Diff & terintegrasi dengan Groq API
- [ ] Mengerjakan halaman History List PR di `/dashboard`
- [ ] Mengerjakan halaman View Detail & Fitur Copy hasil Markdown ke clipboard