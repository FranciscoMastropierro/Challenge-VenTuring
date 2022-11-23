import { MoviesTable } from "./MoviesTable.jsx";
import { Layout, Typography, Input, Button, message, Upload } from "antd";
import {
  FileSearchOutlined,
  SearchOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Home.css";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Dragger } = Upload;

const URL_Movies = "http://localhost:3001/api/movies";

const inicialState = [
  {
    id: null,
    title: "",
    description: "",
    year: "",
  },
];

export const Home = () => {
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState(inicialState);

  const getMoviesBySearch = async (input) => {
    try {
      let { data } = await axios.get(URL_Movies + `?title=${input}`);
      setDataSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    name: "file",
    multiple: false,
    action: URL_Movies,
    accept: ".csv",
    onChange(info) {
      const { status } = info.file;
      // if (status !== "uploading") {
      //   console.log(info.file.response, info.fileList);
      // }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        getMoviesBySearch("");
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    // onDrop(e) {
    //   console.log("Dropped files", e.dataTransfer.files);
    // },
  };

  useEffect(() => {
    getMoviesBySearch("");
  }, []);

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getMoviesBySearch(search);
    setSearch("");
  }

  return (
    <div>
      <Layout className="layout">
        <Header className="header">
          <Title type="success" level={2} className="title">
            VenTuring Challenge
          </Title>
        </Header>
        <Content style={{ padding: "1rem", width: "50%" }}>
          <Input.Group style={{marginBottom : "1rem"}} compact>
            <Input
              className="input_search"
              placeholder="Busqueda por titulo de pelicula"
              prefix={<FileSearchOutlined />}
              value={search}
              onChange={(e) => handleInputChange(e)}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={(e) => handleSubmit(e)}
            />
          </Input.Group>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Haga clic o arrastre el archivo a esta área para cargarlo
            </p>
            <p className="ant-upload-hint">
              Soporta archivos CVS del formato title;description;year;
            </p>
          </Dragger>
        </Content>
        <Content className="table">
          <MoviesTable movies={dataSearch} />
        </Content>
      </Layout>
    </div>
  );
};
