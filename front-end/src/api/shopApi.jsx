import axiosClient from "./anxiousClient";

const ShopApi = {
  getShop: () => {
    const url = "/";
    return axiosClient.get(url);
  },
  getProduct: () => {
    const url = "/products";
    return axiosClient.get(url);
  },
  getProductDetail: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};

export default ShopApi;
