


// import * as IPFS from 'ipfs'
const PubSub = require('ipfs-pubsub-room');



class Message {
  constructor(public data: Uint8Array,
              public from: ipfs.PeerId,
              public seqno:Uint8Array,
              public topicIDs: Array<string>){}
}

interface Room {
  ready(): void;
  onMessage(message: Message): void;
  broadcast(message: Message): void;
  sendTo(peer: ipfs.PeerId, message: Message): void;
  peerJoined(peer: ipfs.PeerId): void;
  peerLeft(peer: ipfs.PeerId): void;
  hasPeer(peer: ipfs.PeerId): boolean;
  getPeers(): Array<ipfs.PeerId>;
  leave(): void;
  onLeave(): void;
}


class BaseRoom {
  ipfs: ipfs;
  room: any;
  roomName:string;
  constructor(roomName: string, ipfs: ipfs){
    this.roomName = roomName
    this.ipfs = ipfs
    this.room = PubSub(this.ipfs, roomName)
    this.room.on("subscribed", ()=> this.ready())
    this.room.on("message", (message: any) =>
          this.onMessage(new Message(message.data,
            message.from,
            message.seqno,
            message.topicIDs)))
    this.room.on("peer joined", (peer: ipfs.PeerId) => this.peerJoined(peer))
    this.room.on('peer left', (peer: ipfs.PeerId) => this.peerLeft(peer))
  }

  peerJoined(peer: ipfs.PeerId): void{
      console.log('Peer joined the room', peer)
  }

  peerLeft(peer:ipfs.PeerId):void {
        console.log('Peer left...', peer)
  }



  ready(): void {
    console.log("we're ready in room "+ this.roomName)
  }

  onMessage(message:any):void {
    console.log(message)
  }

  broadcast(message: Message):void{
    this.room.broadcast(message)
  }
  sendTo(peer: ipfs.PeerId, message: Message):void {
    this.room.sendTo(peer, message)
  }
  hasPeer(peer: ipfs.PeerId): boolean{
    return this.room.hasPeer(peer)
  }
  getPeers(): Array<ipfs.PeerId> {
    return this.room.getPeers()
  }
  leave(): void{
    this.room.leave()
  }
  onLeave(): void{
    console.log("Left room "+this.roomName)
  }
}

class TestMessage extends Message{
  getPayloadSize(): number {
    return this.data.length
  }



}


class TestRoom extends BaseRoom{
  time: Date = new Date();
  lastTime: number = 0;
  peers: Array<ipfs.PeerId>= [];

  startTest(): void {
    this.lastTime = this.time.getTime();
    let message = "ping"
    this.peers = this.getPeers()

  }
}




export {BaseRoom};
