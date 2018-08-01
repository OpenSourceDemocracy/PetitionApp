import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';

import { DefaultIpfs } from './ipfs';

import { Account } from './agent/account';
import { TreeState } from './store';
import { PetitionState } from './store';
import { Contacts } from './store';

import {OrbitFS} from './agent/fs';
let css = require('material-design-icons-iconfont/dist/material-design-icons.css');
let vuetiyfCSS = require('vuetify/dist/vuetify.min.css');

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Vuex);


import Application from './components/Application.vue';

const router = new VueRouter({
  routes: [
    { path: '/tree', component: () => import( /* webpackChunkName: "[request].vue" */ `./components/Tree.vue`) },
    { path: '/tree/:key', component: () => import( /* webpackChunkName: "[request].vue" */ `./components/Tree.vue`) },
    { path: '/QRScanner', component: () => import ('./components/QRScanner.vue')},
    { path: '/login', component: () => import('./components/Login.vue')},
    { path: '/signup', component: () => import('./components/SignUp.vue')},
    { path: '/petition/', component: () => import('./components/Petition.vue')},
    { path: '/createPetition/', component: () => import('./components/CreatePetition.vue')},
    { path: '/petition/:key', component: () => import('./components/Petition.vue')},
    { path: '/', component: () => import('./components/Home.vue')},
  ]
});

async function main(){
  let ipfs = await DefaultIpfs.create();
  let account = await Account.create(ipfs);
  const store = new Vuex.Store({
        modules: {
          tree: TreeState.createModule(),
          petition: new PetitionState(),
          contacts: new Contacts(),
        },
        state : {
            account: account,
            fs: null
        },
        getters : {
            key(){ return account.publicKey},

        },
        mutations: {
          setFS(state: any, value: any){
            state.fs = value;
          }
        },
        actions:{
          async getFS({state, commit}, key: string){
            commit('setFS', await state.account.getPrivateFS(key));
          }
        }
});
  const unsync = sync(store, router) // done. Returns an unsync callback fn

  const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Application)
  });
  return app;
}

main();
