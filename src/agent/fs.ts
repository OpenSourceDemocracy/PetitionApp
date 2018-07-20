let mfs = require('ipfs-mfs').core;
import { DefaultIpfs } from '../ipfs';
import * as Orbitdb from 'orbit-db';
import * as ipfs from 'ipfs';
let Key = require('interface-datastore').Key;
let bs58 = require('bs58');

type Path = string;

class OrbitFS {
  mfs: any;
  // orbitdb: Orbitdb;
  ipfs: ipfs;
  RootKey = new Key('/local/filesroot');
  repo: any;
  datastore: any;
  bs58 = bs58;

  constructor(ipfs: ipfs, directory = './.orbit_fs', options?: any) {
    this.mfs = mfs(ipfs, options)
    this.ipfs = ipfs;
    this.repo = (ipfs as any)._repo;
    this.datastore = this.repo && this.repo.datastore;
    // this.orbitdb = new Orbitdb(ipfs, directory, options);
  }

  get Root(): string {
    return bs58.encode(this.datastore.db.get(this.RootKey));
  }


  async updateRoot(buffer: string) {
    buffer = bs58.decode(buffer)
    if (this.repo.closed) {
      await this.datastore.open()
    }
    await this.datastore.put(this.RootKey, buffer)
  }

  async cp(from: Path[], to: Path, options?: any) {
    return this.mfs.cp(from, to, options);
  }

  async mkdir(path: Path, options?: any) {
    return this.mfs.mkdir(path, options);
  }

  async stat(path: Path, options?: any){
    return this.mfs.stat(path, options);
  }

  async rm(paths: Path[], options?: any) {
    return this.mfs.rm(paths, options);
  }

  async read(path: Path, options?: any) {
    return this.mfs.read(path, options);
  }

  async readReadableStream(path: Path, options?: any) {
    return this.mfs.ReadReadableStream(path, options);
  }

  async readPullStream(path: Path, options?: any) {
    return this.mfs.readPullstream(path, options);
  }

  async write(path: Path,
              content: Buffer | ReadableStream | Blob | Path | ArrayBuffer,
              options?: any) {
    if (content  instanceof ArrayBuffer){
      content = Buffer.from(content);
    }
    return this.mfs.write(path, content, {...options, cidVersion: 0});
  }

  async mv(from: Path[], to: Path, options?: any) {
    return this.mfs.mv(from, to, options);
  }

  async flush(paths: Path[]) {
    return this.mfs.flush(paths);
  }

  async ls(path: Path) {
    return this.mfs.ls(path);
  }

  static async create(path='./orbit_db', options?: any){
    let Ipfs = await DefaultIpfs.create();
    return new OrbitFS(Ipfs, path, options);
    // console.log(await orbitfs.mfs.stat('/'));
    // try {
    //   await orbitfs.mfs.stat('/test');
    //   await orbitfs.mfs.rm('/test', { recursive: true });
    // } catch (err) {
    // }
    // await orbitfs.mfs.mkdir('/test');
    // console.log(await orbitfs.mfs.stat('/'));
    // let orbitfs2 = new OrbitFS(Ipfs, './orbit', { root: 'Qmf8aX5W6wboWckFvkuxXVhDSzqxSgnjGuNPfbiELCeDFF' });
    // console.log(await orbitfs2.mfs.stat('/'));

  }
}

export {OrbitFS}



// const writeOperations = {
//   cp: require('./cp'),
//   flush: require('./flush'),
//   mkdir: require('./mkdir'),
//   mv: require('./mv'),
//   rm: require('./rm'),
//   write: require('./write')
// }

function test() {
  DefaultIpfs.create().then(async (ipfs) => {
    let orbitfs = new OrbitFS(ipfs, './orbit')
    console.log(await orbitfs.mfs.stat('/'))
    try {
      await orbitfs.mfs.stat('/test')
      await orbitfs.mfs.rm('/test', { recursive: true });
    } catch (err) {
    }
    await orbitfs.mfs.mkdir('/test');
    console.log(await orbitfs.mfs.stat('/'))
    let orbitfs2 = new OrbitFS(ipfs, './orbit', { root: 'Qmf8aX5W6wboWckFvkuxXVhDSzqxSgnjGuNPfbiELCeDFF' });
    console.log(await orbitfs2.mfs.stat('/'))
  })
}

// import * as BrowserFS from 'browserfs';
// let git = require('isomorphic-git');

// async function run() {
//   BrowserFS.configure({ fs: 'InMemory', options?: {} }, async function(err) {
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
