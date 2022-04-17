import Post from '../services/posts.service';

export const posts = {

  namespaced: true,
  actions: {
    getAll() {
      return Post.getAll();
    },
    
    statistics() {
      return Post.statistics();
    },

    getById(_, id) {
      return Post.getById(id);
    },
    
    deleteById(_, id) {
      return Post.deleteById(id);
    },

    new(_, data) {
      return Post.new(data).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    
    update(_, data) {
      return Post.update(data).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  },
};
