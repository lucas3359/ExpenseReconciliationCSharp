## Summary

Expense Reconciliation is a tool for keeping track of shared expenses and assigned a split value to each expense.

Transactions can be uploaded using the OFX format and are stored in a relational database. Transactions are then listed on the app and can be split according to pre-set values or a custom amount.

Google OAuth is used as the identity provider for logging in.

![Home Page](/screens/home.png)
![Transactions Page](/screens/transactions.png)

![Demo](/screens/expenses-demo.gif)

## Dependencies

- [Next.js](https://nextjs.org/) (React/TypeScript)
- [Next.js Auth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io) (default Postgres database)
- [Docker](https://docker.com)
- [node-ofx-parser](https://www.npmjs.com/package/node-ofx-parser)
- [Tailwind](https://tailwindcss.com)

## Installation

```
docker build -t lucashuang/expense-reconciliation
docker run -e DATABASEURL='%YOUR_DATABASE_STRING%' -p 3000:3000 lucashuang/expense-reconciliation
```

If using a database other than Postgres, change the provider in prisma/schema.prisma

## Development

```
git clone git@github.com:lucas3359/expense-reconciliation.git
yarn install
```

Copy .env to .env.local and add database string to DATABASE_URL

```
npx prisma generate
npm run dev
```

Application will run on localhost:3000
