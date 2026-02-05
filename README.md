
# Quick food

A Web App for online food ordering

https://quickfood-app.web.app/

## Features

- Admin dashboard 
- Add/Manage items orders from dashboard
- Google authentication
- Stripe payment
- Email invoice
- jenkins pipeline


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
  
- `USER` - Gmail User id
  
- `PASS` - Gmail App pass


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

- Open http://localhost:5173/


## Tech Stack

**Client:** React,TailwindCSS

**Server:** Node, Express

## Infrastructure & Deployment

- **Containerized apps**: Both the React frontend and Node/Express backend are built into Docker images (see `client/Dockerfile` and `server/Dockerfile`).
- **Kubernetes**: Workloads run inside the `quickfood` namespace with dedicated deployments (`frontend-deployment`, `backend-deployment`, `mongodb-deployment`), NodePort services, and ingress routes defined under the `k8s/` directory.
- **Ingress / TLS**: `k8s/ingress.yml` maps `quickfood.viveklokadiya.live` to the frontend service and `api.quickfood.viveklokadiya.live` to the backend service. An NGINX reverse proxy on the host forwards traffic from ports 80/443 to the cluster and is prepared for Let’s Encrypt certificates.
- **Secrets management**: Runtime environment variables are stored in Kubernetes secrets defined in `k8s/secrets.yml`. The Jenkins pipeline injects `.env` files before building images to ensure Firebase and server credentials are embedded during the build.

## CI/CD Pipeline (Jenkins)

The `Jenkinsfile` automates build and deployment:

1. **Clone Repository** – pulls the `devops` branch and sets `IMAGE_TAG = build-${BUILD_NUMBER}`.
2. **Prepare Env Files** – securely copies the client/server `.env` files from Jenkins credentials so Docker builds have access to the required values.
3. **Build Frontend & Backend Images** – runs two `docker build` steps producing versioned and `latest` tags for both services.
4. **Push Images** – authenticates to Docker Hub (credential ID `dockerhub-credentials`) and pushes the freshly built tags.
5. **Deploy to Kubernetes** – loads a kubeconfig credential (`quickfood-kubeconfig`), updates the deployments via `kubectl set image`, and waits for rollout completion.

Adjust the referenced credential IDs in Jenkins to match your environment.

## Kubernetes Manifests Overview

- `k8s/namespace.yml` – creates the `quickfood` namespace.
- `k8s/frontend-deployment.yml` / `k8s/backend-deployment.yml` – define replica counts, container images, and environment sources.
- `k8s/frontend-service.yml` / `k8s/backend-service.yml` – expose pods internally via NodePort for ingress and debugging.
- `k8s/secrets.yml` – stores base64-encoded frontend (Vite) and backend (Mongo/Stripe/auth) variables.
- `k8s/ingress.yml` – configures routing to the two domains through the nginx ingress controller.

Use `kubectl apply -f k8s/` to recreate the stack locally (e.g., on kind) or point kubeconfig to your cluster before applying.
