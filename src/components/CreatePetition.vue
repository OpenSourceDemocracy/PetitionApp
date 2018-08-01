<template>
  <!-- <v-list> -->
  <v-flex xs12 md5 offset-md2>
    <v-text-field
         label="Subject"
         v-model='title'
         single-line
         full-width
         hide-details
       ></v-text-field>
       <v-divider></v-divider>
       <v-textarea
         v-model="body"
         label="Message"
         counter
         maxlength="120"
         full-width
         single-line
       ></v-textarea>
       <v-btn @click="create">Create</v-btn>
         </v-flex>

  <!-- <v-content>
    <v-card v-for='petition in petitions' :key='petition.title'>
        <v-card-title primary-title>
          <div>
            <h3>{{petition.title}}</h3>
          </div>
        </v-card-title>
        <v-card-text>
          {{petition.body}}
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="blue">Sign</v-btn>
        </v-card-actions>
      </v-card>
    </v-content> -->
       <!-- <v-list-group
         v-for="petition in petitions"
         :key="petition.title"
         no-action>
         <v-list-tile>
           <v-list-tile-title>{{ petition.title }}</v-list-tile-title>
             <v-list-tile-content>{{petition.body}}</v-list-tile-content>
         </v-list-tile>
       </v-list-group> -->
     <!-- </v-list> -->
  <!-- -->


 </template>



<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
 // import Component from 'vue-class-component'
import {
   State,
   Getter,
   Action,
   Mutation,
   namespace
 } from 'vuex-class'

import {OrbitFS} from '../agent/fs';

 @Component
export default class Petition extends Vue {
   title="";
   body="";
   @State fs;


   async create() {
     await this.fs.write('/petitions/' + this.title, JSON.stringify({
       title: this.title,
       body: this.body
     }), {create: true});
     this.fs.commit();

   }


}
</script>

<style>
</style>
