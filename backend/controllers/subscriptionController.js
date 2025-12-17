import stripe from "../utils/stripe.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const { plan } = req.body;
        const userId = req.userId;

        let priceId;

        if (plan === "premium") {
            priceId = process.env.STRIPE_PRICE_PREMIUM;
        } else if (plan === "premium_plus") {
            priceId = process.env.STRIPE_PRICE_PREMIUM_PLUS;
        } else {
            return res.status(400).json({ error: "Invalid plan selected" });
        }

        const successURL = `${process.env.CLIENT_URL}/verify?success=true`;
        const cancelURL  = `${process.env.CLIENT_URL}/verify?success=false`;

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url : successURL,
            cancel_url : cancelURL,
            metadata: { userId }
        });

        res.json({ url: session.url });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
}