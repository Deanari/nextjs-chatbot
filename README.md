# chatbot-ai

Hello there.

### How do I get set up? ###
* npm install
* Create an .env file with the following variables
  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  - CLERK_SECRET_KEY
  - NEXT_PUBLIC_CLERK_SIGN_IN_URL
  - DATABASE_URL
  - HUGGINGFACE_API_KEY
* Create your Clerk account for authentication management
  - Go to https://clerk.com/ and create a free account
  - Create you application and select auth methodsm allow usernames as well (for testing)
  - From the quickstart select Nextjs and copy NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to your .env
  - Also in .env set NEXT_PUBLIC_CLERK_SIGN_IN_URL to /sign-in
* Create your mysql database on your favourite provider (I choose neon just because it's free)
  - Go to https://console.neon.tech/ and create a free account
  - Select a name for your project and continue
  - Copy postgress connection string and paste it on your .env as DATABASE_URL
* Create your hugging face api key for the chatbot AI integration
  - Go to https://huggingface.co/ and create a free account
  - Go to settings - access token to create your auth token, olny read access is required
  - Paste your token in your .env as HUGGINGFACE_API_KEY
* Create Prisma's schema and mockdata with 
 `npx prisma generate` 
 `npx prisma db push`
 `node scripts/seed.ts` this will create your default chatbots
* You can now run the project with `npm run dev`

### How do I use this? ###
* run the project
* go to http://localhost:3000/ 
* Create an user, log in as user from authorization.
* Create a bot and talk to it (be aware that the integration is using a simple model so keep your questions precise);
  
### How do I run tests ###
* Create a new test user in the app and store set TEST_USER_NAME and TEST_USER_PASSWORD in your .env
* run `npx paywright test`
  
### How do I see the schema ###
* run `npx prisma studio` and navigate to http://localhost:5555

### Final thoughts ###
There is a lot to polish, env variables, cleanup, more tests. 
TODO: http://localhost:3000/ to .env