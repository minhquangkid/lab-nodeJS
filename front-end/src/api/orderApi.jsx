import axiosClient from "./anxiousClient";

const OrderApi = {
  getOrder: () => {
    const url = "/orders";
    return axiosClient.get(url);
  },
  createOrder: () => {
    const url = "/create-order";
    return axiosClient.post(url);
  },
};

export default OrderApi;
