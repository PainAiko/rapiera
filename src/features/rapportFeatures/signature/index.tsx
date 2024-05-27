import SignatureCanvas from "react-signature-canvas";
import Modal from  "@widgets/modal/Modal";
import FooterModal from  "@widgets/modal/FooterModal";
import Button from  "@widgets/button/Button";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { hide } from  "@entities/rapport/signatureSlice";
import BodyModal from  "@widgets/modal/BodyModal";
import HeaderModal from  "@widgets/modal/HeaderModal";
import { useRef } from "react";
import { setSignature } from  "@entities/rapport/rapportSlice";

function Signature(): JSX.Element | null {
  const {showModal, type} = useAppSelector(state => state.signature)
  const dispatch = useAppDispatch();
  const theirSignature = useRef<SignatureCanvas>(null)
  const handleclick = () => {
    if(theirSignature.current) {
      dispatch(setSignature({type, data: theirSignature.current
        .getTrimmedCanvas()
        .toDataURL('image/png')}))
        dispatch(hide())
    }
  }
  const hideModal = () => {
    if (theirSignature.current) {
      theirSignature.current.clear();
    }
    dispatch(hide())
  };
  
  const clearSignature = () => {
    if (theirSignature.current) {
      theirSignature.current.clear();
    }
  };
  return showModal ? <Modal>
  <HeaderModal title="Signature">
  <span className="text-xl cursor-pointer relative left-48" onClick={hideModal}><i className="fa-solid fa-circle-xmark"></i></span>
  </HeaderModal>
  <BodyModal>
    <SignatureCanvas
      ref={theirSignature}
      penColor="black"
      canvasProps={{ width: 300, height: 500, className: 'sigCanvas' }}
    />
  </BodyModal>
  <FooterModal>
  <Button color="danger" onClick={clearSignature}>
      Effacer
    </Button>
    <Button color="primary" onClick={handleclick}>
      Confirmer
    </Button>
  </FooterModal>
</Modal> : null
}

export default Signature;
