<template>
  <div class="container">
    <h1 class="name-post">Statistics: how many posts were created daily</h1>
    <column-chart :data="datas"></column-chart>
  </div>
</template>

<script>
import EventBus from "../../common/EventBus";

export default {
  name: 'Dashboard',
  data() {
    return {
      datas: null,
      content: ''
    };
  },
  mounted() {
    this.$store.dispatch('posts/statistics').then(
      data => {
        this.datas = data.data;
      },
      error => {
        this.loading = false;
        this.message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        alert(JSON.stringify(error))
        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
      }
    );
  },
};
</script>

<style scoped>
.container {
  margin-top: 1rem;
}
.name-post {
  margin: 2% 0;
  text-align: center;
}
</style>
















