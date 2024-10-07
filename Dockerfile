FROM node:22

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci 

COPY . .

RUN echo "DATABASE_URL is: $DATABASE_URL"
RUN npx prisma generate
# RUN npx prisma migrate deploy
# RUN npx prisma db seed
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start:migrate"]
