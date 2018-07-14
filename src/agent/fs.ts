let mfs = require('ipfs-mfs').core;
import { Ipfs } from '../ipfs';
import * as Orbitdb from 'orbit-db';
import * as ipfs from 'ipfs';
let Key = require('interface-datastore').Key;
let bs58 = require('bs58');

class OrbitFS {
  mfs: any;
  orbitdb: Orbitdb;
  ipfs: ipfs;
  static Root = new Key('/local/filesroot');
  repo: any;
  datastore: any;

  constructor(ipfs: ipfs, directory: string, options?: any) {
    this.mfs = mfs(ipfs)
    this.ipfs = ipfs;
    this.repo = (ipfs as any)._repo;
    this.datastore = this.repo && this.repo.datastore;
    this.orbitdb = new Orbitdb(ipfs, directory, options);
  }

  async updateRoot(buffer: string) {
    buffer = bs58.decode(buffer)
    if (this.repo.closed) {
      await this.datastore.open()
    }
    debugger;
    await this.datastore.put(OrbitFS.Root, buffer)
  }
}

// const writeOperations = {
//   cp: require('./cp'),
//   flush: require('./flush'),
//   mkdir: require('./mkdir'),
//   mv: require('./mv'),
//   rm: require('./rm'),
//   write: require('./write')
// }

debugger;
Ipfs.on('ready', async () => {
  let orbitfs = new OrbitFS(Ipfs, './orbit')
  await orbitfs.mfs.rm('/test', { recursive: true });
  await orbitfs.mfs.flush();
  console.log( await orbitfs.mfs.stat('/'))
  // await orbitfs.mfs.mkdir('/test');
  await orbitfs.updateRoot('Qmf8aX5W6wboWckFvkuxXVhDSzqxSgnjGuNPfbiELCeDFF');
  console.log(await orbitfs.mfs.ls('/'))
  console.log(await orbitfs.mfs.stat('/')) 
})

// import * as BrowserFS from 'browserfs';
// let git = require('isomorphic-git');

// async function run() {
//   BrowserFS.configure({ fs: 'InMemory', options: {} }, async function(err) {
//     if (err) return console.log(err);
//     let fs = BrowserFS.BFSRequire('fs');
//     fs.mkdir('/test');
//     fs.writeFile('/test/o', 'line', async () => {
//       debugger;
//       const files = await git.listFiles({ fs, dir: '/test' });
//       console.log(files);
//       fs.readFile('/test/o', (res) => console.log(res));
//     }
//     );
//   });
// }
// run();
