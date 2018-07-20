

<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
  <div>
   <input v-model="email" id="email" type="text" placeholder="Enter email of account"/>
    <input  v-model="password" id="password" type="password" placeholder="Enter password for encryption/decryption"/>
    <button v-on:click="createAccount" id="createAccount" type="button" >Create Account</button>
    <button @click="login" id="lookupAccount" type="button" >Login in</button>
    <img :src="img" v-if="img"></img>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {OrbitFS} from "../agent/fs";

@Component
export default class Login extends Vue {
  // @Prop() account!: string;
  constructor() {
    super();
    this.orbitfs = "";
  }
  orbitfs: OrbitFS | string;
  email = "" ; //TODO: Make Email type
  password = "";
  image = "";

  get fs() {

    return this.orbitfs;
  }
  get img() {
    // if (typeof this.orbitfs != 'string'){
    //   (async () => {
    //     this.image = (await (this.orbitfs as OrbitFS).read('/jwst')).toString();
    //   })()
    // }
    if (this.image){
      return this.image;
    }
  }

  login(){
    (async () => {
      this.orbitfs = await OrbitFS.create();
      let orbitfs = this.orbitfs;
      let fetched = await fetch('https://i.imgur.com/0PcZsy5.jpg');
      let img:string ;//await fetched.arrayBuffer() || new ArrayBuffer(0);
      let blob = await fetched.blob();
      var reader  = new FileReader();

      reader.addEventListener("loadend", async () => {
        img = reader.result;
        await orbitfs.write('/jwst', new Blob([img]), {create: true});
      }, false);

      if (blob) {
        reader.readAsDataURL(blob);
      }


    })()
  }


  createAccount(){
    console.log("Create Account");
  }
}
</script>

<style>

</style>
