<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>

    <div class="QRScanner">
        <button  @click="scanQRCode">Scan</button>
        <video id="video" width="300" height="200" style="border: 1px solid gray"></video>
        <button  @click="stopScanning">Reset</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {TestRoom} from "../room";
import { BrowserQRCodeReader, VideoInputDevice } from '@zxing/library';

@Component
export default class QRScanner extends Vue {
    codeReader = new BrowserQRCodeReader();
    scanQRCode(){

      this.codeReader.getVideoInputDevices().then(videoInputDevices => {
         videoInputDevices.forEach(
             device => console.log(`${device.label}, ${device.deviceId}`)
         );
         this.codeReader.decodeFromInputVideoDevice(undefined, 'video')
                   .then(result => console.log((result as any).text))
                   .catch(err => console.error(err));
       }).catch(err => console.error(err));
    }
    stopScanning(){
      this.codeReader.reset()
    }
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
