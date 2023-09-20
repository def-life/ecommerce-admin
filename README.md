This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

**The Only purpose of the project was Next-Auth(Credential Provider + OAuth), Upload images to S3 bucket AWS, Integrating Payment Gateway, try out SWE(stale while revalidate). Ignore a little bit of UI,, UI takes time. No particular Design was there in my mind. Main focus was above functionalities.**


**Some Images showing the next-app**
![Image 1](https://drive.google.com/uc?id=1JbICktk-eYk3jK3EmEzOAN768Zh84jCb)
![Image 2](https://drive.google.com/uc?id=10b0XiLvO61gTj2Pt7p-NQJmhkGWeoVNY)
![Image 3](https://drive.google.com/uc?id=1eW9a15M-F__k7u2zbwv8eaak9b0ymkRO)
![Image 4](https://drive.google.com/uc?id=1MDBuRGozEmLGZzEMy1T6OiGMs17Y1Jv-)
![Image 5](https://drive.google.com/uc?id=12STykyGUezng5b1tpqnFHzBtJybS2Tl-)
![Image 6](https://drive.google.com/uc?id=1zW9Z9izF0CS9IaTnw9-Fj2EEZuMfA5RW)
![Image 7](https://drive.google.com/uc?id=1EdobZs0NYvcCnwa-SkgqCVE_L0rMmyN-)
![Image 8](https://drive.google.com/uc?id=1lp8V8eHQZYjLYQ8-_ta_P6Jj11xCaii2)




**.env file**
```javascript
GOOGLE_ID=""
GOOGLE_SECRET=""
MONGODB_URI=""
NEXTAUTH_SECRET=""
S3_ACCESS_KEY=""
S3_SECRET_KEY=""
RAZARPAY_KEYID=""
RAZARPAY_SECRET=""