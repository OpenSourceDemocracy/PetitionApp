import Vue from 'vue';
import HelloComponent from './components/Hello.vue';
import HelloDecoratorComponent from './components/HelloDecorator.vue';
import {BaseRoom, TestRoom} from './room';
import {Ipfs} from './ipfs';

import Worker from 'worker-loader!./Worker';

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener('message', (event) => { });

let v = new Vue({
    el: '#app',
    template: `
    <div>
        Name: <input v-model='name' type='text'>
        <h1>Room Decorator Component</h1>
        <hello-decorator-component :name='name' :ipfs='ipfs' />
        </div>
    `,
    data: { name: 'testlog',
            ipfs: Ipfs,
            room: new BaseRoom('lobby', Ipfs)},
    components: {
        HelloComponent,
        HelloDecoratorComponent
    }
});
