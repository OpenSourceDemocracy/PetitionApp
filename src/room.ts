import * as orbitdb from 'orbit-db';
import * as ipfs from 'ipfs';

class Message {
  constructor(public data: Uint8Array,
              public from: ipfs.PeerId,
              public seqno:Uint8Array,
              public topicIDs: Array<string>){}
}

interface Room {
  // ready(): void;
  onMessage(message: Message): void;
  broadcast(message: Message): void;
  sendTo(peer: ipfs.PeerId, message: Message): void;
  peerJoined(peer: ipfs.PeerId): void;
  peerLeft(peer: ipfs.PeerId): void;
  hasPeer(peer: ipfs.PeerId): boolean;
  getPeers(): ipfs.PeerId[];
  leave(): void;
  onLeave(): void;
}


class BaseRoom {
  ipfs: ipfs;
  room: any;
  roomName:string;
  id: string = '';
  orbitdb: any;
  constructor(roomName: string, ipfs: ipfs){
    this.roomName = roomName
    this.ipfs = ipfs
    this.ipfs.once('ready', async()=> await this.ready())
    // this.room.on('peer joined', (peer: ipfs.PeerId) => this.peerJoined(peer))
    // this.room.on('peer left', (peer: ipfs.PeerId) => this.peerLeft(peer))

  }

  peerJoined(peer: ipfs.PeerId): void{
      console.log('Peer joined the room', peer)
  }

  peerLeft(peer:ipfs.PeerId):void {
        console.log('Peer left...', peer)
  }



  async ready() {
    console.log('we\'re ready in room '+ this.roomName)
    this.orbitdb = new orbitdb(this.ipfs)
    this.room = await this.orbitdb.eventlog(this.roomName, {sync:true,write:['*']});
    this.id = (this.ipfs as any)._peerInfo.id._idB58String
    await this.room.load()
    this.room.events.on('replicate', (message: any) =>
          this.onMessage(new Message(message.data,
            message.from,
            message.seqno,
            message.topicIDs)))
  }

  onMessage(message:any):void {
    console.log(message)
  }

  broadcast(message: any):void{
    this.room.add(JSON.stringify(message))
  }
  sendTo(peer: ipfs.PeerId, message: Message):void {
    this.room.sendTo(peer, message)
  }
  hasPeer(peer: ipfs.PeerId): boolean{
    return false;//this.room.hasPeer(peer)
  }
  getPeers(): Array<ipfs.PeerId> {
    return [];//this.room.ipfs()
  }
  leave(): void{
    this.room.leave()
  }
  onLeave(): void{
    console.log('Left room '+this.roomName)
  }
}

class TestMessage extends Message{
  getPayloadSize(): number {
    return this.data.length
  }

}


class TestRoom extends BaseRoom{
  startTime: number = 0;
  peers: Array<ipfs.PeerId>= [];
  responses = 0;
  payloadSize = 0;

  constructor(roomName:string, ipfs:ipfs, master:boolean=false){
    super(roomName, ipfs)
    if(master){
      this.startTest()
    }
  }

  startTest(size:number = 1000): void {
    this.startTime = Date.now();
    let message = {type:'ping',payload:new Uint8Array(size)}
    this.payloadSize = message.payload.length
    this.peers = this.getPeers()
    this.responses = 0
    this.broadcast(message)

  }

  onMessage(message:Message){
    let data = JSON.parse(message.data.toString())
    if (data.type === 'ping'){
      if (message.from !== this.id) {
      let resp = {type:'pong',from:message.from}
      this.broadcast(resp)
      console.log('just recevied ' + message)
      console.log('sent ' + resp)
    }else{
      this.payloadSize = message.data.length
    }
    }else if (data.type === 'pong'
          && message.from !== this.id
          && data.from === this.id){
      this.responses++;
      if (this.responses === this.peers.length){
        let totalTime = Date.now() - this.startTime
        console.log(this.peers.length * this.payloadSize / totalTime * 1000 +' bytes / s')
      }
    }
  }
}




export {BaseRoom, TestRoom};
