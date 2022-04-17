<template>
  <div class="col-md-12">
      <div v-if="!successful">
      <h1>Edit post: {{post.nickname}}</h1>
      <form name="form" @submit.prevent="handleRegister">
          <table width="100%" cellpadding="5">
            <tbody>
            <tr>
              <td width="50%">
                <lable for="title">Title</lable>
              </td>
              <td width="50%">
                <lable for="description">Description</lable>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  v-model="post.title"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="title"
                  placeholder="The Flash"
                />
                <div v-if="submitted && errors.has('title')" class="alert-danger"> 
                  {{errors.first('title')}}
                </div>
              </td>
              <td>
                <input
                  v-model="post.description"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="description"
                  placeholder="Barry Allen"
                />
                <div v-if="submitted && errors.has('description')" class="alert-danger">
                  {{errors.first('description')}}
                </div>
              </td>
            </tr> 
            </tbody>
          </table>
          <!-- content -->
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
            v-model="post.content"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="content" 
            placeholder="Bartholomew Henry 'Barry' Allen (born March 14, 1989) is a scientist in the Criminal and Forensic Science Division of the Central City Police Department. He is the son of the late Henry and Nora Allen, the foster son turned son-in-law of Joe West, the husband of Iris West-Allen and the brother-in-law of Wally West, the archenemy of Eobard Thawne, as well as the father of his future children, Nora West-Allen and Bart Allen." 
            rows="2"></textarea>
            <div v-if="submitted && errors.has('content')" class="alert-danger">
              {{errors.first('content')}}
            </div>
          </div>
          <!-- current Images -->
          <div class="form-group" v-if="this.post.images.length">
            <label for="image">Change images</label>
            <table class="table table-striped table-hover center-table" style="width: 80%;">
              <tbody>
                <tr v-for="image in post.images" :key="image">
                  <td><img class="avatar" :src="image" alt="Wrong img" height="100px" /></td>
                  <td>
                    <button class="btn btn-danger btn-block" @click="deleteImg(image)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- new Images -->
          <div class="form-group">
            <label for="image">Add images</label>
            <input type="file" @change="uploadFile" multiple>
          </div>
          <!-- Submit -->
          <div class="row justify-content-center" style="margin: 1% 0 2% 0;">
            <div class="col-3">
              <button type="submit" @submit.prevent="next" class="btn btn-success btn-block">Save changes</button>
            </div>
          </div>
      </form>
      </div>
      <div v-if="message" class="card card-container">
        <div
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >{{message}}
        </div>
      </div>
  </div>
</template>

<script>
import Post from '../../models/post';
import EventBus from "../../common/EventBus";
import TokenService from "../../services/token.service";

export default {
  name: 'Register',
  data() {
    return {
      files: null,
      user: null,
      post: new Post('', '', '', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      services: [],
    };
  },
  async created() {
    this.post = (await this.$store.dispatch('posts/getById', this.$route.params.id)).data;
  },
  methods: {
    deleteImg (img) {
      this.post.images.splice(this.post.images.indexOf(img), 1)
    },
    uploadFile (event) {
      this.files = event.target.files
    },
    handleRegister() {
      try{
        this.message = '';
        this.submitted = true;
        this.$validator.validate().then(isValid => {
          if (isValid) {
            const formData = new FormData();
            if (this.files){
              for (const i of Object.keys(this.files)) {
                formData.append('files', this.files[i])
              }
            }

            const user = TokenService.getUser();

            formData.set('title', this.post.title)
            formData.set('description', this.post.description)
            formData.set('content', this.post.content)
            formData.set('username', user.fullname)

            formData.set('id', this.post._id)
            formData.set('images', JSON.stringify(this.post.images))
            this.$store.dispatch('posts/update', formData).then(
              data => {
                alert(data.message);
                this.$router.push({ path: `/post/${this.post._id}` });
              },
              error => {
                alert(JSON.stringify(error));
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
      } catch(err) {
        alert(err.toString())
      }
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

h1 {
  text-align: center;
  margin: 1%;
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