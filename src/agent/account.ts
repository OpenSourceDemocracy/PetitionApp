import * as orbit_db from 'orbit-db';


class Store {
  _db: orbit_db.Store;
    constructor(orbitdb_instance: orbit_db.Store){
      this._db = orbitdb_instance
    }
  get db(): orbit_db.Store {
    return this._db;
    }

    get address(){
      return this.db.address.toString()
    }

    async load(){
      await this.db.load()
    }

    get events(){
      return this.db.events
    }
}

class Eventstore<T> extends Store{

  get db(): orbit_db.Eventstore {
    return this.db;
  }


  add(item: T): void {
    this.db.add(item)
  }

  get(item: T): T{
    return this.db.get(item).payload.value
  }

  last(n: number): Array<T> {
    return this.db.iterator({ limit: n }).collect()
      .map((e) => e.payload.value);
  }

  peek(){
    return this.last(1)[0];
  }

  get all() {
    return this.last(-1);
  }


  destroy(){
    this.db.drop();
  }

}




import { Ipfs } from '../ipfs';
async function ready() {
  let orbitdb = new orbit_db(Ipfs);
  debugger;
  let room = await orbitdb.eventlog('testlog',{sync:true,write: ['*']})
  let id = (Ipfs as any)._peerInfo.id._idB58String
  await room.load();
  console.log(`loaded ${room.address.toString()}`); 
  room.events.on('replicate', (message: any) =>
    console.log(message));
}
Ipfs.once('ready', async () => await ready());


// class Path {
//   static split(path){
//     return path.split('/')
//   }

//   static basename(path){
//     var folders = Path.split(path)
//     return folders[folders.length - 1]
//   }

//   static dirname(path){
//     var folders = Path.split(path)
//     var dir = folders.slice(0,folders.length - 1).join('/')
//     if (dir === ''){
//       dir = '/'
//     }
//     return dir
//   }
// }

// class FileSystem {
//     constructor(orbitdb){
//        this.orbitdb = orbitdb
//        this.pwd = '/'
//     }

//     async init() {
//       this.root = await this.orbitdb.keyvalue('fs', {sync: true, write:[]})
//       this.root.events.on('replicate', function(){
//            var lastAdded = this.root.all[this.root.all.length -1]
//            console.log('New item added to the directory '+
//                        lastAdded[parent] +'/'+lastAdded[name])
//          })
//       await this.root.load()
//       var root = await this.getDirDoc('/')
//       if (!root){
//         var newDirDB = await this.orbitdb.keyvalue('root",{"write':[]})
//         await this.root.put('/',
//                       {name:'/',
//                       parent:null,
//                       directory:true,
//                       database: newDirDB.address.toString()}
//                     )
//       }
//       await this.mkdir('/profile',{printWarning:false})
//       await this.mkdir('/contacts', {printWarning:false})
//       await this.mkdir('/posts', {printWarning:false})
//     }

//     async mkdir(path, writers = [], printWarning=true){
//       var parent = Path.dirname(path)
//       var basename = Path.basename(path)
//       var parentDoc = await this.root.get(parent)
//       if (!parentDoc && printWarning){
//         console.log('Parent directory does not exist')
//         return null
//       }
//       var pathDoc = await this.root.get(path)
//       if (pathDoc && printWarning){
//         console.log('Directory already exists')
//         return null
//       }
//       var newDirectoryDB = await this.orbitdb.keyvalue(path, {write:writers})
//       var newAddress = newDirectoryDB.address.toString()
//       this.root.put(path,
//                     {name:basename,
//                     parent:parent,
//                     directory:true,
//                     database: newAddress}
//                   )
//       var parentDoc = await this.getDirDoc(parent)
//       var parentDB = await this.orbitdb.keyvalue(parentDoc.database,{sync:true})
//       parentDB.events.on('ready', function() {
//         parentDB.put(basename, {name: basename,
//                                   directory:true,
//                                   database: newAddress})
//       })
//       await parentDB.load()
//     }

//     async getDirDoc(path){
//       return this.root.get(path)
//     }

