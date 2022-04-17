import UserService from '../services/user.service';

export const user = {

  namespaced: true,
  actions: {
    updatePass(_, user) {
      return UserService.updatePass(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    updateFullname(_, user) {
      return UserService.updateFullname(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    
    forgotPass(_, user) {
      return UserService.forgotPass(user).then(
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
