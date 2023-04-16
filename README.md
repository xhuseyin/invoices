# Invoicing Web App

This is a simple invoicing web application built with Next.js

## Getting Started

To get started, first clone this repository:

```bash
git clone https://github.com/<YOUR_USERNAME>/invoices.git
```

Then, navigate to the project directory and install the dependencies:

```bash
cd invoices
npm install
```

Create a .env.local file in the root directory and copy the following environment variables into the file:

```bash
MONGODB_URI=mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@cluster0.vdjpsig.mongodb.net/?retryWrites=true&w=majority
```

To start the development server, run the following command:

```bash
npm run dev
```

This will start the server on [http://localhost:3000]. Open this URL in your browser to see the web app.

You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.

API routes can be accessed on [http://localhost:3000/api/invoices]. This endpoint can be edited in pages/api/invoices.js.

## Deploying to Vercel

This project can be easily deployed to Vercel. To deploy the app, first create a new project on Vercel and link it to your Github repository. Once you have linked the repository, Vercel will automatically build and deploy the project whenever you push changes to the repository.

## Contributing

Contributions are always welcome! If you find any bugs or issues, please create a new issue on Github. If you would like to contribute to the project, please create a new pull request.
