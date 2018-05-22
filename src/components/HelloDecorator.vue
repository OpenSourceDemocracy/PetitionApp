<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
    <div>
        <div class="greeting">Room {{name}}</div>
        <br>
        <input v-model="size" type="text"> Number of Bytes <br>
        <button  @click="startTest">Start Test</button>
        <div id=peers>
          Peers Online
          <ul>
            <li v-for="peer in peers">
              {{peer}}
            </li>
          </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {TestRoom} from "../room";

@Component
export default class HelloDecorator extends Vue {
    @Prop() name!: string;
    @Prop() ipfs!: ipfs;

    size: number = 1000;

    room = new TestRoom(this.name, this.ipfs)

    get peers() {
      return this.room.getPeers()
    }

    startTest(){
      this.room.startTest(this.size)
    }


}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
