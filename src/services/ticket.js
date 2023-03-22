import axios from "axios";
import { axiosRequest } from "../configs/axios.config";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants";

export const fetchTicketDetailApi = (id) => {
  return axiosRequest({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    method: "GET",
  });
};

export const bookTicketApi = (data) => {
  return axiosRequest({
    url: "/QuanLyDatVe/DatVe",
    method: "POST",
    data: data,
  });
};
