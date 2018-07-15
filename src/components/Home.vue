<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
    <div>
        Hello World
          <router-link to="/hello">Hello</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Home extends Vue {
    


}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
