# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16-alpine as build-stage

WORKDIR /app
COPY package*.json /app/
RUN npm install --legacy-peer-deps
COPY ./ /app/

# Set the REACT_APP_PRODUCTION_URL environment variable
#ARG REACT_APP_PRODUCTION_URL
#ENV REACT_APP_PRODUCTION_URL=$REACT_APP_PRODUCTION_URL

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by node
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80