<template>
  <div id="app">
    <div id="nav"></div>
    <LoaderPage/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { STORE_TYPE, CONSTANT } from './_helpers/constant';
import * as toastr from 'toastr';
const LoaderPage = () => import('./shared/components/loader.vue');

const namespace: string = 'toaster';

@Component({
  components: {
    LoaderPage,
  },
})
export default class App extends Vue {
  @State(STORE_TYPE.MESSAGE, { namespace }) public message!: string;
  @State(STORE_TYPE.TYPE, { namespace }) public type!: string;
  @Action(STORE_TYPE.CLEAR, { namespace }) public clear: any;
  @Watch('message')
  public onPropertyChanged(newValue: string, oldValue: string) {
    if (newValue) {
      this.messageHandling(newValue);
      this.clear();
    }
  }

  public messageHandling(message: string) {
    switch (this.type) {
      case CONSTANT.SUCCESS:
        toastr.success(message);
        break;
      case CONSTANT.ERROR:
        toastr.error(message);
        break;
      case CONSTANT.INFO:
        toastr.info(message);
      case CONSTANT.INFO:
        toastr.warning(message);
    }
  }
}
</script>
