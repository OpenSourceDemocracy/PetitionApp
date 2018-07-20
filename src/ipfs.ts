
import * as IPFS from 'ipfs';
let Repo = require('ipfs-repo');
let Memory = require('interface-datastore').MemoryDatastore;
let Lock = require('ipfs-repo/src/lock-memory');
let repo = {
  storageBackends: {
    root: Memory, // version and config data will be saved here
    blocks: Memory,
    keys: Memory,
    datastore: Memory
  },
  lock: Lock
}



class DefaultIpfs {
  static  config = {
    repo: './.ipfs',
    EXPERIMENTAL: {
      pubsub: true,
    },
    config: {
      Addresses: {
        Swarm: [
          '/dns4/spacestation.hopto.org/tcp/9090/wss/p2p-websocket-star',
          // '/dns4/spacestatic.hopto.org/tcp/9090/ws/p2p-websocket-star/'
        ],
      },
    },
  };

  public static async create(config = DefaultIpfs.config): Promise<any> {
    return new Promise((resolve, reject) => {
      let ipfs = new IPFS(config);
      ipfs.on('error', reject);
      ipfs.on('ready', () => resolve(ipfs));
    });
  }

  public static async createTemp(config = DefaultIpfs.config): Promise<any> {
    return new Promise((resolve, reject) => {
      let ipfs = new IPFS({ ...config, repo: new Repo(__dirname + "/.jsipfs", repo) });
      ipfs.on('error', reject);
      ipfs.on('ready', () => resolve(ipfs));
    });
  }
}



// const Ipfs = new ipfs(IPFS_CONFIG);

export {DefaultIpfs}
