import dynamic from "next/dynamic";
import { handleProductsPurchase } from "./Components/actions/handleProductsPurchase";

const ReceiptPage = dynamic(() => import("./Components/ReceiptPage"));

export interface IReceiptObject {
  name: string;
  total: number;
  unitAmount: number;
  subtotal: number;
  quantity: number;
}

export default async function Page({
  params: { sessionId },
}: {
  params: { sessionId: string };
}) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET);

  // get checkout info
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

  // create receipt objects list
  const receiptObjects: IReceiptObject[] = lineItems.data.map((item: any) => ({
    name: item.description,
    total: item.amount_total / 100,
    unitAmount: item.price.unit_amount / 100,
    subtotal: item.amount_subtotal / 100,
    quantity: item.quantity,
  }));

  await handleProductsPurchase(receiptObjects);

  return (
    <main className="flex flex-col py-4 items-center mb-14">
      <ReceiptPage
        receiptObjects={receiptObjects}
        sessionStr={JSON.stringify(session)}
      />
    </main>
  );
}
