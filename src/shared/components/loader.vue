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
import { Component, Prop, Vue } from "vue-property-decorator";
import { sharedSerivce } from "../../_services/sharedService";
import { Subscription } from "rxjs";

@Component
export default class LoaderPage extends Vue {
  showLoader = false;
  subscription$ = new Subscription();

  toggleLoader() {
    this.subscription$ = sharedSerivce.toggleLoader.subscribe(
      (showLoader: boolean) => {
        this.showLoader = showLoader;
      },
      error => {
        this.showLoader = false;
      }
    );
  }

  /**
   *Init at component created
   */
  mounted() {
    this.toggleLoader();
  }

  beforeDestroy() {
    this.subscription$.unsubscribe();
  }
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
