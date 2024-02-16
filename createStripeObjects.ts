require("dotenv").config()

const stripe = require('stripe')(process.env.STRIPE_SECRET);

async function createStripeProduct(title: string, description: string, images: (string | undefined)[]) {
  const createProduct = async () => await stripe.products.create({
    name: title,
    description,
    images
  })

  try {
    const product = await createProduct();
    return product
  } catch (error: any) {
    if (error.statusCode === 429) {
      return new Promise(resolve => setTimeout(async () => {
        resolve(await createProduct())
      }, 1500))
    }
  }
}

async function createStripePrice(amount: number, productId: string) {
  const createPrice = async () => await stripe.prices.create({
    currency: 'usd',
    unit_amount: amount,
    product: productId,
    billing_scheme: "per_unit"
  });

  try {
    const price = await createPrice()
    return price
  } catch (error: any) {
    if (error.statusCode === 429) {
      return new Promise(resolve => setTimeout(async () => {
        resolve(await createPrice())
      }, 1500))
    }
  }
}

export async function createStripeObjects(product: {
  title: string, description: string, price: number
}, images: (string | undefined)[]) {
  // create stripe product
  const stripeProduct = await createStripeProduct(product.title, product.description, images)

  // create stripe price
  const stripePrice = await createStripePrice(product.price, stripeProduct.id)

  return { stripeProduct, stripePrice }
}
