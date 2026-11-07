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

The two `EMAIL_` variables are optional. Without them, new accounts skip email verification, which
is how the store runs on hosts that block SMTP (Render's free plan does).

Seeded users sign in with `<FirstLast>@seed.email` and their full name as the password
(see `src/scripts/createFakeUsers.ts`). The first seeded user is an admin (`/admin`).

### Payments

Checkout creates a Stripe Checkout session priced from the database, so customers pay exactly
what the store shows. Orders are recorded by the webhook; forward events locally with:

```sh
stripe listen --forward-to localhost:5173/api/stripe/webhook
```

### Database on deploy

`bun run start` first runs `src/scripts/prepareDb.ts`, which creates missing tables and, when the
catalog is empty, loads `seed/catalog.json`. Refresh that snapshot from your local database with
`bun run db:export`. Demo users are not exported.

On hosts without a persistent disk (such as Render's free plan) the SQLite file is recreated on
every deploy or restart, so accounts, carts and orders reset while the catalog reloads.

## Scripts

| Command             | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `bun run dev`       | Start the dev server                                  |
| `bun run build`     | Production build (adapter-node)                       |
| `bun run start`     | Prepare the database, then serve the production build |
| `bun run check`     | Type-check with svelte-check                          |
| `bun run lint`      | Prettier + ESLint                                     |
| `bun run db:seed`   | Sync tables and seed demo data                        |
| `bun run db:export` | Snapshot the local catalog to `seed/catalog.json`     |
