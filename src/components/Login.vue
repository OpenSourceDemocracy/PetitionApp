

<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
 <template>
   <!-- <v-app id="inspire"> -->
     <v-content>
       <v-container fluid fill-height>
         <v-layout align-center justify-center>
           <v-flex xs12 sm8 md4>
             <v-card class="elevation-12">
               <v-toolbar dark color="primary">
                 <v-toolbar-title>Login form</v-toolbar-title>
                 <v-spacer></v-spacer>
               </v-toolbar>
               <v-card-text>
                 <v-form>
                   <!-- <v-text-field v-model="email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field> -->
                   <label class="file-select">
    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                  <div class="select-button">
                    <!-- Display the filename if a file has been selected. -->
                    <span v-if="file">Selected File: {{file.name}}</span>
                    <span v-else>Select File</span>
                  </div>
                  <!-- Now, the file input that we hide. -->
                  <input type="file" @change="upload"/>
                </label>
                   <v-text-field v-model="_password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                 </v-form>
               </v-card-text>
               <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn @click="login" color="primary">Login</v-btn>
               </v-card-actions>
             </v-card>
           </v-flex>
         </v-layout>
       </v-container>
     </v-content>
   <!-- </v-app> -->
 </template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {OrbitFS} from "../agent/fs";
import {
   State,
   Getter,
   Action,
   Mutation,
   namespace
 } from 'vuex-class'

@Component
export default class Login extends Vue {
  _password = "";
  // @Prop() account!: string;

  // email = "" ; //TODO: Make Email type

  file: any = null;

  @State account;


  async login(){
    this.account.importAccount(JSON.parse(this.file.toString()), this._password);
  }

  async upload(e: any) {
    this.file = await OrbitFS.readFile(e.target.files[0]);
  }
}
</script>

<style>
.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}

</style>
