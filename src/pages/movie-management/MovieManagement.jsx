import React from "react";
import { useMovieList } from "../../hooks/useMovieList";
import { Button, notification, Space, Table, Tag } from "antd";
import { formatDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi } from "services/movie";

export default function MovieManagement() {
  const movieList = useMovieList();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "1",
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "2",
      render: (text) => formatDate(text),
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "3",
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "4",
    },
    {
      title: "Hành động",
      key: "5",
      render: (text) => {
        // console.log(text);

        return (
          <div>
            <Button
              onClick={() =>
                navigate(`/admin/movie-management/edit/${text.maPhim}`)
              }
            >
              EDIT
            </Button>
            <Button
              onClick={async () => {
                try {
                  await deleteMovieApi(text.maPhim);
                  notification.success({
                    message: "Xóa phim thành công",
                  });
                } catch (error) {
                  console.log(error);
                  notification.error({
                    message: error.response.data.content,
                  });
                }
              }}
            >
              DELETE
            </Button>
          </div>
        );
      },
    },
  ];

  console.log(movieList);

  return (
    <div>
      <Button
        onClick={() => navigate("/admin/movie-management/add")}
        className="mb-4"
        type="primary"
      >
        THÊM PHIM
      </Button>
      <Table columns={columns} dataSource={movieList} />
    </div>
  );
}
