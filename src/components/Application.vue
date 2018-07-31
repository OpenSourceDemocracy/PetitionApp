<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
  <v-app>
  <v-navigation-drawer
  v-model="drawer"
  app
>
  <v-list dense>
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon>dashboard</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title> <router-link to="/login">Login in</router-link></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-navigation-drawer>
<v-toolbar app>
  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  <v-toolbar-title>Open Source Democracy</v-toolbar-title>
</v-toolbar>
<v-content>
  <v-container fluid fill-height>
          <router-view></router-view>
  </v-container>
</v-content>
<v-footer app fixed>
  <span>&copy; 2018</span>
</v-footer>
</v-app>
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
  @Getter key;

  @State account;

  get id(){
    return this.account.id;
  }
  //
  // @Action
  // async getFS({state, commit}, id){
  //   this.setFS(await states.store.account.getPrivateFS(this.id));
  // }

  created(){
    this.getFS(this.key)
  }
  drawer= true;
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
