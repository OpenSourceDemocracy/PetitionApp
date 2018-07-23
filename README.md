## Installing

I recommend [nvm](https://github.com/creationix/nvm) to install `node`/`npm`.  Currently need to use the most stable version of node to install everything.

`nvm install --lts`

Then to set up the dependencies:

`npm install`

## Extra stuff

`alm` is an excellent text editor for typescript and is easy to install as:

`npm install -g alm`

Then to use open a new terminal and traverse to the project director:

`alm .`

## Building the project

This project is actually two in one.  There is a browser app and a node app.

`npm run build.site`  -- builds the browser code.  
