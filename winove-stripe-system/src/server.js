import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { salvarPagamento } from './db.js';

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const successUrl = process.env.CHECKOUT_SUCCESS_URL || 'http://localhost:3000/sucesso';
const cancelUrl = process.env.CHECKOUT_CANCEL_URL || 'http://localhost:3000/cancelado';

app.use(bodyParser.json());
app.use('/webhook', express.raw({ type: 'application/json' }));

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: 'Produto Winove' },
            unit_amount: 12000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Erro ao criar checkout:', err);
    res.status(500).json({ error: 'Erro ao criar sessão de pagamento.' });
  }
});

app.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Erro webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    salvarPagamento(session);
  }

  res.json({ received: true });
});

app.listen(4242, () => {
  console.log('Servidor Stripe rodando na porta 4242');
});
