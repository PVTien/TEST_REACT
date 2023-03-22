import axios from "axios";
import { axiosRequest } from "../configs/axios.config";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants";

export const loginApi = (information) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/DangNhap`,
    method: "POST",
    data: information,
  });
};
