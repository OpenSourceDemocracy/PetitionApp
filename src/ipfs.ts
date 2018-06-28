
import * as ipfs from "ipfs";


const Ipfs = new ipfs({
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/spacestation.hopto.org/tcp/9090/wss/p2p-websocket-star'
        // '/dns4/spacestatic.hopto.org/tcp/9090/ws/p2p-websocket-star/'
      ]
    }
  }
})

export {Ipfs}
