<template>
  <!-- <v-list> -->
  <v-flex xs12 md5 offset-md2>
           <div v-for="petition in petitions" :key="petition.title">
             <v-card class="my-3" hover>
                 <v-container fill-height fluid>
                   <v-layout>
                     <v-flex xs12 align-end d-flex>
                       <span class="headline">{{ petition.title }}</span>
                     </v-flex>
                   </v-layout>
                 </v-container>
               </v-card-media>
               <v-card-text>
                 {{ petition.body }}
               </v-card-text>
               <v-card-actions>
                 <v-btn @click="sign(petition)" icon class="blue--text text--darken-4">
                  <div v-if="!petition.signed">
                    <v-icon medium > assignment </v-icon>
                  </div>
                  <div v-else>
                    <v-icon medium v-if:> assignment_turned_in </v-icon>
                  </div>
                  Sign
                 </v-btn>
                 <v-spacer></v-spacer>
                 <v-btn flat class="blue--text">Read More</v-btn>
               </v-card-actions>
             </v-card>
           </div>
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
  <!-- <v-text-field
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
     ></v-textarea> -->


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
   signed = false;
   @Getter key;

   get petitions() {
     return this.$store.state.petition.petitions;
   }

   created() {
     this.$store.dispatch('petition/fetchState', this.key);
   }

   sign(petition: any) {
     petition.signed = !petition.signed;
   }

}
</script>

<style>
</style>
