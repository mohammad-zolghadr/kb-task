# Crypto Dashboard - Created By MohammadZolghadr

Welcome to the Crypto Dashboard — a real-time cryptocurrency monitoring app built with Next.js.

Follow these steps to run the project locally:

1. Clone the repository
   git clone `https://github.com/mohammad-zolghadr/kb-task.git` -
   `cd kb-task`

2. Install dependencies
   `npm install`

3. Create a .env.local file

In the root of your project, create a .env.local file with the following content:

```bash
NEXT_PUBLIC_BINANCE_API_URL=https://api.binance.com/api/v3
NEXT_PUBLIC_BINANCE_WS_URL=wss://stream.binance.com:9443/ws
NEXT_PUBLIC_BINANCE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Binance API key if needed.

4. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000
in your browser to see the app in action

# Demo

See demo of project on Netlify: [Show Demo](https://kb-task.netlify.app/)
