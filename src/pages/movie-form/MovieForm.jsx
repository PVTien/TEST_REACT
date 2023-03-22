import React, { useEffect } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useState } from "react";
import {
  addMovieApi,
  editMovieApi,
  fetchMovieDetailApi,
} from "../../services/movie";
import { GROUP_ID } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import moment from "moment";

export default function MovieForm() {
  const [form] = useForm();
  const params = useParams();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const navigate = useNavigate();

  const [componentSize, setComponentSize] = useState("default");

  useEffect(() => {
    // trong trường hợp sửa
    if (params.id) {
      getMovieDetail();
    }
  }, [params.id]);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.id);

    form.setFieldsValue({
      tenPhim: result.data.content.tenPhim,
      trailer: result.data.content.trailer,
      moTa: result.data.content.moTa,
      ngayKhoiChieu: moment(result.data.content.ngayKhoiChieu),
      dangChieu: result.data.content.dangChieu,
      sapChieu: result.data.content.sapChieu,
      hot: result.data.content.hot,
      danhGia: result.data.content.danhGia,
    });

    setImagePreview(result.data.content.hinhAnh);

    console.log(result);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleFinish = async (values) => {
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");

    const formData = new FormData();

    formData.append("maNhom", GROUP_ID);
    formData.append("tenPhim", values.tenPhim);
    formData.append("trailer", values.trailer);
    formData.append("moTa", values.moTa);
    formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
    formData.append("dangChieu", values.dangChieu);
    formData.append("sapChieu", values.sapChieu);
    formData.append("hot", values.hot);
    formData.append("danhGia", values.danhGia);
    file && formData.append("File", file, file.name);

    if (params.id) {
      formData.append("maPhim", params.id);

      await editMovieApi(formData);
    } else {
      await addMovieApi(formData);
    }

    notification.success({
      message: params.id ? "Sửa phim thành công" : "Thêm phim thành công",
    });

    navigate("/admin/movie-management");
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // đọc file

    // callback được gọi lại khi file được đọc xong
    reader.onload = (event) => {
      //   console.log(event.target.result);

      setImagePreview(event.target.result);
    };
  };

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
        tenPhim: "",
        trailer: "",
        moTa: "",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        danhGia: 5,
      }}
      onFinish={handleFinish}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Tên phim"
        name="tenPhim"
        // rules={[
        //   { required: true, message: "Tên phim không được để trống" },
        //   { min: 5, message: "Tên phim phải lớn hơn 5 ký tự" },
        //   { max: 20, message: "Tên phim nhỏ hơn hoặc bằng 20 ký tự" },
        //   //   {pattern}
        // ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="moTa">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Số sao" name="danhGia">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Input type="file" onChange={handleFile} />
      </Form.Item>
      <Image src={imagePreview} />
      <Form.Item label="Tác vụ">
        <Button htmlType="submit">LƯU</Button>
      </Form.Item>
    </Form>
  );
}

// Image src nhận 2 giá trị
// 1: url
// 2: base64 (file => giải mã thành 1 chuỗi)