//     async openDir(address){
//       var db = await this.orbitdb.keyvalue(address,{sync:true})
//       await db.load()
//       return db
//     }

//     async ls(path){
//       var pathDoc = await this.getDirDoc(path)
//       if (!pathDoc){
//         log.console('Path Does not exist')
//         return null
//       }
//       var pathDB = await this.openDir(pathDoc.database)
//       return pathDB.all
//     }

//     async getDir(path){
//       var dirDoc = await this.getDirDoc(path)
//       var address = dirDoc.database
//       return this.openDir(address)
//     }

//     async touch(path){
//       var basename = Path.basename(path)
//       var dirDB =  await this.getDir(Path.dirname(path))
//       await dirDB.load()
//       var file = await dirDB.get(basename)
//       if (file){
//         return
//       }
//       dirDB.put(basename,{name:basename,directory:false,content:null})
//     }

//     async getParentDir(path){
//       return this.getDir(Path.dirname(path))
//     }

//     async writeFile(path, data){
//       await this.touch(path)
//       var basename = Path.basename(path)
//       var parentDir = await this.getParentDir(path)
//       await parentDir.load()
//       parentDir.put(basename,{name:basename,directory:false, content:data})

//     }

// }

// class Key {
//   constructor(name){
//       this.options = {curve: 'ed25519',
//                     userIds:[{name:name}],
//                     passphrase:''}
//   }
//   async init() {
//     var key = await openpgp.generateKey(this.options)
//     this.key = key
//   }
//   get pubArmored(){
//     return this.key.publicKeyArmored
//   }

//   get privArmored(){
//     return this.key.privateKeyArmored
//   }

//   get pub(){
//     return openpgp.key.readArmored(this.pubArmored).keys
//   }

//   get priv(){
//     return openpgp.key.readArmored(this.privArmored).keys[0]
//   }

//   async sign(data,privateKey=this.priv){
//     return openpgp.sign({data:data, privateKeys:privateKey})
//   }

//   async verify(data, publicKey){
//     return openpgp.verify({message:openpgp.cleartext.readArmored(data.data), publicKeys:publicKey})

//   }
// }
// class Message {

// }

// class Channel {
//   constructor(database){
//     this.database = database
//     this.database.events.on('replicate',this.read)
//   }

//   read(res){
//     if (res){
//       console.log(res)
//     }
//     this.messages = database.iterator({limit:this.limit}).collect()
//   }

//   write(message){
//     this.database.add(message)
//   }

//   set limit(x){
//     this.limit = x
//   }

//   update(){
//     read('updating')
//   }

//   get address(){
//     return this.database.address.toString()
//   }

// }

// class EncryptedChannel extends Channel{
//   //TODO: add encryption ;-)
//   constructor(database,myKeys,theirKey){
//     super(database)
//     this.myKeys = myKeys
//     this.theirKeys = theirKey

//   }
//   read(res){
//     this.messages = super.read(res)
//   }

//   async write(message){
//     var hash = super.write(message)
//   }

// }

// class Contact {
//   //Here we just scanned the QRCode and learned
//   //publicKey, peerID, database Address, Nonce
//   //and what nonce to include to prove it was us.
//   constructor(account, info){
//     this.publicKey = info.publicKey
//     this.peerID = info.peerID
//     this.petitions  = []
//     if (info.nonce){
//           this.nonce = info.nonce
//           this.sendFirstMessage(account,info.dbAddr)
//     }
//     if (info.channel){
//       this.channelAddr = info.channel;
//       (async () => {
//       var privDatabase = await account.orbitdb.feed(info.channel, {create:true, write:[this.publicKey,account.publicKey]})
//       await privDatabase.load()
//       this.channel = new EncryptedChannel(privDatabase,
//                                           account.keys,
//                                           this.publicKey)
//       })()
//     }
//     this.createPostsDatabase(account)
//   }

//   async createPostsDatabase(account){
//     this.postsDB = await account.orbitdb.keyvalue('/posts',{write:[this.publicKey],sync:true})
//     this.postsDB.events.on('replicated',()=>
//       this.updatePetitions(account)
//     )
//     await this.postsDB.load()

