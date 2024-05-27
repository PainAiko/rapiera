import { useState } from 'react'
import Modal from '@widgets/modal/Modal'
import HeaderModal from '@widgets/modal/HeaderModal'
import BodyModal from '@widgets/modal/BodyModal'
import FooterModal from '@widgets/modal/FooterModal'
import Button from '@widgets/button/Button'
import TextareaField from '@widgets/form/TextareaField'
// import ImageUploader from './imageUploader/ImageUploader'
import { useAppDispatch, useAppSelector } from '@app/hooks/App'
import { toggleComfirmationModal } from '@pages/Bo/admin/intervention/interventionSlice'

function InterventionModal() {
    const { comfiramationModal } = useAppSelector(state => state.interventionBo)
    const dispatch = useAppDispatch()
    const [rapport, setRapport] = useState("")
    const handleChange = (newValue: string) => {
        setRapport(newValue)
    }
  return comfiramationModal && <Modal>
    <HeaderModal title="compte rendu de l'intervention" />
    <BodyModal addClassName=''>
        <TextareaField label='Votre compte rendu' value={rapport} onChange={handleChange} />
        {/* <ImageUploader /> */}
    </BodyModal>
    <FooterModal>
    <Button
          textColor="white"
          color="danger"
          onClick={() => dispatch(toggleComfirmationModal())}
        >
          Annuler
        </Button>
    <Button
          textColor="white"
          color="blue"
        >
          confirmer
        </Button>
    </FooterModal>
  </Modal>
}

export default InterventionModal
