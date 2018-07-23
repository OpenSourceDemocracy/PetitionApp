/* global self, Response */

'use strict'


import * as IPFS from 'ipfs';
import { OrbitFS } from './fs';
const { createProxyServer } = require('ipfs-postmsg-proxy')
let orbitFS: OrbitFS;
let s = (self as any);

self.addEventListener('install', (event:any) => {
  console.log('install step')

  event.waitUntil((self as any).skipWaiting())
})

self.addEventListener('activate', async (event) => {
  console.log('activate step');
  // orbitFS = await OrbitFS.create('pictures');
  let img = await fetch('https://i.imgur.com/0PcZsy5.jpg');
  await orbitFS.write('/jwst', img.body || Buffer.from('hello world'), (err: any) => { });
  let e = (event as any);
  e.waitUntil(s.clients.claim());
});

self.addEventListener('fetch', (evt: any) => {
  let event = evt as any;
  if (event.request.method != 'GET') return;

  event.respondWith(async function() {
    const data: any = await orbitFS.read('/jwst');
    const headers = { status: 200, statusText: 'OK', headers: {} }
    return new Response(data, headers);
  }());
});
//
// async function catAndRespond (hash: any) {
//   const data: any = await node.files.cat(hash)
//   const headers = { status: 200, statusText: 'OK', headers: {} }
//   return new Response(data, headers)
// }

// createProxyServer(():any => node , {
//   addListener: self.addEventListener.bind(self),
//   removeListener: self.removeEventListener.bind(self),
//   async postMessage (data: any) {
//     // TODO: post back to the client that sent the message?
//     const clients: any = await (self as any).clients.matchAll()
//     let each = (client:any) => client.postMessage(data)
//     clients.forEach(each)
//   }
// })