//   }

//   async updatePetitions(account){
//     var newPetitions = []
//     for (var i in this.postsDB.all){
//       var petition = Object.assign({}, this.postsDB.all[i])
//       petition.address = await hash(this.postsDB.address.toString() + this.postsDB.all[i].title)
//       newPetitions[i] = await Petition.create(account, petition)
//     }
//     this.petitions.push(...newPetitions)
//   }

//   async sendFirstMessage(account,dbAddr){
//     this.tempDB =  await account.orbitdb.log(dbAddr,{sync:true,create:true})
//     await this.tempDB.load()
//     this.channelAddr = Contact.getChannelAddress(account.id,this.peerID)
//     var privDatabase = await account.orbitdb.feed(this.channelAddr, {create:true, write:[this.publicKey,account.publicKey]})
//     this.channel = new EncryptedChannel(privDatabase,account.keys,this.publicKey)
//     var message = {peerID:account.id,
//                         publicKey:account.publicKey,
//                         msg:
//                         {channel: privDatabase.address.toString(),
//                         nonce:this.nonce}}
//     this.tempDB.add(message)
//   }

//   static getChannelAddress(myID, otherID){
//     if (myID>otherID){
//       return myID +'X'+otherID
//     }
//     return otherID +'X'+myID
//   }
//   static async fromInfo(account, info){
//     info.channel = Contact.getChannelAddress(account.id, info.peerID)
//     return new Contact(account,info)
//   }

// }

// class Petition {
//    constructor(account, petition){
//       this.petition = petition
//       this.account = account
//       this.signatures = [0]
//    }

//    async init(){
//      this.database = await this.account.orbitdb.keyvalue(this.petition.address, {sync:true, write:['*']})
//      this.database.events.on('replicated', () => this.updateCounts())
//      this.database.events.on('replicate', () => this.updateCounts())
//      this.database.events.on('loaded', () => this.updateCounts())
//      this.database.load()
//    }

//    get title(){
//      return this.petition.title
//    }

//    get content(){
//      return this.petition.content
//    }

//    get addresss (){
//      return this.petition.address
//    }

//    async updateCounts(){
//      var signatures = this.database._index._index
//      var count = 0;
//      var publicKeys = Object.keys(signatures)
//      // for (var key in publicKeys){
//      //   var publicKey = publicKeys[key]
//      //   //if (this.account.verify(signatures[publicKey], this.account.publicKey, await hash(this.title + this.content))) {
//      //     count++;
//      //   }
//      // }
//      this.signatures.pop()
//      this.signatures.push(publicKeys.length)
//    }

//    async signPetition(){
//      var signature = this.database.get(this.account.publicKey)
//      if (!signature) {
//        var data = await this.account.sign(this.title + this.content)
//        await this.database.put(this.account.publicKey, data)
//      }
//      this.updateCounts()
//    }


//    static async create(account,petition){
//      var newPetition = new Petition(account, petition)
//      await newPetition.init()
//      return newPetition
//    }


// }


// class Account {
//     constructor(OrbitDB){
//         this.storage = window.localStorage
//         this.OrbitDB = OrbitDB // constructor
//         this.accountDBName = '/orbitdb/QmWfN1JwLknbVfCZ3tZ6aZC9PHbbK2cX7RtZnzukKgUfMX/Accounts!'
//         this.DBdirectory = './orbitdb'
//         this.options = {}
//         this.contacts = []
//         this.contactsMap = new Map()
//         this.posts = []
//     }

//     async init(ipfs){
//         if (this.fromStorage()){
//            this.options = {peerId:this.fromStorage()}
//         }
//         this.orbitdb = new OrbitDB(ipfs, this.DBdirectory, this.options)
//         if (this.loggedin){
//           this.login('","')
//         }
//         await this.createAccountDB()

//     }

//     get loggedin() {
//       return !(null === this.storage.getItem('account')) &&
//              this.orbitdb &&
//              this.orbitdb.id === this.storage.getItem('account')
//     }

