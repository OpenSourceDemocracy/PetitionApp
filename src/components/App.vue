<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
  <div>
  <v-app>
    <v-app toolbar>
      <main>
        <v-container fluid>
            <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
        </v-container>
      </main>
    </v-app>
  </v-app>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";


@Component
export default class App extends Vue {

  data() {
    return { icons: ['dashboard', 'home', 'events']}
  }

}
</script>

<style>

</style>
