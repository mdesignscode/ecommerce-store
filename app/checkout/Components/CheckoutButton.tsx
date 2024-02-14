"use client";

import SpinningLoader from "@/Components/SpinningLoader";
import { createCheckoutUser } from "@/actions/createCheckoutUser";
import useGlobalStore from "@/lib/store";
import { CheckIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { IClientSecret } from "./CheckoutPage";

interface ICheckoutButtonProps {
  clientSecretStatus: IClientSecret;
  setShouldCreateCheckoutSession: Dispatch<SetStateAction<boolean>>;
}

export default function CheckoutButton({
  clientSecretStatus,
  setShouldCreateCheckoutSession,
}: ICheckoutButtonProps) {
  const { currentUser, setCurrentUser } = useGlobalStore(),
    [CTAContent, setCTAContent] = useState({
      text: "Ready for Checkout",
      icon: <ShoppingBagIcon width={25} />,
    }),
    BUTTON_DISABLED = CTAContent.text !== "Ready for Checkout",
    [checkoutUserStatus, setCheckoutUserStatus] = useState<{
      status: "default" | "loading" | "success";
      error?: string;
    }>({
      status: "default",
    });

  useEffect(() => {
    // creating checkout user
    if (checkoutUserStatus.status === "loading") {
      setCTAContent({
        text: "Creating Stripe User",
        icon: <SpinningLoader />,
      });
      return;
    }

    if (checkoutUserStatus.status === "success") {
      setCTAContent({
        text: "Stripe user created",
        icon: <CheckIcon width={25} />,
      });
      return;
    }

    // checkout user created
    if (clientSecretStatus.status === "loading") {
      setCTAContent({
        text: "Creating checkout session",
        icon: <SpinningLoader />,
      });
      return;
    }

    // stripe component ready
    if (clientSecretStatus.status ===  "success") {
      setCTAContent({
        text: "Proceed with checkout",
        icon: <ShoppingBagIcon width={25} />,
      });
      return;
    }
  }, [
    checkoutUserStatus.status,
    clientSecretStatus.secret,
    clientSecretStatus.status,
  ]);

  useEffect(() => console.log({clientSecretStatus}), [clientSecretStatus])

  async function handleCheckout() {
    if (!currentUser?.user?.checkoutId) {
      // create stripe user first
      setCheckoutUserStatus({
        status: "loading",
      });

      const updatedUser = await createCheckoutUser();

      setCurrentUser(currentUser, { user: updatedUser });

      setCheckoutUserStatus({
        status: "success",
      });
    } else {
      // else just proceed with checkout session
      setShouldCreateCheckoutSession(true);
    }
  }

  // create checkout session after creating stripe user
  useEffect(() => {
    if (checkoutUserStatus.status === "success") {
      setShouldCreateCheckoutSession(true);
    }
  }, [
    checkoutUserStatus.status,
    currentUser?.user?.checkoutId,
    setShouldCreateCheckoutSession,
  ]);

  return (
    <Button
      key={clientSecretStatus.secret}
      isDisabled={BUTTON_DISABLED}
      onPress={handleCheckout}
      className={classNames(
        { "opacity-50 cursor-not-allowed": BUTTON_DISABLED },
        "flex gap-2 items-center justify-center",
        "bg-primary p-4 rounded-lg text-white self-center focus:outline-primary"
      )}
    >
      <p className="font-bold">{CTAContent.text}</p>
      {CTAContent.icon}
    </Button>
  );
}
