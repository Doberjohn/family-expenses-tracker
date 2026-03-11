# Family Expenses Tracker — App Structure

A simple expenses tracking app for a couple (John & Christina), built with React Native + Expo.

## Tech Stack

- **Expo SDK 55** (React Native 0.83, TypeScript)
- **@gorhom/bottom-sheet** — slide-up form for adding entries
- **react-native-reanimated** + **react-native-gesture-handler** — animations & gestures for the bottom sheet
- **lucide-react-native** — icon set (same icons used in the design)
- **@expo-google-fonts/dm-sans** + **@expo-google-fonts/bricolage-grotesque** — custom fonts

## File Structure

```
family-expenses-tracker/
├── App.tsx                    # Root component — loads fonts, manages state, renders the full UI
├── index.ts                   # Expo entry point
├── app.json                   # Expo config
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
├── STRUCTURE.md               # This file
├── assets/                    # App icons, splash screen
└── src/
    ├── theme.ts               # Design tokens
    ├── types.ts               # TypeScript interfaces
    ├── data.ts                # Categories & sample transactions
    ├── Icon.tsx               # Lucide icon wrapper component
    ├── BalanceCard.tsx         # Coral balance card
    ├── TransactionRow.tsx      # Single transaction list item
    └── AddEntrySheet.tsx       # Bottom sheet form for adding entries
```

## How It Works

### Single-Screen Layout

The app is a single screen with everything stacked vertically:

1. **Header** — "Good morning," greeting + "John & Christina" title + bell icon
2. **Balance Card** — coral card showing total balance for the month, auto-calculated from all transactions
3. **Action Buttons** — two side-by-side buttons: "Expense" (dark) and "Income" (light)
4. **Transaction List** — scrollable `FlatList` of all transactions, newest first

### Adding Entries

Tapping either button opens a **bottom sheet** (slides up from the bottom) with:
- Amount input (numeric keyboard)
- Category selector (tap to cycle through available categories)
- Note text field
- "Paid by" toggle — John or Christina
- Submit button ("Add Expense" or "Add Income")

New entries are prepended to the transaction list and the balance recalculates automatically.

### State Management

Currently using React `useState` in `App.tsx`:
- `transactions` — array of all transactions (initialized with sample data)
- `sheetType` — whether the bottom sheet is in "expense" or "income" mode

The total balance is derived via `useMemo` from the transactions array.

## Design Tokens (src/theme.ts)

### Colors
| Token      | Value     | Usage                        |
|------------|-----------|------------------------------|
| coral      | `#FF6B6B` | Primary accent, balance card |
| dark       | `#1A1A1A` | Text, expense button         |
| muted      | `#9CA3AF` | Secondary text               |
| cardBg     | `#F6F7F8` | Card/input backgrounds       |
| white      | `#FFFFFF` | Screen background            |
| indigo     | `#6366F1` | Restaurant/transport icons   |
| green      | `#22C55E` | Income amounts, electric     |
| amber      | `#D97706` | Grocery icons                |

### Typography
| Token        | Font                            | Usage            |
|--------------|---------------------------------|------------------|
| heading      | Bricolage Grotesque 700         | Section titles   |
| headingBlack | Bricolage Grotesque 800         | Balance amount   |
| body         | DM Sans 400                     | Body text        |
| bodyMedium   | DM Sans 500                     | Labels           |
| bodySemiBold | DM Sans 600                     | Button text      |
| bodyBold     | DM Sans 700                     | Transaction amounts |

### Spacing & Radii
- Content padding: **24px**
- Card border radius: **20px**
- Input/row border radius: **16px**
- Icon containers: **12px** radius
- List gap: **12px**

## Categories

| Name       | Icon         | Color  | Type    |
|------------|-------------|--------|---------|
| Groceries  | ShoppingCart | amber  | expense |
| Restaurant | Utensils    | indigo | expense |
| Electric   | Zap         | green  | expense |
| Transport  | Car         | indigo | expense |
| Salary     | Briefcase   | green  | income  |
| Freelance  | Laptop      | indigo | income  |

## Currency

All amounts use the **euro (€)** symbol.

## Running the App

```bash
cd D:/johnn/Projects/family-expenses-tracker
npx expo start
```

Then press:
- `w` — open in web browser
- `a` — open on Android (Expo Go or emulator)
- `i` — open on iOS (Expo Go or simulator, macOS only)
