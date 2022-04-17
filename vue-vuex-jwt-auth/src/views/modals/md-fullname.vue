<template name="Modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            Change Fullname
          </slot>
          <button class="close" @click="$emit('close')">&times;</button>
        </div>

        <div class="modal-body">
          <form name="form" @submit.prevent="handleRegister">
            <div v-if="!successful">
              <div class="form-group">
                <label for="fullname">New fullname</label>
                <input
                  v-model="fullname"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="fullname"
                  placeholder="Enter your new fullname"
                />
                <div
                  v-if="submitted && errors.has('fullname')"
                  class="alert-danger"
                >{{errors.first('fullname')}}</div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block">Save new fullname</button>
              </div>
            </div>
          </form>

          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >{{message}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EventBus from "../../common/EventBus";
import TokenService from "../../services/token.service";

export default {
  name: 'updatePass',
  data() {
    return {
      submitted: false,
      successful: false,
      message: '',
      showModal: false,
      fullname: '',
    };
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          const user = { 
            login: this.$store.state.auth.user.login,
            fullname: this.fullname,
          }
          this.$store.dispatch('user/updateFullname', user).then(
            data => {
              const user = TokenService.getUser();
              user.fullname = this.fullname;
              TokenService.setUser(user);
              this.message = data.message;
              this.successful = true;
              window.location.reload();
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
              }
              this.successful = false;
            }
          );
        }
      });
    },
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.close {
  line-height: 32px;
  color: #5c4084;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>