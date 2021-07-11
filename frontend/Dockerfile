FROM node:14-alpine as deps

WORKDIR /usr/app

# Copies only package.json and lock file to avoid rebuilds if the package.json hasn’t changed.
COPY package.json package-lock.json ./
RUN npm install npm@latest -g && npm install

FROM node:14-alpine

ENV RULEBOOK_API_URL=http://backend:5050/api/v1
ENV NODE_ENV=production

WORKDIR /usr/app

COPY . .
COPY --from=deps /usr/app /usr/app

RUN apk add bash && chmod +x wait-for-it.sh

EXPOSE 8080
CMD ["./wait-for-it.sh", "backend:5050", "--timeout=15", "--", "npm", "run", "docker"]
