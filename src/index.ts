import Vue from 'vue';
import HelloComponent from './components/Hello.vue';
import HelloDecoratorComponent from './components/HelloDecorator.vue';
import {BaseRoom, TestRoom} from './room';
import {Ipfs} from './ipfs';

import Worker from 'worker-loader!./Worker';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import HelloRoute from './components/HelloRoute.vue';


const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener('message', (event) => { });

Vue.use(VueRouter)

const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: Home },
				
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }, { path: '/:id', component: () => import( /* webpackChunkName: "[request].vue" */ `./components/HelloRoute.vue`) }

  ]
})

const app = new Vue({ router }).$mount('#app')
// let Home = () => import('./components/Home.vue')

// const router = new VueRouter({
//   routes: [{
//     path: '/',
//     component: Home
//   },
//   {
//     path: '/hello',
//     component: () => import('./components/HelloRoute.vue')
//   }] // short for `routes: routes`
// })

// let v = new Vue({
//   el: '#app',
//     router
//     // template: `
//     // <div>
//     //     Name: <input v-model='name' type='text'>
//     //     <h1>Room Decorator Component</h1>
//     //     <hello-decorator-component :name='name' :ipfs='ipfs' />
//     //     </div>
//     // `,
//     // data: { name: 'testlog',
//     //         ipfs: Ipfs,
//     //         room: new BaseRoom('lobby', Ipfs)},
//     // components: {
//     //     HelloDecoratorComponent
//     // }
// });
