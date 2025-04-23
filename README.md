# Wallet Cop – Frontend

This is the frontend for **Wallet Cop**, a smart tool that helps users identify the best credit card to use for different spending categories, based on the cards they own.

## 🧠 What It Does

Wallet Cop simplifies credit card optimization by letting users:

- Securely sign in with Google
- Add credit cards they currently use (or test with random ones)
- View personalized recommendations on which card to use for various categories (e.g. dining, groceries, travel)
- Manage their wallet and favorites for easy access and organization

The goal is to help users **maximize their rewards and benefits** by always using the best card for each purchase.

---

## ✨ Core Features

- **Google Authentication** via OAuth 2.0
- **Interactive Dashboard** with smart card recommendations by category
- **Wallet Management**: Add, view, and remove cards
- **Favorites System**: Mark cards as favorites and easily manage them
- **Supabase Integration** for user/session handling
- **Vite + React** powered frontend with fast refresh and modern tooling

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/luisarevalo21/walletcop.git
cd walletcop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root with the following:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

> Need help getting these? Ask and test credentials can be provided!

### 4. Run the Frontend

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

---

## 🧪 How to Use

1. Sign in using your Google account.
2. Wait a few seconds — the backend is hosted on a free Render server and may take a moment to start.
3. Head to the **Wallet** tab and add a few cards you own (or random test cards).
4. Go back to the **Dashboard** and pick a category — Wallet Cop will show you the best card to use.
5. Favorite the cards you love and manage your list however you like.

---

## 🔗 Related Repositories

- **Backend Repo**: [walletcop-backend](https://github.com/luisarevalo21/walletcop-backend)

Make sure to follow the backend setup guide to get the full app working.
