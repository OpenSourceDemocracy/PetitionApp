/* global self, Response */

'use strict'

// const IPFS = require('ipfs')
import * as IPFS from 'ipfs';
const { createProxyServer } = require('ipfs-postmsg-proxy')

let node: IPFS

self.addEventListener('activate', (event) => {
  console.log('activate step');

  node = new IPFS({
    config: {
      Addresses: {
        Swarm: []
      }
    }
  });
  node.on('ready', () => console.log('js-ipfs node is ready'));
  (node as any).on('error', (err: any) => console.log('js-ipfs node errored', err));

  let e: any = event as any;
  let s: any = self as any;
  e.waitUntil(s.clients.claim());
})

// self.addEventListener('fetch', (event: any) => {
//   if (!event.request.url.startsWith(self.location.origin + '/dist/ipfs')) {
//     return console.log('Fetch not in scope', event.request.url);
//   }

//   console.log('Handling fetch event for', event.request.url)

//   const multihash: any = event.request.url.split('/ipfs/')[1]
//   event.respondWith(catAndRespond(multihash))
// })

async function catAndRespond (hash: any) {
  const data: any = await node.files.cat(hash)
  const headers = { status: 200, statusText: 'OK', headers: {} }
  return new Response(data, headers)
}

createProxyServer(():any => node , {
  addListener: self.addEventListener.bind(self),
  removeListener: self.removeEventListener.bind(self),
  async postMessage (data: any) {
    // TODO: post back to the client that sent the message?
    const clients: any = await (self as any).clients.matchAll()
    let each = (client:any) => client.postMessage(data)
    clients.forEach(each)
  }
})