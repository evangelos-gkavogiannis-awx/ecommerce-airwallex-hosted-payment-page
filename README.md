This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It's a simple ecommerce app that integrates with Airwallex Hosted Payment Page

## Getting Started

Steps to run the app:
1. Update the `.env` file with a valid Bearer token
2. On the home directory run `npm install` for installing the dependencies
3. `npm run dev` will run both the server and the client
4. Open [http://localhost:3000](http://localhost:3000) with your browser  


## E2E flow
1. Add the products to the cart
2. Click on the cart --> this calls the `Modal.js`
3. On the Modal click `Checkout` and this triggers the `checkout()` function
4. The `chekcout()` has alreeady the total cost and the currency and call the `route.js`
5. From the `route.js` we call the `create-intent` endpoint of Airwallex
6. The `create-intent` returns the `client-id` and `client secret`
7. Both are passed back to front end and they used to call the `redirectToCheckout()` (more details about the redirecttoCheckout() can be found [here](https://github.com/airwallex/airwallex-payment-demo/tree/master/docs#redirectToCheckout))


## Code explantion
`app/(store)/store.js` ==> this is the state management. We use Zustand

`api/checkout/route.js` ==> this the backend, where we call the Airwallex API to create the payment intent

`app/product/page.js` ==> this is the page when you click to a product

`Header.js` ==> code to handle the cart which is on the header

`app/ProductCard.js` ==> the card of each product


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
