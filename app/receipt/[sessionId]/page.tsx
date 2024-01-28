import dynamic from "next/dynamic";

const ReceiptPage = dynamic(() => import("./Components/ReceiptPage"));

export default async function Page({
  params: { sessionId },
}: {
  params: { sessionId: string };
}) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET);

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return (
    <main className="flex flex-col py-4 items-center mb-14">
      <ReceiptPage sessionStr={JSON.stringify(session)} />
    </main>
  );
}
