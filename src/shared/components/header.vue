<template>
  <div>
    <b-alert variant="secondary" show>
      <div class="text-right mr-2">
        <span class="mr-2">{{user ? user.email: ''}}</span>
        <b-button variant="danger" @click="logout" v-b-tooltip.hover title="Logout">
          <font-awesome-icon icon="power-off"/>
        </b-button>
      </div>
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { sharedSerivce } from "../../_services/sharedService";
import { Subscription } from "rxjs";
import { State, Action, Getter } from "vuex-class";
import { STORE_TYPE } from "../../_helpers/constant";
const namespace: string = "login";

@Component
export default class HeaderPage extends Vue {
  @Action(STORE_TYPE.LOGOUT, { namespace }) logout: any;
  @Getter(STORE_TYPE.PROFILE, { namespace }) user: any;
}
</script>


  // methods: {
  //   ...mapActions(STORE_MODULE.LOGIN, [STORE_TYPE.LOGOUT])
  // },
  // computed: {
  //   ...mapGetters(STORE_MODULE.LOGIN, {
  //     user: STORE_TYPE.PROFILE
  //   })
  // }
};
