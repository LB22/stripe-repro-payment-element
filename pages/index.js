import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const clientSecret =
    "pi_3K5GlxBdFvXgNzqz0ur0hskT_secret_SKWp7IFLlsdL27Xdcbnk9WEZA";

  // https://stripe.com/docs/stripe-js/appearance-api#rules
  const appearance = {
    theme: `${resolvedTheme === "dark" ? "night" : "stripe"}`,
    labels: "floating",
  };

  // https://stripe.com/docs/js/elements_object/create
  // https://stripe.com/docs/stripe-js/appearance-api
  const options = {
    clientSecret,
    appearance,
  };

  // https://stackoverflow.com/a/64694798/13765158
  // Public Test Key
  const [stripePromise] = useState(() =>
    loadStripe(
      "pk_test_51HfivvBdFvXgNzqzRgyALfIw7diXwmUfx827a0JjUi07A9fqJXIvGJRrGPfjKeF7ja6EWmoqV3mgn5OTlgkDYguY005sEwaxNi"
    )
  );

  useEffect(() => {
    setMounted(true);
  }, []);
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  // When mounted on client, we can show UI
  if (!mounted) return null;

  return (
    <div>
      <h1>Payment Element Stripe</h1>
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
