import * as OrbitDB from 'orbit-db';
import * as IPFS from 'ipfs';
import {DefaultIpfs} from '../ipfs';
let Key = require('interface-datastore').Key;
let Keystore = require('orbit-db-keystore');

class DataStore {
  constructor(public datastore:any){

  }

  async has(key:any) {
    return this.datastore.has(new Key(key));
  }

  async put(key:any, value:any){
    return this.datastore.put(new Key(key), value);
  }

    async get(key:any){
      return this.datastore.get(new Key(key));
    }
}

export class Account {
  orbitdb!: OrbitDB;
  DBdirectory: string;
  options: any;
  contacts: any[];
  contactsMap: Map<any,any>;
  posts: any[];
  db: any;
  ipfs: IPFS;
  _dataStore: DataStore;


  constructor(ipfs: IPFS, options?: any) {
      this.DBdirectory = options.directory || "./orbitdb";
      this.contacts = [];
      this.contactsMap = new Map();
      this.posts = [];
      this.ipfs = ipfs;
      this._dataStore = new DataStore(this.repo.datastore);
      this.orbitdb = new OrbitDB(ipfs, this.DBdirectory, options);
  }

  static async create(ipfs: IPFS, options?:any) {
      let repo = (ipfs as any)._repo;
      let datastore = repo.datastore;
      if (repo.closed) {
        await datastore.open()
      }
      if (await datastore.has('account')) {
         options = Object.assign(options, {peerId: await datastore.get('account')});
      }
      return new Account(ipfs, options);
  }

  get repo(): any {
    return (this.ipfs as any)._repo;
  }

  get storage(): any {
    if (this.repo.closed){
      this.repo.datastore.open();
    }
    return this._dataStore;
  }

  async loggedin() {
    return await this.storage.has('account');
  }

  async saveAccount(){
    await this.storage.put('account', this.orbitdb.id)
  }

  async fromStorage(){
    return this.storage.get('account')
  }

  async accountDB(){
    if (!this.db){
      this.db = this.orbitdb.keyvalue('OpenSourceDemocracy', {sync:true, write:["*"]});
      await this.db.load();
    }
    return this.db;
  }

  async login(email: string, password:string){
    let db = await this.accountDB();
    let encryptedKey = db.get(email);
    this.importAccount(encryptedKey, password);
    this.orbitdb = new OrbitDB(this.ipfs, this.DBdirectory, {peerId: encryptedKey.id, keystore: this.orbitdb.keystore});
    this.saveAccount();
  }
  //
  // async createAccountDB() {
  //   this.db = await this.orbitdb.open(this.accountDBName, { sync: true})
  //   this.db.events.on('load', (dbname: string) => console.log('loading '+ dbname))
  //   this.db.events.on('replicate.progress', (address: string, hash: string, entry: string, progress: string, have: string)=>{
  //       console.log(address +' "+hash+" "+entry+" "+progress+" '+ have)
  //   })
  //   await this.db.load()
  //   // this.worker = new Worker('js/actor.js')
  //   // this.worker.postMessage('In worker' + this.db.address.toString())
  //   console.log('accountDB loaded '+ this.db.address.toString())
  // }
  //
  //
  // async createAccount(email: string, password: string) {
  //
  // }

  get key() {
    return this.orbitdb.key
  }

  get keystore(){
    return this.orbitdb.keystore
  }

  get id() {
    return this.orbitdb.id
  }

  get publicKey() {
    return this.key.getPublic('hex')
  }

  async exportAccount(password: string){
    return this.keystore.exportKey(this.id, password);
  }

  async importAccount(exportedKey: any, password: string){
    this.keystore.importKey(exportedKey, password);
  }
  //
  // sign(data) {
  //   return this.keystore.sign(this.key, data)
  // }
  //
  // verify(signature, key, data){
  //   return this.keystore.verify(signature, key, data)
  // }
  // async encryptAccountOptions(password) {
  //   const toEncrypt = JSON.stringify({keystore:this.orbitdb.keystore._storage, peerId :this.orbitdb.id})
  //   console.log(toEncrypt);
  //   return encryptText(toEncrypt,password)
  // }
  // async decryptAccountOptions(cipherText, password) {
  //   return JSON.parse(await decryptText(cipherText.encBuffer, cipherText.iv,password))
  // }
  //
  // async login(email, password){
  //   if (this.loggedin){
  //     console.log('already logged in')
  //   }else{
  //     var oldId = this.orbitdb.id
  //     var options = await this.lookupAccount(email, password)
  //     if (!options){
  //       return
  //     }
  //     this.orbitdb.id = options['peerId']
  //     this.orbitdb.keystore._storage[this.orbitdb.id] = options['keystore'][this.orbitdb.id]
  //     this.orbitdb = new OrbitDB(this.orbitdb._ipfs,this.orbitdb.directory, {peerId: this.orbitdb.id, keystore:this.orbitdb.keystore})
  //     console.log('old id "+ oldId + " new id: ' + options.peerId)
  //     this.saveAccount()
  //     console.log(this.loggedin ? 'logged in!": "login Failed :-(')
  //   }
  //   await this.initFS()
  //
  // }
  //
  // async initFS(){
  //
  // }
  //
  // logout(){
  //   this.storage.removeItem('account')
  // }
  //
  // connectedPeers() {
  //   return this.ipfs.pubsub.peers(db.address.toString())
  // }

  // async newContactCard() {
  //   if (this.tempDB)
  //     return this.card
  //   this.tempDB = new EventLog(await this.orbitdb.eventlog(randomNonce(8)+'',
  //                             {create:true, overwrite:true, write:['*']}))
  //   var nonce = randomNonce(8)
  //   var card = {nonce:nonce,
  //               dbAddr: this.tempDB.address,
  //               publicKey:this.publicKey,//this.key.pub,
  //               peerID:this.id
  //   }
  //   self.card = card
  //   var db = this.tempDB
  //   await db.load()
  //   this.tempDB.events.on('replicate', ()=>
  //    {
  //     db.load().then(()=>{
  //       var message = db.peek()
  //       if (message.msg.nonce === nonce){
  //         this.addContact({peerID: message.peerID,
  //                     publicKey: message.publicKey,
  //                     channel: message.msg.channel})
  //         db.destroy()
  //         this.tempDB = null
  //         this.card = null
  //       }
  //       else{
  //         console.log('NONCE IS NOT CORRECT')
  //       }
  //     })
  //    // })
  //   })
  //
  //   return card
  // }
}

async function test(){
  let account = new Account(await DefaultIpfs.createTemp(),"./orbitdb");
  // await account.saveAccount();
  let exportedKey = await account.orbitdb.keystore.exportKey(account.id, "password");
  debugger;
  let keystore = Keystore.create("./.test_keystore");
  await keystore.importKey(exportedKey, 'password');
  console.log(keystore.getKey(account.id));
  console.log(account.orbitdb.keystore.getKey(account.id));
}
test();
