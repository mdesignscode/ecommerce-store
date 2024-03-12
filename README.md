
# E-commerce store

A basic implementation of an e-commerce web app implementing features such as payment gateway, user authentication, add to cart and product listing.


## Demo

https://mdesigns-estore.vercel.app/


## Dependancies

[Bun](https://bun.sh/)

[Clerk.js](https://clerk.com/) - Create an account and a new app

[PostgreSQL](https://www.postgresql.org/)

[Stripe.js](https://stripe.com/) - Create an account
## Installation

1. Clone this project:

```bash
  git clone https://github.com/mdesignscode/ecommerce-store
```

2. Install dependancies

```bash
  cd ecommerce-store
  bun install
```

3. Run the project locally

```bash
  bun start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL="url to connect to your databse"`

`DIRECT_URL="url used for database migrations"`

`NEXT_PUBLIC_HOST_URL="url for your site"`

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="get public key from Clerk`
`CLERK_SECRET_KEY="get secretkey from Clerk"`

`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
`NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/`
`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`

`WEBHOOK_SECRET="get webhook secret from Clerk"`

`STRIPE_SECRET="get secret key from Stripe"`
`NEXT_PUBLIC_STRIPE_PUBLIC="get public key from Stripe`

## Dependancies

[Bun](https://bun.sh/)

[Clerk.js](https://clerk.com/) - Create an account and a new app

[PostgreSQL](https://www.postgresql.org/)

[Stripe.js](https://stripe.com/) - Create an account
## Acknowledgements

 - [Dummy JSON](https://dummyjson.com)
 - [EscuelaJS](https://api.escuelajs.co)
 - [Picsum Photos](https://picsum.photost)

