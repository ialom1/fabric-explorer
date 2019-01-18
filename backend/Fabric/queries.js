let hashCalculator = require("./hash-calculator.js");
let fabricNetwork = require("./FabricNetwork.js");
let user_name = 'user1';

module.exports.get_block = (num) => {
  return new Promise((resolve, reject) => {
    fabricNetwork.getBlockWithNumber(user_name, num).then((res) => {
      resolve({
        blockNumber: res.header.number,
        blockHash: hashCalculator.calculateBlockHash(res.header),
        previousHash: res.header.previous_hash,
        dataHash: res.header.data_hash,
        trnxnCount: (res.data.data).length,
        trnxns: res.data.data
      });
    }).catch((err) => {
      reject(err);
    });
  })
}

module.exports.get_blocks_height = () => {
  return new Promise((resolve, reject) => {
    fabricNetwork.getBlocksInfo(user_name).then((info) => {
      resolve({
        blocks: parseInt(info.height),
        height: parseInt(info.height)
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.get_peers_list = () => {
  return new Promise((resolve, reject) => {
    fabricNetwork.getPeersList(user_name).then((list) => {
      resolve({
        peers: (list).length,
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.get_chaincodes_list = () => {
  return new Promise((resolve, reject) => {
    fabricNetwork.getChaincodesList(user_name).then((list) => {
      resolve({
        chaincodes: (list.chaincodes).length
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports.get_trnxn_block = (trnxnid) => {
  return new Promise((resolve, reject) => {
    fabricNetwork.getTransactionBlock(user_name, trnxnid).then((res) => {
      resolve({
        blockNumber: res.header.number,
        blockHash: hashCalculator.calculateBlockHash(res.header),
        previousHash: res.header.previous_hash,
        dataHash: res.header.data_hash,
        trnxnCount: (res.data.data).length,
        trnxns: res.data.data
      });
    }).catch((err) => {
      reject(err);
    });
  })
}
