<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div v-if="!successful">
      <form name="form" @submit.prevent="handleRegister">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
          <!-- fullname -->
          <div class="form-group">
            <label for="fullname">Fullname</label>
            <input
              v-model="user.fullname"
              v-validate="{required: true, regex: /[А-ЯІЇЄа-яіїєA-Za-z\s]{1,70}/}"
              type="text"
              class="form-control"
              name="fullname"
              placeholder="Brad Pitt"
            />
            <div
              v-if="submitted && errors.has('fullname')"
              class="alert-danger"
            >{{errors.first('fullname')}}</div>
          </div>
          <!-- login -->
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.login"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
              placeholder="privatbank@ukr.net"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:1|max:20'"
              type="password"
              class="form-control"
              name="password"
              placeholder="Enter the password"
              ref="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <label for="password_confirmation">Password confirmation</label>
            <input
              v-validate="'required|confirmed:password'"
              type="password"
              class="form-control"
              name="password_confirmation"
              placeholder="Enter the password again"
              data-vv-as="password"
            />
            <div
              v-if="submitted && errors.has('password_confirmation')"
              class="alert-danger"
            >{{errors.first('password_confirmation')}}</div>
          </div>
          <!-- secret-code -->
          <div class="form-group">
            <label for="code">Secret code</label>
            <input
              v-model="user.code"
              v-validate="'required|min:5|max:50'"
              type="password"
              class="form-control"
              name="code"
              placeholder="Enter the code (min. 5 char)"
              ref="code"
            />
            <div
              v-if="submitted && errors.has('code')"
              class="alert-danger"
            >{{errors.first('code')}}</div>
          </div>
          <div class="form-group">
            <label for="code_confirmation">Secret code confirmation</label>
            <input
              v-validate="'required|confirmed:code'"
              type="password"
              class="form-control"
              name="code_confirmation"
              placeholder="Enter the code again"
              data-vv-as="code"
            />
            <div
              v-if="submitted && errors.has('code_confirmation')"
              class="alert-danger"
            >{{errors.first('code_confirmation')}}</div>
          </div>
          <!-- btn Sign Up -->
          <div class="form-group">
            <button type="submit" @submit.prevent="next" class="btn btn-primary btn-block" >Sign up</button>
          </div>
      </form>
      </div>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
    };
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
              setTimeout(()=> this.$router.push('/login'), 2000)
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
    reloadPage() {
      window.location.reload();
    },
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>