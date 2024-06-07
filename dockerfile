FROM node   
WORKDIR /RESTAPI
COPY . .
RUN npm i
ENV PORT 3000
CMD [ "node","app.js" ]