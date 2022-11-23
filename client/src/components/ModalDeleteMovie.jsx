import { Modal, Typography } from "antd";

const { Title, Text } = Typography;

const ModalDeleteMovie = ({ show, closeModal, fetcher, movie }) => {
  return (
    <Modal open={show} onCancel={closeModal} onOk={() => fetcher(movie)}>
      <Title>Confirma eliminar ?</Title>
      <Text>{`Se borrara pelicula : ${movie?.title}`}</Text>
    </Modal>
  );
};
export default ModalDeleteMovie;
