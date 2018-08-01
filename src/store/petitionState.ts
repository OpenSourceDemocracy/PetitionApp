import * as OrbitDB from 'orbit-db';
import {OrbitFS} from '../agent/fs';
import {PetitionProxy} from './petition';

export class PetitionState {
  constructor(){}
  namespaced= true;

  actions = {
    async fetchState({state, commit, rootState}, key){
      if (rootState.route.params.key){
        key = rootState.route.params.key;
      }
      let fs = await rootState.account.getPrivateFS(key);
      let petitions = [];
      let petitionList = [];
      try {
        petitionList = await fs.ls('/petitions');
      }catch (err){
        await fs.mkdir('/petitions');
      }
      for (let p in (petitionList)) {
        let name = '/petitions/' +  petitionList[p].name;
        let petition: any = PetitionProxy.Parse((await fs.read(name)).toString());
        petition.signed = false;
        petition.id = (await fs.stat(name)).hash;
        petitions.push(petition);
      }
      commit('setState', petitions);
    }
  };
  getters = {};
  state = {
    petitions : [],
  };
  mutations = {
    setState(state:any, value:any){
      state.petitions = value;
    },
  };
}
