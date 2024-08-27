This is the website for the Management Technology Association.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), configured to perform server-side rendering using data from MongoDB.

## Integrations

The website uses authentication powered by OAuth, currently provided by Google Cloud. Authentication will allow administrator users to login and make quick edits. In the future, we can allow club members to log in and indicate their interest / status for event participation.

The website features server-side rendering using data from MongoDB. 

To connect to OAuth supply the app with secrets in `.env.local`, as modelled by the example configuration in `.env.example`. Additional secrets are needed to connect to MongoDB. Follow [Getting Started](#getting-started) instructions below.

For deployment to Vercel, provide the updated secrets as [environment variables on Vercel](https://vercel.com/docs/projects/environment-variables), and ensure that your MongoDB database is accepting connections from Vercel's servers.

## Deployment

This app is deployed to [Vercel](https://vercel.com/docs/getting-started-with-vercel/import).

## Getting Started

*Last updated Aug 2024*

To get the website running on your development machine, you will have to set-up integrations with MongoDB, Google Cloud (for OAuth). Create an `.env.local` file based on the template provided by `.env.example` and fill it out as below.

On Google Cloud, you will need to setup your API Credentials and the OAuth consent screen. Once these are setup for your account, connect the app to Google Cloud by providing the secrets for `GOOGLE_CLIENT_SECRET` and `GOOGLE_CLIENT_ID`.

On MongoDB, you can create a free-tier cluster, and within it create a database called `mta-website-db`. To connect the app to MongoDB, supply the required connection string for `MONGO_URI_DEV`. The database contains info for events and also contains image uploads. A small backup of the database can be found in the [meta-website-db-export](/data/mta-website-db-export/) folder, and it can be imported into your database with [instructions provided in that file](data/mta-website-db-export/README.md).

Also create your own secret password for `NEXTAUTH_SECRET` and never reveal this publicly.

(Optional) To reduce spam if you decide to enable the submission form, set up an account with HCaptcha, and provide their connection secret as `H_SECRET`. This feature has not been fully tested yet and is prone to errors.

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

To deploy the site live, deployment on Vercel is simplest and provides integrations with Git.

## Contributing

To add changes to the website, the following resources may be useful for learning Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [MongoDB](https://www.mongodb.com/docs/manual/introduction/)
- [Google OAuth](https://support.google.com/cloud/answer/6158849)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)


