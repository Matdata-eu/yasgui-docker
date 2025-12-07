# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install git+https://github.com/Thib-G/yasgui-geo-tg.git

# Copy the rest of the application code
COPY . .

# Download Yasgui files from npm package to public folder
RUN mkdir -p public/yasgui && \
    cp node_modules/@matdata/yasgui/build/yasgui.min.css public/yasgui/ && \
    cp node_modules/@matdata/yasgui/build/yasgui.min.css.map public/yasgui/ && \
    cp node_modules/@matdata/yasgui/build/yasgui.min.js public/yasgui/ && \
    cp node_modules/@matdata/yasgui/build/yasgui.min.js.map public/yasgui/

# Build the React app
RUN npm run build

# Use the official Nginx image to serve the React app
FROM nginxinc/nginx-unprivileged:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=0 /app/build /usr/share/nginx/html/

USER root
COPY change-default-endpoint.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/change-default-endpoint.sh
RUN chown 1001:0 -R /usr/share/nginx/html/

USER 1001