//     saveAccount(){
//       this.storage.setItem('account', this.orbitdb.id)
//     }

//     fromStorage(){
//       return this.storage.getItem('account')
//     }

//     async createAccountDB() {
//       this.db = await this.orbitdb.open(this.accountDBName, { sync: true})
//       this.db.events.on('load', (dbname) => console.log('loading '+dbname))
//       this.db.events.on('replicate.progress', (address, hash, entry, progress, have)=>
//       {
//         console.log(address +' "+hash+" "+entry+" "+progress+" '+ have)
//       })
//       await this.db.load()
//       // this.worker = new Worker('js/actor.js')
//       // this.worker.postMessage('In worker' + this.db.address.toString())
//       console.log('accountDB loaded '+ this.db.address.toString())
//     }


//     async createAccount(email, password) {
//       if (this.loggedin){
//         console.log('already signed in')
//         return
//       }
//       var emailText = email
//       var hashText = await hash(emailText)
//       console.log('creating account for ' + emailText)
//       var AccountOptions
//       var lookup = await this.db.get(hashText)
//       if (!lookup){
//          AccountOptions = await this.encryptAccountOptions(password)
//          AccountOptions.encBuffer = arrayBuf2UintArray(AccountOptions.encBuffer)
//          await this.db.put(hashText, JSON.stringify(AccountOptions))
//       }
//       var res = await this.db.get(hashText)
//       console.log(res)
//     }

//     lookupAccount(email,password) {
//       return (async () => {
//          var emailText = email
//          console.log('looking up Account with email '+ emailText)

//           var found = await this.db.get(await hash(emailText))
//           if (!found){
//             console.log('account doesn't exist')
//             return false
//           }
//           const docs = JSON.parse(found)

//           var ivArray = []
//           var key
//           for (key in docs.iv){
//             ivArray[key] = docs.iv[key]
//           }
//           var encBuf = []
//           for (key in docs.encBuffer){
//             encBuf[key] = docs.encBuffer[key]
//           }
//           docs.iv = new Uint8Array(ivArray)
//           docs.encBuffer = (new Uint8Array(encBuf)).buffer

//           var AccountOptions = await this.decryptAccountOptions(docs, password)

//           console.log(JSON.stringify(AccountOptions))
//           // AccountOptions.keystore.getKey = function (id){
//           //   return JSON.parse(AccountOptions.keystore._storage[id])}
//           return AccountOptions
//       })()

//     }

//     get ipfs(){
//       return this.orbitdb._ipfs
//     }

//     get key() {
//       return this.orbitdb.key
//     }

//     get keystore(){
//       return this.orbitdb.keystore
//     }

//     get id() {
//       return this.orbitdb.id
//     }

//     get publicKey() {
//       return this.key.getPublic('hex')
//     }

//     sign(data) {
//       return this.keystore.sign(this.key, data)
//     }

//     verify(signature, key, data){
//       return this.keystore.verify(signature, key, data)
//     }
//     async encryptAccountOptions(password) {
//       const toEncrypt = JSON.stringify({keystore:this.orbitdb.keystore._storage, peerId :this.orbitdb.id})
//       console.log(toEncrypt);
//       return encryptText(toEncrypt,password)
//     }
//     async decryptAccountOptions(cipherText, password) {
//       return JSON.parse(await decryptText(cipherText.encBuffer, cipherText.iv,password))
//     }

//     async login(email, password){
//       if (this.loggedin){
//         console.log('already logged in')
//       }else{
//         var oldId = this.orbitdb.id
//         var options = await this.lookupAccount(email, password)
//         if (!options){
//           return
//         }
//         this.orbitdb.id = options['peerId']
//         this.orbitdb.keystore._storage[this.orbitdb.id] = options['keystore'][this.orbitdb.id]
//         this.orbitdb = new OrbitDB(this.orbitdb._ipfs,this.orbitdb.directory, {peerId: this.orbitdb.id, keystore:this.orbitdb.keystore})
//         console.log('old id "+ oldId + " new id: ' + options.peerId)
//         this.saveAccount()
//         console.log(this.loggedin ? 'logged in!": "login Failed :-(')
//       }
//       await this.initFS()

