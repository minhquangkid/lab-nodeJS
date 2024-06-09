import axiosClient from "./anxiousClient";

const CartApi = {
  getCart: () => {
    const url = "/carts";
    return axiosClient.get(url);
  },
  addCart: (data) => {
    const url = "/cart";
    return axiosClient.post(url, data);
  },
  deleteCart: (id) => {
    const url = `/delete-cart/${id}`;
    return axiosClient.delete(url);
  },
};

export default CartApi;
