<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
  <div>
  <v-app>
    <v-app toolbar>
      <v-navigation-drawer permanent clipped>
        <v-list>
          <v-list-tile v-for="i in 3" :to="{path: '/page' + i}">
            <v-list-tile-action>
              <v-icon>{{ icons[i-1] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Page {{ i }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar>
        <v-toolbar-title>Toolbar</v-toolbar-title>
      </v-toolbar>
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
