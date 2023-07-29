FROM node:18-alpine

WORKDIR /home/node/frontend-db1

EXPOSE 5173

HEALTHCHECK --interval=30s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:5173/healthcheck || exit 1

COPY package.json package-lock.json ./

RUN npm install \
    && npm cache clean --force  

COPY . .

CMD [ "npm", "run", "dev" ]
