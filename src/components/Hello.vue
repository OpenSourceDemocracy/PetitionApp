<!-- src/components/Hello.vue -->
<template>
    <div>
        <div class="greeting">Room {{name}}</div>
        <br>
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
import Vue from "vue";
import {BaseRoom} from "../room";

export default Vue.extend({
    props: ['name','ipfs'],
    data(){
        return {room: new BaseRoom(this.name, this.ipfs)}
    },
    computed: {
        peers(): Array<string> {
          return this.room.getPeers()
        }
    }
});
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
