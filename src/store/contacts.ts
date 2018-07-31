import * as OrbitDB from 'orbit-db';
import {OrbitFS} from '../agent/fs';
import {ProfileProxy} from './Profile';

export class Contacts {
  constructor(){}
  static async fetchContact(key: string, rootState: any) {
    let contactFS = await rootState.account.getPrivateFS(key);
    return ProfileProxy.Parse((await contactFS.read(`/profile`)).toString());
  };
  namespaced= true;

  actions = {


    async fetchState({state, commit, rootState}){
      let fs = rootState.account.fs;
      let contacts = [];
      let contactList = [];
      try {
        contactList = await fs.ls('/contacts');
      }catch (err){
        await fs.mkdir('/contacts');
      }
      for (let p in (contactList)) {
        let key = contactList[p].name;
        let contact = Contacts.fetchContact(key, rootState)

        contacts.push(contact);
      }
      commit('setState', contacts);
    },
    async addContact({state, commit, rootState}, key: string){
      let fs = rootState.fs;
      try {
        await fs.stat('/contacts');
      }catch (err){
        await fs.mkdir('/contacts');
      }
      await fs.write('/contacts/'+ key,{create: true});
      this.dispatch('fetchState');
      // commit('pushContact', await Contacts.fetchContact(key, rootState));
    }
  };
  getters = {

  };
  state = {
    contacts : [],
  };
  mutations = {
    setState(state:any, value:any){
      state.contacts = value;
    },
    pushContact(state: any, contact: any){
      state.contacts.push(contact);
    }
  };
}
