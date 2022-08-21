This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.


## Basic info
1. Google Auth added with NextAuth
2. Bootstrap grid and utilities added
3. Chakra UI setup
4. Automatically handles sign in

## TODO
1. Create .env.local with the content
```
GOOGLE_CLIENT_ID=<client ID>
GOOGLE_CLIENT_SECRET=<client-secret>
NEXTAUTH_SECRET=<next secret>
```

2. Change URL in /utils/auth/fetchPermissionsFromEmail.ts to the backend url

## During deployment, add
NEXTAUTH_URL=https://example.com/custom-route/api/auth
to .env.local

## Getting Signed In User in client side
```
import { useSession } from "next-auth/react"
const {data:session} = useSession()
let user=null
if(session)
    user=session.user
```

## Getting Signed In User in server side (getServerSideProps and getStaticProps)
```
import getSignedInUser from '../utils/auth/getSignedInUser'
const session = let sess=await getSignedInUser(context);
let user=null
if(session)
    user=session.user
```


