# Wallet Cop

Wallet Cop helps you choose the best credit card for specific spending categories based on the cards you own.

## Getting Started

### 1. Clone Repositories

- **Frontend** (this repo)
- **Backend**: Clone the backend repository from your preferred source.

### 2. Install Dependencies

For both the frontend and backend folders, run:

```bash
npm install
```

### 3. Set Up Environment Variables

To run the project, you’ll need credentials for the following services:

- **MongoDB**
- **Supabase**
- **Google Auth (OAuth 2.0)**

> If you don’t have these credentials yet, feel free to ask — I can provide test credentials to get you started.

Make sure to create a `.env` file in both the frontend and backend directories with the required keys. Here's an example structure for each:

#### Backend `.env`

```env
MONGODB_URI=your_mongodb_uri
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Frontend `.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

```

### 4. Run the Backend

In the backend folder:

```bash
npm run start
```

> Note: The backend is hosted on a free Render server, so it may take a few seconds to wake up on first use.

### 5. Run the Frontend

In the frontend folder:

```bash
npm run dev
```

Open the app in your browser — typically at [http://localhost:5173](http://localhost:5173).

## Usage Instructions

1. **Sign In**: Use a Google account to log in.
2. **Wait a Moment**: The backend may take a few seconds to respond on the first load.
3. **Add Cards**: Go to the Wallet tab and add cards you own (or test with dummy cards).
4. **View Recommendations**: Return to the Dashboard and select a spending category to see the best card from your wallet.
5. **Manage Cards**: You can favorite cards, or remove them from your wallet or favorites list as needed.
