# Common Goods

A demo e-commerce store built with SvelteKit 2, Svelte 5, Tailwind CSS 4, Sequelize (SQLite) and Stripe Checkout.

## Setup

```sh
bun install
bun run db:seed   # creates tables, products (with Stripe test objects) and demo users
bun run dev
```

### Environment (`.env`)

| Variable         | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `STRIPE_SECRET`  | Stripe secret key (use a `sk_test_` key)      |
| `WEBHOOK_SECRET` | Signing secret for `/api/stripe/webhook`      |
| `EMAIL_ADDRESS`  | Gmail address used to send verification codes |
| `EMAIL_CODE`     | Gmail app password for that address           |

Seeded users sign in with `<FirstLast>@seed.email` and their full name as the password
(see `src/scripts/createFakeUsers.ts`). The first seeded user is an admin (`/admin`).

### Payments

Checkout creates a Stripe Checkout session priced from the database, so customers pay exactly
what the store shows. Orders are recorded by the webhook; forward events locally with:

```sh
stripe listen --forward-to localhost:5173/api/stripe/webhook
```

## Scripts

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `bun run dev`     | Start the dev server            |
| `bun run build`   | Production build (adapter-node) |
| `bun run start`   | Serve the production build      |
| `bun run check`   | Type-check with svelte-check    |
| `bun run lint`    | Prettier + ESLint               |
| `bun run db:seed` | Sync tables and seed demo data  |
