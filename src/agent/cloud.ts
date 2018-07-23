import {Account} from './account';
import {DefaultIpfs} from '../ipfs';
import * as path from 'path';

class Cloud {
  constructor(public account:Account, public db: any){
    db.events.on('replicate', (x: any) => {
      console.log(`${x} added`);
    });
  }

  static async create(directory: string, name:string, options?: any) {
  options = Object.assign(options || {}, {directory: directory})
    let ipfs = await DefaultIpfs.create({
      repo:path.join(directory, '.ipfs')
      });
      debugger;
    let account = await Account.create(ipfs, options);
    let db:any = await account.orbitdb.keyvalue(name, {create:true, write:['*']});
    await db.load();
    let cloudAgent = new Cloud(account, db);
    return cloudAgent;
  }
}

async function main(){
let cloud = await Cloud.create('/mnt/spacedrive/root', 'OpenSourceDemocracy');
debugger;
}
main();

