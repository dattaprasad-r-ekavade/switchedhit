# SwitchedHit 🏏

A cricket team-management simulation game inspired by classic Hitwicket mechanics.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: TanStack Query
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Core Logic**: Shared TypeScript packages (match-engine, models, utils)
- **Deployment**: Vercel (frontend) + Supabase (backend)

## Project Structure

```
switchedhit/
├── apps/
│   └── web/                 # Next.js frontend application
│       ├── app/            # Next.js App Router pages
│       ├── components/     # React components
│       ├── lib/           # Utilities and configurations
│       │   ├── supabase/  # Supabase client setup
│       │   └── utils.ts   # Helper functions
│       └── hooks/         # Custom React hooks
├── packages/
│   ├── match-engine/       # Cricket match simulation engine
│   ├── models/            # Shared TypeScript types and interfaces
│   └── utils/             # Shared utility functions
└── pnpm-workspace.yaml    # Workspace configuration
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in `apps/web/`:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Update the Supabase credentials:
- Get your Supabase URL and Anon Key from [Supabase Dashboard](https://app.supabase.com)
- Update `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Build Shared Packages

```bash
pnpm build
```

### 4. Start Development Server

```bash
pnpm dev
```

The app will be available at http://localhost:3000

## Available Scripts

### Root Level

- `pnpm dev` - Start the development server
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages
- `pnpm type-check` - Type check all packages
- `pnpm clean` - Clean all build artifacts

### Individual Packages

```bash
# Build a specific package
pnpm --filter @switchedhit/models build

# Watch mode for development
pnpm --filter @switchedhit/match-engine dev
```

## Shared Packages

### @switchedhit/models
Contains shared TypeScript types and interfaces:
- `Player`, `Team`, `Match` types
- `PlayerRole`, `MatchStatus` enums
- Stats interfaces (`BattingStats`, `BowlingStats`, `FieldingStats`)

### @switchedhit/utils
Utility functions for the game:
- `formatCurrency()` - Format numbers as currency
- `calculateOverall()` - Calculate player ratings
- `formatScore()` - Format match scores
- `calculateRequiredRunRate()` - Calculate RRR

### @switchedhit/match-engine
Cricket match simulation logic:
- `simulateBall()` - Simulate individual ball
- `simulateOver()` - Simulate an over
- `initializeMatch()` - Create new match instance

## Supabase Setup

1. Create a new Supabase project at https://app.supabase.com
2. Copy your project URL and anon key to `.env.local`
3. Set up your database schema (tables for users, teams, players, matches)
4. Configure authentication methods
5. Set up Row Level Security (RLS) policies

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Framework: Next.js
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && pnpm build --filter=web`
   - Install Command: `pnpm install`
3. Add environment variables in Vercel dashboard
4. Deploy!

### Backend (Supabase)

Your Supabase project is already deployed when you create it. You just need to:
1. Set up your database schema
2. Configure Edge Functions (if needed)
3. Set up Storage buckets (if needed)

## Features to Implement

- [ ] User authentication
- [ ] Team creation and management
- [ ] Player trading and upgrades
- [ ] Match simulation with live commentary
- [ ] League and tournament systems
- [ ] Player stats tracking
- [ ] Leaderboards
- [ ] In-game economy (coins, rewards)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT
