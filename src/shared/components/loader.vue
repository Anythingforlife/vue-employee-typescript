<template>
  <div class="custom-loader" v-show="showLoader">
    <b-spinner
      variant="danger"
      style="width: 4rem; height: 4rem; margin:auto"
      label="Large Spinner"
    ></b-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { STORE_TYPE } from '../../_helpers/';
import { State } from 'vuex-class';
const namespace: string = 'comman';

@Component
export default class LoaderPage extends Vue {
  @State(STORE_TYPE.SHOW_LOADER, { namespace }) public showLoader!: boolean;
}
</script>

<style>
.custom-loader {
  height: 100%;
  position: absolute;
  width: 100%;
  align-content: center;
  text-align: center;
  display: flex;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
</style>
