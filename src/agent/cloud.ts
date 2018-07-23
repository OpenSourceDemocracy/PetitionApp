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
    let ipfs = await DefaultIpfs.create({
      repo:path.join(directory, '.ipfs')
    })
    let account = await Account.create(ipfs, options);
    let db:any = account.orbitdb.keyvalue(name, {create:true, write:['*']});
    await db.load();
    let cloudAgent = new Cloud(account, db);
    return account;
  }
}
