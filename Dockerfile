# base image
FROM node:12.2.0-alpine


# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependenciess
COPY package.json /app/package.json
COPY vue.config.js /app/vue.config.js
RUN npm install
RUN npm install @vue/cli -g

EXPOSE 8080

# start app
COPY . /app
CMD ["npm", "run", "serve"]