//     }

//     async initFS(){
//       this.fs = new FileSystem(this.orbitdb)
//       await this.fs.init()
//       var contactsDB = await this.fs.getDir('/contacts')
//       for (var contact in contactsDB.all){
//         var newContact = await Contact.fromInfo(this, contactsDB.all[contact].content)
//         this.contacts.push(newContact)
//         this.contactsMap.set(contact.peerID, newContact)
//       }
//       this.postsDB = await this.fs.getDir('/posts')
//       await this.postsDB.load()
//       this.updatePosts()
//       this.addContactFromURL()
//     }

//     logout(){
//       this.storage.removeItem('account')
//     }

//     connectedPeers() {
//       return this.ipfs.pubsub.peers(db.address.toString())
//     }

//     async newContactCard() {
//       if (this.tempDB)
//         return this.card
//       this.tempDB = new EventLog(await this.orbitdb.eventlog(randomNonce(8)+'',
//                                 {create:true, overwrite:true, write:['*']}))
//       var nonce = randomNonce(8)
//       var card = {nonce:nonce,
//                   dbAddr: this.tempDB.address,
//                   publicKey:this.publicKey,//this.key.pub,
//                   peerID:this.id
//       }
//       self.card = card
//       var db = this.tempDB
//       await db.load()
//       this.tempDB.events.on('replicate', ()=>
//        {
//         db.load().then(()=>{
//           var message = db.peek()
//           if (message.msg.nonce === nonce){
//             this.addContact({peerID: message.peerID,
//                         publicKey: message.publicKey,
//                         channel: message.msg.channel})
//             db.destroy()
//             this.tempDB = null
//             this.card = null
//           }
//           else{
//             console.log('NONCE IS NOT CORRECT')
//           }
//         })
//        // })
//       })

//       return card
//     }

//     receiveFirstMessage(){

//     }//TODO Move callback here

//     async addContact(info){
//       if (this.contactsMap.has(info.peerID)){
//         console.log('Already contact')
//       }
//       var newContact = new Contact(this, info)
//       this.contacts.push(newContact)
//       this.contactsMap.set(info.peerID, newContact)
//       this.addToContactsDB(info)
//       console.log('new contact')
//       console.log(newContact)
//     }
//     async addToContactsDB(info){
//       return this.fs.writeFile('/contacts/'+info.peerID, info)
//     }


//     static async create(OrbitDB, ipfs){
//       var account = new Account(OrbitDB)
//       account.init(ipfs)
//       return account
//     }

//     addContactFromURL(){
//       if (window.location.search.length > 0){
//       var card=null
//       try {
//         card = {
//           nonce:parseInt(getParameterByName('nonce')),
//           dbAddr:getParameterByName('dbAddr'),
//           publicKey:getParameterByName('publicKey'),
//           peerID:getParameterByName('peerID'),
//           channel:Contact.getChannelAddress(getParameterByName('peerID'),this.id)
//         }
//       }catch(e){
//         return
//       }
//       if (card === null){
//         return
//       }
//       Object.keys(card).forEach(function(key,index) {
//         if (card[key]===null){
//           return
//         }
//         // key: the name of the object key
//         // index: the ordinal position of the key within the object

//         });

//         this.addContact(card)
//       }
//     }

//     async makePost(title, post){
//       this.postsDB.put(title, post)
//       this.updatePosts()
//     }

//     async updatePosts(){
//       // var parentDB = await this.orbitdb.keyvalue('/posts',{writers:[peerID],sync:true})
//       // await parentDB.load()
//       var newPetitions = []
//       for (var i in this.postsDB.all){
//         var petition = Object.assign({}, this.postsDB.all[i])
//         petition.address = await hash(this.postsDB.address.toString() + this.postsDB.all[i].title)
//         newPetitions[i] = await Petition.create(this, petition)
//       }
//       this.posts.splice(0,this.posts.length)
//       this.posts.push(...newPetitions)
//     }

//     async signPetition(petition){
//       petition.signPetition()
//     }



// }
