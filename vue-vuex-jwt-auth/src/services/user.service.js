import api from './api';
import axios from "axios";

class UserService {  
  updatePass({ login, password, oldPassword }) {
    return api.put('/user/updatePass', {
      login,
      password,
      oldPassword,
    });
  }
  
  updateFullname({ login, fullname }) {
    return api.put('/user/updateFullname', {
      login,
      fullname,
    });
  }
  
  forgotPass({ login, password, code }) {
    return axios.put('http://localhost:8080/api/user/forgotPass', {
      login,
      password,
      code,
    });
  }
}

export default new UserService();
