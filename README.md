# Family Expenses Tracker

A simple, clean expenses tracking app for couples. Built with React Native + Expo.

Track shared expenses and income between two people, see who spent what, and keep your finances transparent.

## Features

- **Shared balance overview** — coral card showing total balance for the month
- **Add expenses & income** — bottom sheet form with category, note, and "paid by" selector
- **Transaction history** — scrollable list with category icons, amounts, and who paid
- **Two-person toggle** — every entry is tagged to John or Christina
- **Euro currency** — all amounts displayed in euros

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo`)

### Install

```bash
git clone <repo-url>
cd family-expenses-tracker
npm install
```

### Run

```bash
npx expo start
```

Then press:
- `w` to open in the browser
- `a` to open on Android (via Expo Go)
- `i` to open on iOS (via Expo Go, macOS only)

## Tech Stack

| Tool | Purpose |
|------|---------|
| Expo SDK 55 | React Native framework |
| @gorhom/bottom-sheet | Slide-up add entry form |
| lucide-react-native | Icons |
| DM Sans + Bricolage Grotesque | Typography |
| TypeScript | Type safety |

## Project Structure

See [STRUCTURE.md](./STRUCTURE.md) for a detailed breakdown of every file, design tokens, and architecture decisions.

## License

MIT
