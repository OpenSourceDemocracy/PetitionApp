

<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
 <template>
   <v-card fluid>
  <v-toolbar
    color="deep-purple accent-4"
    cards
    dark
    flat
  >
    <v-btn icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-card-title class="title font-weight-regular">Sign up</v-card-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
  <v-form
    v-model="form"
  >
    <v-text-field
      v-model="password"
      box
      color="deep-purple"
      counter="6"
      label="Password"
      style="min-height: 96px"
      type="password"
    ></v-text-field>
    <v-text-field
      v-model="email"
      box
      color="deep-purple"
      label="Email address"
      type="email"
    ></v-text-field>
    <v-text-field
      v-model="name"
      box
      color="deep-purple"
      label="Name"
      type="name"
    ></v-text-field>
    <v-textarea
      v-model="bio"
      auto-grow
      box
      color="deep-purple"
      label="Bio"
      rows="1"
    ></v-textarea>
  </v-form>
  <v-divider></v-divider>
  <v-card-actions>
    <v-btn
      flat
      @click="$refs.form.reset()"
    >
      Clear
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      @click="submit"
      :disabled="!form"
      :loading="isLoading"
      class="white--text"
      color="deep-purple accent-4"
      depressed
    >Submit</v-btn>
  </v-card-actions>

</v-card>
   <!-- </v-app> -->
 </template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
   State,
   Getter,
   Action,
   Mutation,
   namespace
 } from 'vuex-class'

@Component
export default class SignUp extends Vue {
  password: string = "";
  name: string = "";
  form = false;
  isLoading = false;
  bio: string="";
  email: string="";
  // @Prop() account!: string;
  @State account;

  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  async submit(){
    let exportedKey = await this.account.exportAccount(this.password);
    this.download("key.json", JSON.stringify(exportedKey));
  }

}
</script>

<style>

</style>
