<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
  <div>
  Welcome to Open Source Demecracy's Petition App <br>
  {{id}}<br>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';

@Component
export default class Home extends Vue {

  @Action getFS;
  //
  // @Mutation
  // setFS(value: any){
  //   this.fs = value;
  // }
  @State fs;

  @State account

  get id(){
    return this.account.id;
  }
  //
  // @Action
  // async getFS({state, commit}, id){
  //   this.setFS(await states.store.account.getPrivateFS(this.id));
  // }

  created(){
    this.getFS(this.id)
  }
  drawer= true;
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
