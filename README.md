# MARVEL × GFG — Bennett University Multiverse Summit

Official cinematic event microsite for the **GeeksForGeeks Student Chapter at Bennett University**, fusing collegiate engineering hackathons with comic-book storytelling and interactive superhero aesthetics.

---

## ⚡ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation & Physics**: Custom real-time Web Physics + [GSAP](https://greensock.com/gsap/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Native Web Audio API Synthesizer (Zero external audio asset dependencies)
- **Celebration**: Canvas Confetti

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 3. Production Build
```bash
npm run build
```

### 4. Run in Production Mode
```bash
npm run start
```

---

## 🌐 Deploy to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):

1. Push this repository to GitHub.
2. Go to Vercel and import the repository.
3. Vercel will automatically detect **Next.js** and apply the default build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build` (or `npm run build`)
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
4. Click **Deploy**.

---

## 🔒 Local Files Notice
The local original Stitch export file (`frontend`) is strictly ignored via `.gitignore` and kept local-only as an uncommitted reference. All production assets and components reside in `public/assets/`, `components/`, and `app/`.
