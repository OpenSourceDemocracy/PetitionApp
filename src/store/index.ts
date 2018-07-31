import {OrbitFS} from "../agent/fs";

export  class TreeState  {

  static async createItem(address: string, fs:OrbitFS){
    let stat = await fs.stat(address);
    let item = {type:stat.type, title:address, action:'arrow_right_alt'}
    if (stat.type === 'file') {
      return item;
    }
    item.action = 'folder';
    let children = await fs.ls(address);
    if (!address.endsWith('/')) {
      address = address + "/";
    }
    return {...item, items:
      await Promise.all(children.map(async (entry: any) => await TreeState.createItem(address + entry.name, fs)))}
  }
  constructor(public fs: OrbitFS){}

  static createModule() {
    return {
    namespaced: true,
    state:{
      tree:{}
    },
    getters : {},
    mutations : {
      setTree(state:any, value: any){
        state.tree = value;
      }
    },
    actions : {
      async fetchTree({state, commit}, fs: OrbitFS){
        let root = await TreeState.createItem("/", fs);
        commit('setTree', root);
      }
    }
  }
}
}

export {PetitionState} from './petitionState';
