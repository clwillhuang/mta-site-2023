This is the website for the Management Technology Association.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), configured to perform server-side rendering using data from MongoDB.

## Integrations

The website uses authentication powered by OAuth, currently provided by Google Cloud. Authentication will allow administrator users to make quick edits. In the future, we can allow club members to log in and indicate their interest / status for event participation.

The website features server-side rendering using data from MongoDB. 

To connect to OAuth supply the app with secrets in `.env.local`, as modelled by the example configuration in `.env.example`. Additional secrets are needed to connect to MongoDB. 

For deployment to Vercel, provide the updated secrets as [environment variables on Vercel](https://vercel.com/docs/projects/environment-variables).

## Deployment

This app is deployed to [Vercel](https://vercel.com/docs/getting-started-with-vercel/import).

## Getting Started

First, setup integrations as specified above.

Then, to run the development server:

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

## Contributing

To add changes to the website, the following resources may be useful for learning Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


