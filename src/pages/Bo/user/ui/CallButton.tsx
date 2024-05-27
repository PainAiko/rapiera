import { sendNotificationForMeet } from '@shared/config/API/CONST'
import { getUserConnectedId } from '@shared/utils/getToken'
import Button from '@widgets/button/Button'

type Props = {
  meetLink: string
}

export default function CallButton({meetLink}: Props) {
  const doAMeet = () => {
    sendNotificationForMeet({meetLink, technicianId: +getUserConnectedId()})
    open(meetLink, "_blank")
  }
  return <Button color="primary" textColor="white" onClick={doAMeet} >
  Faire une réunion
</Button>
}