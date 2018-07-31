<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
      <v-list>
           <v-list-group
             v-for="item in items"
             v-model="item.active"
             :key="item.title"
             :prepend-icon="item.action"
             no-action
           >
             <v-list-tile slot="activator">
               <v-list-tile-content>
                 <v-list-tile-title>{{ item.title }}</v-list-tile-title>
               </v-list-tile-content>
             </v-list-tile>

             <v-list-tile
               v-for="subItem in item.items"
               :key="subItem.title"
               @click=""
             >
               <v-list-tile-content>
                 <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
               </v-list-tile-content>

               <v-list-tile-action>
                 <v-icon>{{ subItem.action }}</v-icon>
               </v-list-tile-action>
             </v-list-tile>
           </v-list-group>
         </v-list>
</template>

<script lang="ts">
import {OrbitFS} from "../agent/fs";
import { Vue, Component, Prop } from "vue-property-decorator";
import  VTreeview from 'v-treeview';
// import Component from 'vue-class-component';
import {ModuleTree} from 'vuex';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'


import {TreeState} from "../store";

@Component
export default class Tree extends Vue {
  @State fs;
  @Action getFS;
  @State account;

  get items (){
    return (this.$store as any).state.tree.tree.items;
  }

  created(){
    (async () => {
      await this.getFS(this.account.id);
      this.$store.dispatch('tree/fetchTree', this.fs);
    })()
  }
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
