# Food Store Quickstart

Welcome to the Objective Food Store Quickstart repository! This project is designed to help you kickstart your food marketplace application using Next.js and a suite of modern development tools. It provides a solid foundation for building a scalable, feature-rich e-commerce platform.

✨ **Live demo:** https://examples-food-quickstart.vercel.app/search?query=something+warm+and+hearty

# Features

-   Next.js Framework: Leverage the power of Next.js for server-side rendering, static site generation, and API routes.
-   Objective SDK Integration: Easily interact with Objective's API for product data management and search capabilities.
-   Tailwind CSS: Utilize Tailwind CSS for styling your application with minimal effort and high flexibility.
-   Responsive Design: Built-in responsive design for a great user experience across all devices.

### Step 1. Create an account on Objective

First, [create an account on Objective](https://www.objective.inc/get-objective).

After following the quickstart example, make note of your API Key, and Index ID which you'll be needing later.

### Step 2. Setting up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set the variable on `.env.local`:

-   `OBJECTIVE_API_KEY` should be the API Key from when you went through the quickstart.
-   `OBJECTIVE_INDEX_ID` should be the ID of the Index you created in the quickstart.

Your `.env.local` file should look like this:

```bash
OBJECTIVE_API_KEY=...
OBJECTIVE_INDEX_ID=
```

# Data and Scripts

The project includes a data directory and a scripts directory to facilitate easy setup and data management:

-   Data: Contains sample JSON data files, such as yummly_mapped.json, which you can use to populate your application with initial food data.
-   Scripts: Provides utility scripts to interact with external APIs and services. For example, upload-data-to-object-store.js allows you to upload food data to an object store using the Objective API.

# Uploading Data

To upload the sample data to your object store, ensure you have set your API key in the script and run:

```bash
node scripts/upload-data-to-object-store.js
```

# Creating your index

After uploading data you can create a multimodal index tailored to the sample data using

```bash
node scripts/create-multimodal-index.js
```

This script reads the JSON file from the data directory and uploads each object to the specified object store endpoint.

## Getting Started

1. Clone the repository to your local machine.
2. Install dependencies with pnpm install.
3. Update your environment variables by creating a `.env.local` using the vars defined in `.env.example`
4. Start the development server with pnpm run dev
5. Open http://localhost:3000 to view your application.

# Deployment

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js. Check out the Next.js deployment documentation for more details.

# Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have suggestions or encounter any problems.
