# Fabric-Explorer
Fabric Explorer is a web-based block-explorer application for Hyperledger Fabric blockchains.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4 and NodeJs version 8.9.4.

## Prerequisites
1. Set up your Hyperledger Fabric Blockchain (You may use the sample from the official repository `https://hyperledger-fabric.readthedocs.io/en/release-1.3/install.html` for testing purposes).
2. Create a user in your Hyperledger Fabric network.
3. Navigate to backend/Fabric/FabricNetwork.js and update the path to HFC keys and Channel Name.
4. Navigate to backend/Fabric/queries.js and update the `user_name` variable.

## Development server
### Run the Node REST server
In the root project directory run `node server.js`. The server is started at `http://localhost:3000/`. Three api are opened as follows:
1. `http://localhost:3000/api/blocks`: Fetches three recent blocks.
2. `http://localhost:3000/api/headline`: Fetches a summary of the current state of the blockchain.
3. `http://localhost:3000/api/trnxn/:trnxnid`: Fetches the block that contains a particular transaction which is identified the transaction-id(`trnxnid`).


### Run Fabric-Explorer
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
