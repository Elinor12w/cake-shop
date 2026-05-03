# Custom Cake Shop 🎂

A boutique full-stack e-commerce application for ordering custom handcrafted cakes. This platform features a dynamic visual menu, a multi-image carousel for each product, and a direct WhatsApp integration for seamless order inquiries.

## 🚀 Live Demo
- **Frontend**: [https://elinor12w.github.io/cake-shop/](https://elinor12w.github.io/cake-shop/)
- **Backend**: [https://cake-shop-xp1k.onrender.com](https://cake-shop-xp1k.onrender.com)

---

## ✨ Features
- **Dynamic Visual Menu**: Fetches and displays handcrafted cake creations directly from MongoDB.
- **Multi-Image Carousel**: High-end product display using the Swiper library.
- **WhatsApp Ordering**: Converts order form data into a professional message sent directly to the baker.
- **Cloudinary Integration**: Fast and reliable image hosting for high-quality cake photography.
- **Admin Panel**: Dedicated interface for uploading new cake designs and managing the gallery.
- **Responsive Design**: Elegant "Boutique" aesthetic that works beautifully on mobile and desktop.

---

## 🛠️ Tech Stack
- **Frontend**: React.js (Vite), React Router (HashRouter), Swiper.js, Vanilla CSS.
- **Backend**: Node.js, Express.js, Multer.
- **Database**: MongoDB Atlas.
- **Cloud Storage**: Cloudinary (Image Hosting).
- **Deployment**: GitHub Pages (Frontend), Render (Backend).

---

## ⚙️ Local Setup

### Prerequisites
- Node.js installed.
- MongoDB Atlas account.
- Cloudinary account.

### 1. Clone the repository
```bash
git clone https://github.com/Elinor12w/cake-shop.git
cd cake-shop
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start server: `npm run dev`

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `.env.development` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5000
```
Start client: `npm run dev`

---

## 📦 Deployment

### Frontend (GitHub Pages)
The project is configured with the `gh-pages` package. To deploy:
```bash
cd client
npm run deploy
```

### Backend (Render)
1. Link your repository to Render.
2. Set the **Root Directory** to `server`.
3. Set the **Start Command** to `npm start`.
4. Add all environment variables in the Render Dashboard settings.

---

## 📝 License
This project is for educational and boutique business use.

---

*Baked with love by Elinor* ❤️
