#!/bin/bash

BASE_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
DATA_PATH="$BASE_PATH/data"
OPT=$1
NO=${2:-1}

# couchdb
COUCHDB_IMG="apache/couchdb"
COUCHDB_TAG=latest
COUCHDB_NAME="couchdb-$NO"
COUCHDB_PATH="$DATA_PATH/couchdb-$NO"
COUCHDB_PORT=$((5983 + $NO))

# mysql
MYSQL_IMG="mysql"
MYSQL_TAG=latest
MYSQL_NAME="mysql-$NO"
MYSQL_PATH="$DATA_PATH/mysql-$NO"
MYSQL_PORT=$((13305 + $NO))

# geth
GETH_IMG="ethereum/client-go"
GETH_TAG=alltools-latest
GETH_NAME="geth-$NO"
GETH_PATH="$DATA_PATH/geth-$NO"
GETH_8545=$((15450 + $NO))
GETH_8546=$((15460 + $NO))
GETH_8547=$((15470 + $NO))
GETH_30303=$((30303 + $NO))
NETWORK_ID=288579
GENESIS_ACCOUNT=ed1a5a0400daf57cbba8f88c5ac21457c61af865
GENESIS_ACCOUNT_FILE=UTC--2021-11-10T07-45-22.283349697Z--${GENESIS_ACCOUNT}
datadir=/root/.ethereum
# https://geth.ethereum.org/docs/install-and-build/installing-geth
# 8545 TCP, used by the HTTP based JSON RPC API
# 8546 TCP, used by the WebSocket based JSON RPC API
# 8547 TCP, used by the GraphQL API
# 30303 TCP and UDP, used by the P2P protocol running the network

# ipfs
IPFS_IMG="ipfs/go-ipfs"
IPFS_TAG=latest
IPFS_NAME="ipfs-$NO"
IPFS_PATH="$DATA_PATH/ipfs-$NO"
IPFS_STAGING="$DATA_PATH/ipfs-staging-$NO"
IPFS_4001=$((14001 + $NO))
IPFS_8080=$((18080 + $NO))
IPFS_5001=$((15001 + $NO))
IPFS_SWARM_KEY="/key/swarm/psk/1.0.0/\n/base16/\n8d49258f1d5525e42c4f2c6300e2e6357f870fc7784e799b3744c66b52c8ea25"

# key server
KEY_SERVER_PATH="$DATA_PATH/key-server"
KEY_SERVER_PORT=8080

GETH_GENESIS=$(cat << EOF
{
  "config": {
    "chainId": $NETWORK_ID,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "clique": {
      "period": 5,
      "epoch": 30000
    }
  },
  "nonce": "0x0",
  "timestamp": "0x60fa2c48",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000${GENESIS_ACCOUNT}0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x47b760",
  "difficulty": "0x1",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": {
    "$GENESIS_ACCOUNT": {
      "balance": "0x100000000000000000000000000000000000000000000000000000000000000"
    }
  },
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "baseFeePerGas": null
}
EOF
)

# check and create dir
if [ -z "$BASE_PATH" ]; then
  echo "./docker.sh script dirname is empty."
  exit
fi

if [ ! -d "$DATA_PATH" ]; then
  mkdir -p $DATA_PATH
fi

if [ ! -d "$GETH_PATH" ]; then
  mkdir -p $GETH_PATH
fi

# geth
function gethAccount() {
  # account new
  if [ ! -d $GETH_PATH/keystore ]; then
    docker run --rm -it \
      -v $GETH_PATH:$datadir \
      $GETH_IMG:$GETH_TAG \
      geth --datadir $datadir account new
    echo '' > $GETH_PATH/password.txt
  fi
}

function gethAccountGenesis() {
  # account new
  if [ ! -d $GETH_PATH/keystore ]; then
    mkdir $GETH_PATH/keystore
    cp key.json $GETH_PATH/keystore/$GENESIS_ACCOUNT_FILE
    echo '' > $GETH_PATH/password.txt
  fi
}

function gethGenesis() {
  # generate genesis.json
  if [ ! -f $GETH_PATH/genesis.json ]; then
    echo $GETH_GENESIS > $GETH_PATH/genesis.json
  fi

  # init chaindata
  if [ ! -d $GETH_PATH/geth ]; then
    docker run --rm -it \
      -v $GETH_PATH:$datadir \
      $GETH_IMG:$GETH_TAG \
      geth --datadir $datadir init $datadir/genesis.json
  fi
}

function gethInit() {
  gethAccount
  gethGenesis
}

function gethInitGenesis() {
  gethAccountGenesis
  gethGenesis
}

