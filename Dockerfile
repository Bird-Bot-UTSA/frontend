# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# If you prefer, set NEXT_PUBLIC_API via ECS env vars (recommended)
# ENV NEXT_PUBLIC_API=https://jyhcs69hk7.execute-api.us-east-1.amazonaws.com
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm","run","start"]
