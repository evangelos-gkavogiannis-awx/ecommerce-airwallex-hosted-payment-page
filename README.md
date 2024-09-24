This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The ecommerce app (built in Next.js) integrates with Airwallex Hosted Payment Page

## Getting Started

Steps to run the app:
1. update the .env file with a valid Bearer token
2. on the home directory run `npm install` for installing all the dependencies
3. `npm run dev` will run both the server and the client


## How the integration works
1. Adding the products to the cart
2. Click on the cart --> this calls the Modal.js
3. On the Modal you click Checkout and this trigger the checkout() in Modal.js
4. The chekcout() has alreeady the total cost and the currency and call the route.js
5. From the route.js we call the create-intent endpoint of Airwallex
6. the create-intent returns client-id and client secret
7. Both are passed back to front end and they used to call the redirectToCheckout()


## Code explantion
app/(store)/store.js ==> this is the state management. We use Zustand

api/checkout/route.js ==> this the backend, where we call the Airwallex API to create the payment intent

app/product/page.js ==> this is the page when you click to a product

Header.js ==> code to handle the cart which is on the header

app/ProductCard.js ==> the card of each product





```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
