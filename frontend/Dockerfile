FROM node:14-alpine

# ARG RULEBOOK_API_URL
ENV RULEBOOK_API_URL=http://backend:5050/api/v1

WORKDIR /usr/app
COPY . .

RUN npm install && apk add bash && chmod +x wait-for-it.sh

EXPOSE 8080

# Waits for the backend before building as it's needed for server side rendering.
CMD ["./wait-for-it.sh", "backend:5050", "--timeout=5", "--", "npm", "run", "docker"]
