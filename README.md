# Crypto Market Scanner

A cryptocurrency market scanner built with **Next.js** and **TypeScript**, focused on identifying trading opportunities using technical indicators and market analysis.

The application currently uses **Binance Futures** as its market data provider and is structured to make adding other exchanges easier in the future.

## Features

- 📊 Cryptocurrency market analysis
- 🔍 Market scanner for trading opportunities
- 📈 Technical indicator analysis
- 🎯 BUY / SELL / NEUTRAL signals
- ⭐ Strong BUY / Strong SELL signals
- 📋 Market analysis table with search
- 🔄 Configurable trading strategy
- 📦 Binance Futures market data
- 🏗️ Exchange-independent market provider architecture
- ⚡ Parallel market data fetching
- 🛡️ Graceful handling of market API failures

## Tech Stack

- **Next.js**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **NextUI**
- **Binance Futures API**

## Project Structure

```text
src/
├── app/
│   └── page.tsx
│
├── market/
│   ├── index.ts
│   ├── types.ts
│   ├── marketProvider.ts
│   ├── marketFactory.ts
│   │
│   └── binance/
│       ├── index.ts
│       ├── client.ts
│       └── provider.ts
│
├── indicators/
│   ├── ...
│   └── runAllIndicators.ts
│
├── scanner/
│   ├── ...
│   └── cryptoScanner.ts
│
├── components/
│   ├── CryptoDashboard.tsx
│   ├── crypto/
│   └── scanner/
│
└── config/
    └── ...
```

### Market Provider Architecture

Market data access is separated from the rest of the application through the `MarketProvider` interface.

```text
Application
    │
    ▼
MarketProvider
    │
    ▼
Market Factory
    │
    ▼
BinanceMarketProvider
    │
    ▼
BinanceClient
    │
    ▼
Binance Futures API
```

This keeps exchange-specific API logic isolated from the scanner and indicator logic and allows additional market providers to be introduced later.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RahmaniAhmad/crypto-app.git
cd crypto-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MARKET_EXCHANGE=binance
```

`MARKET_EXCHANGE` determines which market provider is selected by the application.

Currently supported:

```text
binance
```

Additional exchanges may be added in the future.

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

> Restart the development server after changing environment variables.

## Configuration

Trading and scanner settings are managed through the application configuration.

Typical configuration includes:

- Market symbol limit
- Candle limit
- Chart resolution
- Number of signals displayed
- Technical indicator parameters
- Trading strategy settings

The market provider reads the relevant trading configuration when requesting market data.

## Market Data

The application currently uses **Binance Futures** public market APIs.

The Binance provider is responsible for:

- Retrieving available futures symbols
- Filtering USDT markets
- Selecting the highest-volume markets
- Retrieving historical candlestick data
- Converting exchange data into the application's common `MarketHistory` format

The rest of the application does not need to know the details of the Binance API.

## Technical Indicators

The scanner analyzes market history using a collection of technical indicators.

Indicators produce trading signals such as:

```text
BUY
SELL
NEUTRAL
```

The scanner combines indicator results to determine the overall market signal and score.

Strong signals can also be identified when multiple indicators agree with the same direction.

## Market Scanner

The scanner filters out neutral markets and displays the strongest trading opportunities.

The dashboard provides:

### Market Scanner

Displays the highest-ranked trading opportunities based on the scanner score.

### Market Analysis

Displays indicator results for the selected markets and provides cryptocurrency search functionality.

## Error Handling

Market API failures are handled inside the market provider.

For example, if Binance becomes temporarily unavailable, the provider returns an empty result instead of allowing an API exception to crash the Next.js page.

This allows the UI to display its existing empty-state messages rather than an unhandled runtime error.

## Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Development

Create a feature branch before making changes:

```bash
git checkout -b feature/my-feature
```

After making changes:

```bash
git add .
git commit -m "feat: describe your change"
git push -u origin feature/my-feature
```

## Roadmap

Potential future improvements include:

- Additional exchange providers
- More technical indicators
- Improved signal scoring
- Advanced market filtering
- Real-time market data
- Historical performance analysis
- Backtesting
- Strategy optimization
- Alerts and notifications
- Additional dashboard customization

## License

This project is for educational and development purposes.
