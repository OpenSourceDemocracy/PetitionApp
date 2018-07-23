import Vue from 'vue';
import HelloComponent from './components/Hello.vue';
import HelloDecoratorComponent from './components/HelloDecorator.vue';
import {BaseRoom, TestRoom} from './room';
import { DefaultIpfs } from './ipfs';
import * as Ipfs from 'ipfs';
// import Worker from 'worker-loader!./Worker';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify'
import Home from './components/Home.vue';
import HelloRoute from './components/HelloRoute.vue';
import { OrbitFS } from './agent/fs';
const { createProxyClient } = require('ipfs-postmsg-proxy')

// let webServiceWorker = false;
//
// if (webServiceWorker) {
//   let runtime = require('serviceworker-webpack-plugin/lib/runtime');
//   if ('serviceWorker' in navigator) {
//     runtime.register();
//   }
// }
// require('file?name=[name].[ext]!../index.html');

// addEventListener('fetch', (evt) => {
//   // Let the browser do its default thing
//   // for non-GET requests.
//   let event = evt as any;
//   if (event.request.method != 'GET') return;

//   event.respondWith(async function() {
//     const data: any = await orbitFS.read('/jwst');
//     const headers = { status: 200, statusText: 'OK', headers: {} }
//     return new Response(data, headers);
//   }());
// });


// const worker = new Worker();
// node = createProxyClient({
//         addListener: worker.addEventListener.bind(worker),
//         removeListener: worker.removeEventListener.bind(worker),
//         postMessage: (data: any) => worker.postMessage(data)
//       })

// worker.postMessage({ a: 1 });
// worker.onmessage = (event) => {};

// worker.addEventListener('message', (event) => { });
Vue.use(Vuetify);
Vue.use(VueRouter);

import QRScanner from './components/QRScanner.vue';
import Tree from './components/Tree.vue';
// import Login from
import App from './components/App.vue';

const router = new VueRouter({
  routes: [
    { path: '/hello', component: () => import( /* webpackChunkName: "[request].vue" */ `./components/HelloRoute.vue`) },
    { path: '/qr',component: QRScanner},
    { path: '/login',component: () => import('./components/Login.vue')},
    { path: '/', component: () => import('./components/Login.vue')}
  ]
})

const app = new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
})
