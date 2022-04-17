import api from './api';

class Post {
  getAll() {
    return api.get('/posts/getAll');
  }

  statistics() {
    return api.get('/posts/statistics');
  }
  
  getById(id) {
    return api.get(`/posts/getById?id=${id}`);
  }
  
  deleteById(id) {
    return api.delete(`/posts/deleteById?id=${id}`);
  }

  new(posts) {
    return api.post('/posts/new', posts);
  }
  
  update(posts) {
    return api.put('/posts/update', posts);
  }
}

export default new Post();
