

<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
 <template>
   <v-app id="inspire">
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
                   <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                   <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                 </v-form>
               </v-card-text>
               <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn color="primary">Login</v-btn>
               </v-card-actions>
             </v-card>
           </v-flex>
         </v-layout>
       </v-container>
     </v-content>
   </v-app>
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
  drawer: null;

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
