# Nextjs (15) + Express Serverless Functions

This Repository contains Fullstack application running a Frontend NextJs 15 and Express Serverless Functions with Firebase Cloud functions

## Author

This Repository managed by [@prasetyaikrap](https://github.com/prasetyaikrap "@prasetyaikrap")

### Apps and Packages

- `frontend-repo`: a [Next.js](https://nextjs.org/) app
- `backend-repo`: a [Express JS](https://expressjs.com/) app deployed with [Firebase Cloud Functions](https://firebase.google.com/products/functions)
- `@repo/shared`: Shared folder between backend and frontend
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Setup

Before running the apps, please set the environment variable for each repository with their respective environment variables required

- frontend-repo: [env.example](./apps/frontend-repo/env.example)
- backend-repo: [env.example](./apps/backend-repo/env.example)

### Build

To build all apps and packages, run the following command (on root):

```
turbo run build
```

### Running Locally

After build the apps, you can run locally with firebase emulator with the command (on root):

```
turbo run start:local
```

Make sure you already setup [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite/connect_and_prototype) before performing

### Develop

To develop all apps and packages, run the following command:

```
turbo run dev
```
