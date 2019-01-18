var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');
//
var fabric_client = new Fabric_Client();
// setup the fabric network
var channel = fabric_client.newChannel('mychannel');
var peer = fabric_client.newPeer('grpc://localhost:7051');
channel.addPeer(peer);
//
var member_user = null;
var store_path = path.join(__dirname, 'hfc-key-store');
console.log('Store path:' + store_path);
var tx_id = null;

let checkHFCuser =  (user) => {
	return new Promise((resolve, reject) => {
    Fabric_Client.newDefaultKeyValueStore({
      path: store_path
    }).then((state_store) => {
      // assign the store to the fabric client
      fabric_client.setStateStore(state_store);
      var crypto_suite = Fabric_Client.newCryptoSuite();
      // use the same location for the state store (where the users' certificate are kept)
      // and the crypto store (where the users' keys are kept)
      var crypto_store = Fabric_Client.newCryptoKeyStore({ path: store_path });
      crypto_suite.setCryptoKeyStore(crypto_store);
      fabric_client.setCryptoSuite(crypto_suite);
      return fabric_client.getUserContext(user, true);
    }).then((user_from_store) => {
      if (user_from_store && user_from_store.isEnrolled()) {
        console.log('Successfully loaded user1 from persistence');
        member_user = user_from_store;
        resolve();
      } else {
        throw new Error('Failed to get user1.... run registerUser.js');
      }
    });
  });
}

// Query Block by block Number
module.exports.getBlockWithNumber = (userName, blockNumber) => {
  return new Promise((resolve, reject) => {
    checkHFCuser(userName).then(() => {
      return channel.queryBlock(blockNumber);
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.getBlocksInfo = (userName) => {
  return new Promise((resolve, reject) => {
    checkHFCuser(userName).then(() => {
      return channel.queryInfo();
    }).then((info) => {
      resolve(info);
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.getPeersList = (userName) => {
  return new Promise((resolve, reject) => {
    checkHFCuser(userName).then(() => {
      return channel.getPeers();
    }).then((info) => {
      resolve(info);
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.getChaincodesList = (userName) => {
  return new Promise((resolve, reject) => {
    checkHFCuser(userName).then(() => {
      return channel.queryInstantiatedChaincodes();
    }).then((info) => {
      resolve(info);
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.getTransactionBlock = (userName, trnxnid) => {
  return new Promise((resolve, reject) => {
    checkHFCuser(userName).then(() => {
      return channel.queryBlockByTxID(trnxnid);
    }).then((info) => {
      resolve(info);
    }).catch((err) => {
      reject(err);
    });
  })
}
