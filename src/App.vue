<template>
  <div id="app">
    <div id="nav"></div>
    <LoaderPage/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { STORE_TYPE } from "./_helpers/constant";
import * as toastr from "toastr";
import LoaderPage from "./shared/components/loader.vue";

const namespace: string = "toaster";

@Component({
  components: {
    LoaderPage
  }
})
export default class App extends Vue {
  @State(STORE_TYPE.MESSAGE, { namespace }) message: string;
  @State(STORE_TYPE.TYPE, { namespace }) type: string;
  @Action(STORE_TYPE.CLEAR, { namespace }) clear: string;
  @Watch("message")
  onPropertyChanged(newValue: string, oldValue: string) {
    if (newValue) {
      toastr[this.type](newValue);
      this[STORE_TYPE.CLEAR]();
    }
  }
}
</script>
