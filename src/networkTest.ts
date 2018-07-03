import {Ipfs} from './ipfs';

import {BaseRoom, TestRoom} from './room';


console.log(process.argv);

let testNet = new TestRoom('test', Ipfs, process.argv.length >2);
