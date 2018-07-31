
# Depetition
This projects aims to create a decentralized petition application.  Currently most petition only require an email and a name, which allows petitions to be discredited.  Instead this app hopes to join an ecosystem of decentralized identity frameworks that aim to be self-sovereign identity (SSI), which allow people to own and control their digital identity and use it to cryptographically sign something.

## Awesome dependencies
At the core of this application is Interplanetary File System (IPFS) and Orbit-db.  IPFS is a distributed file system where the key to a file or directory is the hash of their contents also known as content based address.  This works really well for immutable content, however, any mutation changes the content's address.  Orbit-db helps to solve this problem by making a immutable "database" manifest, which contains the description of an append-only log.  Then using IPFS's pubsub feature users can synchronize on the log.

IPFS also has a mutable filesystem.  Any change to the filesystem changes the root address which is tracked by the mutable filesystem.  Taking this a step further we developed OrbitFS, which uses an Orbit-db log to publish the latest root address.

The Orbit-db javascript browser client generates a pair of public and private keys, which can be used a proxy for identity.  Each user's public key is the address to their orbit-db log.

The organization of the application then follows a directory structure, e.g. `/profile` which is a json document with data about the user.  By default it will show the user that is logged in.  Otherwise you can provide the public key of another user to see their profile, e.g. `/profile/:key`.

# Other Technical Notes

This project uses typescript because it provides good abstractions and static typing.  `Vue` provides a simple components framework, which makes the application more modular.  Furthermore, `Vuetify` is a style framework built on top of vue, which uses a set of pre-made components using material design.  Lastly, `Vuex` handles the state of the application.


## Installing

We recommend [nvm](https://github.com/creationix/nvm) to install `node`/`npm`.  Currently need to use the most stable version of node to install everything.

`nvm install --lts`

Then to set up the dependencies:

`npm install`

## Extra stuff

`alm` is an excellent text editor for typescript and is easy to install as:

`npm install -g alm`

Then to use open a new terminal and traverse to the project director:

`alm .`

However, one key drawback is that there is currently no support for `.vue` files.  `atom` has packages for it as does Visual Studio.

## Building the project

This project is actually two in one.  There is a browser app and a node app.

`npm run build.site`  -- builds the browser code and places it in the docs folder.  
