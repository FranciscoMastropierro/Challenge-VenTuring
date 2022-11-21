
import { Modal } from 'antd';
import FormMovie from './FormMovie'

const ModalMovie = ({title, fetcher, show, closeModal, movie}) => {

  return (
    <>
      <Modal title={title} open={show} onCancel={closeModal} footer={null}>
        <FormMovie fetcher={fetcher} data={movie} closeModal={closeModal} />
      </Modal>
    </>
  );
};
export default ModalMovie;