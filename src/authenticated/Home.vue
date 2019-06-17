<template>
  <div class="home">
    <HeaderPage/>
    <EmployeeList/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderPage from "../shared/components/header.vue";
import EmployeeList from "../authenticated/employeeList.vue";

@Component({
  components: {
    HeaderPage,
    EmployeeList
  }
})
export default class Home extends Vue {}
</script>
