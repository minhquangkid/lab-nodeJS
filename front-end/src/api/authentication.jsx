import axiosClient from "./anxiousClient";

const UserApi = {
  login: (data) => {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  logout: () => {
    const url = "/logout";
    return axiosClient.get(url);
  },
  signUp: (data) => {
    const url = "/signup";
    return axiosClient.post(url, data);
  },
};

export default UserApi;
