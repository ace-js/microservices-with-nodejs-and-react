# from a specific image
FROM node:alpine

# fix react-app running in container
ENV CI=true

# Create a work directory
WORKDIR /app

# copy package.json to the work directory
COPY package.json ./

# set registry
RUN npm config set registry http://registry.npmjs.org/ 

# install dependencies
RUN npm install

# copy everything from posts service to the work directory 
COPY ./ ./

# define commands
CMD ["npm", "start"]
