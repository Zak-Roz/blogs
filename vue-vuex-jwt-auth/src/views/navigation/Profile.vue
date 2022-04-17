<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        User account <strong>{{currentUser.fullname}}</strong>
      </h3>
    </header>
    <input type="button" style="margin:15px 0 0 0;width: 15%" class="btn btn-success" id="show-modal" @click="showModalPass = true" value="Change password"/>
    <mdPass v-if="showModalPass" @close="showModalPass = false;">
      <h3 slot="header">Change password</h3>
    </mdPass>
    
    <input type="button" style="margin:15px 0 0 10px;width: 15%" class="btn btn-success" id="show-modal" @click="showModalName = true" value="Change fullname"/>
    <mdFullname v-if="showModalName" @close="showModalName = false;">
      <h3 slot="header">Change fullname</h3>
    </mdFullname>
    
    <div style="padding: 10px 0"></div>
    <p>
      <strong>Login:</strong>
      {{currentUser.login}}
    </p>
  </div>
</template>

<script>
import mdPass from './../modals/md-pass.vue';
import mdFullname from '../modals/md-fullname.vue';
import TokenService from "../../services/token.service";

export default {
  components: {
    mdPass,
    mdFullname,
  },
  data() {
    return {
      showModalPass: false,
      showModalName: false,
      user: null,
    };
  },
  name: 'Profile',
  computed: {
    currentUser() {
      return TokenService.getUser();
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
};
</script>
<style scoped>
.container {
  margin-top: 1rem;
}
</style>