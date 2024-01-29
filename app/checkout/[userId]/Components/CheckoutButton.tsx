"use client";

import SpinningLoader from "@/components/SpinningLoader";
import useCreateCheckoutUser from "@/hooks/createCheckoutUser";
import useGlobalStore from "@/lib/store";
import {
  CheckIcon, ShoppingBagIcon
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import {
  Dispatch,
  SetStateAction, useEffect,
  useState
} from "react";
import { Button } from "react-aria-components";

interface ICheckoutButtonProps {
  creatingCheckoutSession: boolean;
  setShouldCreateCheckoutSession: Dispatch<SetStateAction<boolean>>;
  checkoutSessionCreated: boolean;
  clientSecret: string;
}

export default function CheckoutButton({
  clientSecret,
  creatingCheckoutSession,
  checkoutSessionCreated,
  setShouldCreateCheckoutSession,
}: ICheckoutButtonProps) {
  const [createCheckoutUser, setCreateCheckoutUser] = useState(false),
    { isSuccess: checkoutUserCreated, isFetching: creatingCheckoutUser } =
      useCreateCheckoutUser(createCheckoutUser),
    { activeUser } = useGlobalStore(),
    [CTAContent, setCTAContent] = useState({
      text: "Ready for Checkout",
      icon: <ShoppingBagIcon width={25} />,
    }),
    BUTTON_DISABLED = CTAContent.text !== "Ready for Checkout";

  useEffect(() => {
    // creating checkout user
    if (creatingCheckoutUser) {
      setCTAContent({
        text: "Creating Stripe User",
        icon: <SpinningLoader />,
      });
      return;
    }

    // checkout user created
    if (checkoutUserCreated) {
      setCTAContent({
        text: "Stripe User Created",
        icon: <CheckIcon width={25} />,
      });
      return;
    }

    // creating checkout session
    if (checkoutUserCreated && !clientSecret) {
      setCTAContent({
        text: "Creating checkout session",
        icon: <SpinningLoader />,
      });
      return;
    }

    // stripe component ready
    if (clientSecret) {
      setCTAContent({
        text: "Proceed with checkout",
        icon: <ShoppingBagIcon width={25} />,
      });
      return;
    }
  }, [
    checkoutSessionCreated,
    checkoutUserCreated,
    clientSecret,
    creatingCheckoutSession,
    creatingCheckoutUser,
  ]);

  function handleCheckout() {
    if (!activeUser?.checkoutId) {
      // create stripe user first
      setCreateCheckoutUser(true);
    } else {
      // else just proceed with checkout session
      setShouldCreateCheckoutSession(true);
    }
  }

  // create checkout session after creating stripe user
  useEffect(() => {
    if (!activeUser?.checkoutId && checkoutUserCreated) {
      setShouldCreateCheckoutSession(true);
    }
  }, [
    activeUser?.checkoutId,
    checkoutUserCreated,
    setShouldCreateCheckoutSession,
  ]);

  return (
    <Button
      isDisabled={BUTTON_DISABLED}
      onPress={handleCheckout}
      className={classNames(
        { "opacity-50": BUTTON_DISABLED },
        "flex gap-2 items-center justify-center",
        "bg-primary p-4 rounded-lg text-white"
      )}
    >
      <p className="font-bold">{CTAContent.text}</p>
      {CTAContent.icon}
    </Button>
  );
}
