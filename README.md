
# Quick food

A Web App for online food ordering

https://quickfood-app.web.app/

## Features

- Admin dashboard
- Add/Manage items orders from dashboard
- Google authentication
- Stripe payment


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

There are two .env files 

1) Client

- `VITE_IMAGE_HOSTING_KEY`- from imgbb

- `VITE_APIKEY` - form firebase

- `VITE_AUTHDOMAIN` - form firebase

- `VITE_PROJECTID` - form firebase

- `VITE_STORAGEBUCKET` - form firebase

- `VITE_MESSAGINGSENDERID` - form firebase

- `VITE_APPID` - form firebase

2) Server

- `MONGO_URI`- from mongodb

- `ACCESS_TOKEN_SECRET`- for this

```bash
  node
  require('crypto').randomBytes(64).toString('hex')
```

- `STRIPE_KEY`- from stripe


## Run Locally

Clone the project

```bash
  git clone https://github.com/Viveklokadiya/Quickfood.git
```

Go to the project directory

```bash
  cd Quickfood
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Tech Stack

**Client:** React,TailwindCSS

**Server:** Node, Express