# 8545 TCP, used by the HTTP based JSON RPC API
# 8546 TCP, used by the WebSocket based JSON RPC API
# 8547 TCP, used by the GraphQL API
# 30303 TCP and UDP, used by the P2P protocol running the network
function gethRun() {
  docker run -d \
    --name $GETH_NAME \
    -v $GETH_PATH:$datadir \
    -p $GETH_8545:8545 \
    -p $GETH_8546:8546 \
    -p $GETH_8547:8547 \
    -p $GETH_30303:30303 \
    $GETH_IMG:$GETH_TAG \
    geth \
    --nodiscover \
    --networkid $NETWORK_ID \
    --unlock 0 \
    --allow-insecure-unlock \
    --http \
    --http.addr 0.0.0.0 \
    --http.corsdomain "*" \
    --http.port 8545 \
    --http.api "admin,eth,debug,miner,net,shh,txpool,personal,web3,clique" \
    --password $datadir/password.txt \
    --miner.gasprice 1 \
    --mine
  docker logs -f $GETH_NAME
}

function gethEnode() {
  docker exec -it \
    $GETH_NAME \
    geth attach $datadir/geth.ipc --exec admin.nodeInfo.enode
}

function gethAddPeer() {
  enode = $3
  echo "add peer $enode"
  docker exec -it \
    $GETH_NAME \
    geth attach $datadir/geth.ipc --exec "admin.addPeer(\"$enode\")"
}

function gethAttach() {
  docker exec -it \
    $GETH_NAME \
    geth attach $datadir/geth.ipc
}

function gethRm() {
  docker rm -f $GETH_NAME
}

# ipfs
function ipfsRun() {
  docker run -d \
    --name $IPFS_NAME \
    -v $IPFS_STAGING:/export \
    -v $IPFS_PATH:/data/ipfs \
    -p $IPFS_4001:4001 \
    -p $IPFS_8080:8080 \
    -p $IPFS_5001:5001 \
    -e IPFS_SWARM_KEY=$IPFS_SWARM_KEY \
    $IPFS_IMG:$IPFS_TAG \
    daemon --migrate=true --enable-pubsub-experiment

  ipfsLogs
}

function ipfsRm() {
  docker rm -f $IPFS_NAME
}

function ipfsLogs() {
  docker logs -f $IPFS_NAME
}

# mongodb
function mongodbRun() {
  docker run -d \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -e MONGO_INITDB_DATABASE=ddd \
    -p 27017:27017 \
    mongo:latest
    # --replSet rs0 \
    # --enableMajorityReadConcern false
}

function couchdbRun() {
  echo "Running $COUCHDB_IMG:$COUCHDB_TAG..."
  docker run -d \
    --name $COUCHDB_NAME \
    -p $COUCHDB_PORT:5984 \
    -e COUCHDB_USER=admin \
    -e COUCHDB_PASSWORD=admin \
    -v $COUCHDB_PATH:/opt/couchdb/data \
    $COUCHDB_IMG:$COUCHDB_TAG
  echo "Running success http://localhost:${COUCHDB_PORT}/_utils/"
}

function mysqlRun() {
  echo "Running $MYSQL_IMG:$MYSQL_TAG..."
  docker run -d \
    --name $MYSQL_NAME \
    -p $MYSQL_PORT:3306 \
    -e MYSQL_ROOT_PASSWORD=root \
    -e MYSQL_DATABASE=ddd \
    -v $MYSQL_PATH:/var/lib/mysql \
    $MYSQL_IMG:$MYSQL_TAG \
    --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
  echo "Running mysql success"
}

# all
function allRun() {
  ipfsRun
  gethRun
}

function dockerBuild() {
  docker build -t sycue/mns .
}

function dockerRun() {
  docker run -p 3000:3000 sycue/mns
}

# opts
case $OPT in
  gethAccount)
    gethAccount
    ;;

  gethInitGenesis)
    gethInitGenesis
    ;;

  gethInit)
    gethInit
    ;;

  gethRun)
    gethRun
    ;;

  gethRm)
    gethRm
    ;;

  gethAttach)
    gethAttach
    ;;

  gethEnode)
    gethEnode
    ;;

  gethAddPeer)
    gethAddPeer
    ;;

  ipfsRun)
    ipfsRun
    ;;

  ipfsRm)
    ipfsRm
    ;;

  mongodbRun)
    mongodbRun
    ;;

  couchdbRun)
    couchdbRun
    ;;

  mysqlRun)
    mysqlRun
    ;;

  dockerBuild)
    dockerBuild
    ;;

  dockerRun)
    dockerRun
    ;;

  *)
    echo -n "docker.sh gethRun|ipfsRun"
    echo
    ;;
esac
