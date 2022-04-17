<template>
<div>
  <div v-if="access">
    <h1 class="name-post">Title: {{ post.title }}</h1>
    <h3 class="name-post">Date: {{ new Date(post.createdAt).toUTCString() }}</h3>
    <div v-if="this.post.images.length" class="lingallery">
      <lingallery :iid.sync="currentId" :width="width" :height="height" :items="items"/>
    </div>

    <h5 class="origin_description">Description:</h5>
    <p class="origin_description">{{ post.description }}</p>
    
    <h5 class="origin_description">Content:</h5>
    <p class="origin_description" v-html="post.content" />
    <!-- <p class="origin_description">{{ post.content }}</p> -->
    
    <h5 class="origin_description">Creator:</h5>
    <p class="origin_description"><strong>{{ post.username }}</strong></p>

    <div class="row justify-content-center" style="margin: 3%">
      <div class="col-4">
        <router-link :to="`/edit-post/${post._id}`" class="but-link">
          <button class="btn btn-warning btn-block">
              Edit
          </button>
        </router-link>
      </div>
      <div class="col-4">
        <button class="btn btn-danger btn-block" @click="deletePost()">Delete</button>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import Lingallery from 'lingallery';
import EventBus from "../../common/EventBus";

export default {
  data() {
    return {
      post: null,
      access: false,
      width: 600,
      height: 400,
      items: [],
      currentId: null,
      data: ''
    }
  },
  async created() {
    try {
      this.access = true;
      this.post = (await this.$store.dispatch('posts/getById', this.$route.params.id)).data;
      this.items = this.post.images.map((el) => ({
        src: el,
        thumbnail: el.replace('data', 'data/thumbnail'),
      }))
    } catch(err) {
      if (err.response && err.response.status === 403) {
        EventBus.dispatch("logout");
      }
    }
  },
  methods: {
    async deletePost() {
      try{
        this.data = (await this.$store.dispatch('posts/deleteById', this.$route.params.id)).data;
        alert(this.data.message)
        this.$router.push({ path: `/posts` })
      } catch(err) {
        alert(err.toString())
      }
    }
  },
  components: {
    Lingallery
  }

}
</script>

<style>
.lingallery {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.center-table {
  margin: 1% 0;
  margin-left: auto;
  margin-right: auto;
}

.origin_description {
  margin: 1% 0 1% 20%;
  text-align: left;
}

.name-post {
  margin: 1% 0;
  text-align: center;
}
</style>