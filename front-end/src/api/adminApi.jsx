import axiosClient from "./anxiousClient";

const AdminApi = {
  getAddProduct: () => {
    const url = "/add-product";
    return axiosClient.get(url);
  },
  postAddProduct: (data) => {
    const url = "/add-product";
    return axiosClient.post(url, data);
  },
  editProduct: (data) => {
    const url = "/edit-product";
    return axiosClient.post(url, data);
  },
  getProductDetail: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  deleteProduct: (id) => {
    const url = `delete-product/${id}`;
    return axiosClient.delete(url);
  },
};

export default AdminApi;
