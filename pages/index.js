import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function Home() {
  const locale = "en";
  const clientSecret =
    "pi_3K5GlxBdFvXgNzqz0ur0hskT_secret_SKWp7IFLlsdL27Xdcbnk9WEZA";
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // https://stripe.com/docs/stripe-js/appearance-api#rules
  const appearance = {
    theme: `${resolvedTheme === "dark" ? "night" : "stripe"}`,
    labels: `${resolvedTheme === "dark" ? "floating" : ""}`,
    variables: {},
    rules: {},
  };
  // https://stripe.com/docs/js/elements_object/create
  // https://stripe.com/docs/stripe-js/appearance-api
  const options = {
    locale: locale,
    clientSecret,
    appearance,
  };

  // https://stackoverflow.com/a/64694798/13765158
  const [stripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  );

  useEffect(() => {
    setMounted(true);
  }, []);
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  // When mounted on client, we can show UI
  if (!mounted) return null;

  return (
    <div>
      <h1>Checkout</h1>
      <p>Powered by Stripe</p>
      <hr />
      <button onClick={() => setTheme("dark")}>Dark mode</button>
      <button onClick={() => setTheme("light")}>Light mode</button>
      <hr />
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentElement />
        </Elements>
      )}
    </div>
  );
}
