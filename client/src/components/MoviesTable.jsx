import { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import axios from "axios";
import ModalMovie from "./ModalMovie";
import ModalDeleteMovie from "./ModalDeleteMovie";

const URL_addMovie = "http://localhost:3001/movie/add";
const URL_editMovie = "http://localhost:3001/movie/edit/";
const URL_deleteMovie = "http://localhost:3001/movie/delete/";

export const MoviesTable = ({ movies }) => {

  const [data, setData] = useState(movies);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalDeleteData, setModalDeleteData] = useState(null);

  useEffect(() => {
    setData(movies);
  }, [movies]);

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeModifyModal = () => {
    setShowModifyModal(false);
    setModalData(null);
  };

  const openModifyModal = (movie) => {
    setShowModifyModal(true);
    setModalData(movie);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setModalDeleteData(null);
  };

  const openDeleteModal = (movie) => {
    setShowDeleteModal(true);
    setModalDeleteData(movie);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Titulo",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Año de estreno",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Acción",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => openModifyModal(record)}>
            Editar
          </Button>
          <Button danger onClick={() => openDeleteModal(record)}>
            Borrar
          </Button>
        </Space>
      ),
    },
  ];

  const addMovie = async (movie) => {
    try {
      let response = await axios.post(URL_addMovie, movie);
      response.data.key = response.data.id;
      setData([response.data, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const editMovie = async (movie) => {
    try {
      await axios.put(URL_editMovie, movie);
      setData(data.map((e) => e.id === movie.id ? movie : e))
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (movie) => {
    try {
      await axios.delete(URL_deleteMovie, {data : movie});
      setData(data.filter((e) => e.id !== movie.id));
      closeDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: "1rem" }}
        onClick={openCreateModal}
      >
        Nueva Pelicula
      </Button>
      <ModalMovie
        show={showCreateModal}
        closeModal={closeCreateModal}
        title={"Nueva pelicula"}
        fetcher={addMovie}
      />
      <ModalMovie
        show={showModifyModal}
        closeModal={closeModifyModal}
        title={"Modificar pelicula"}
        fetcher={editMovie}
        movie={modalData}
      />
      <Table dataSource={data} columns={columns} rowKey={data => data.id} />
      <ModalDeleteMovie
        show={showDeleteModal}
        closeModal={closeDeleteModal}
        fetcher={deleteMovie}
        movie={modalDeleteData}
      />
    </div>
  );
};
