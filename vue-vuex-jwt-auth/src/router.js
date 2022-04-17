import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/navigation/Home.vue';
import Help from './views/navigation/Help.vue';
import Profile from './views/navigation/Profile.vue';

import Register from './views/navigation/Register.vue';
import Login from './views/navigation/Login.vue';

import Post from './views/posts/Post.vue';
import NewPost from './views/posts/NewPost.vue';
import Posts from './views/posts/Posts.vue';
import EditPost from './views/posts/EditPost.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new-post',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/edit-post/:id',
      component: EditPost,
      props: true,
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/post/:id',
      component: Post,
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
});