import Modal from "react-modal";
import { ModalGlobal } from "../styles/SearchModalStyles.js";
import Searchbar from "./Searchbar.js";

export default function SearchModal(props) {
  const { open, setOpen } = props;
  Modal.setAppElement("#root");
  return (

    <Modal
      isOpen={open}
      className="searchContainer"
      overlayClassName="ov_searchContainer"
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setOpen(false)}
    >
      <ModalGlobal />
      <Searchbar />
    </Modal>

  );
}