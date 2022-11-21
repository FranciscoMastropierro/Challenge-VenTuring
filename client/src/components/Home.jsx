  import { MoviesTable } from "./MoviesTable.jsx";
  import { Layout, Typography, Input, Button, message, Upload } from "antd";
  import {
    FileSearchOutlined,
    SearchOutlined,
    InboxOutlined,
  } from "@ant-design/icons";
  import { useState, useEffect } from "react";
  import axios from "axios";

  const { Header, Content } = Layout;
  const { Title } = Typography;
  const { Dragger } = Upload;

  const URL_Movies = "http://localhost:3001/movies";

  const props = {
    name: "file",
    multiple: false,
    action: URL_Movies,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

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
          <Header style={{ padding: "1rem", height: "10vh", minHeight: "60px" }}>
            <Title type="success" level={2} style={{ color: "#1890ff" }}>
              VenTuring Challenge
            </Title>
          </Header>
          <Content style={{ padding: "1rem", width: "50%" }}>
            <Input.Group compact>
              <Input
                style={{
                  width: "calc(100% - 200px)",
                }}
                placeholder="Busqueda por titulo de pelicula"
                prefix={<FileSearchOutlined />}
                value={search}
                onChange={(e) => handleInputChange(e)}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                onClick={(e) => handleSubmit(e)}
              />
            </Input.Group>
          </Content>

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

          <Content
            style={{
              padding: "1rem",
              margin: "1rem",
              width: "100%",
              minHeight: "85vh",
            }}
          >
            <MoviesTable movies={dataSearch} />
          </Content>
        </Layout>
      </div>
    );
  };
