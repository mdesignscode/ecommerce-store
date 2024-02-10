const stripe = require('stripe')(process.env.STRIPE_SECRET);

async function createStripeProduct(title: string, description: string, images: (string | undefined)[]) {
  try {
    const product = await stripe.products.create({
      name: title,
      description,
      images
    });
    return product
  } catch (error: any) {
    console.log("Error: ", error.message)
    return new Promise(resolve => setTimeout(async () => {
      resolve(await stripe.products.create({
        name: title,
        description,
        images
      }))
    }, 1000))
  }
}

async function createStripePrice(amount: number, productId: string) {
  try {
    const price = await stripe.prices.create({
      currency: 'usd',
      unit_amount: amount,
      product: productId,
      billing_scheme: "per_unit"
    });
    return price
  } catch (error: any) {
    console.log("Error: ", error.message)
    return new Promise(resolve => setTimeout(async () => {
      resolve(await stripe.prices.create({
        currency: 'usd',
        unit_amount: amount,
        product: productId,
        billing_scheme: "per_unit"
      }))
    }, 1000))
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
