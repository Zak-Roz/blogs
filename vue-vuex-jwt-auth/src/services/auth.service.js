import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

class AuthService {
  login(user) {
    return instance
      .post('/auth/signin', {
        login: user.login,
        password: user.password,
      })
      .then(response => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ fullname, login, password, code }) {
    return instance.post('/auth/signup', {
      fullname,
      login,
      password,
      code,
    });
  }
}

export default new AuthService();
