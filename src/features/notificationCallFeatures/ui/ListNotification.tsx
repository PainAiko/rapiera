import { PROFIL_DEFAULT_IMAGE } from "@shared/utils/const";
import Button from "@widgets/button/Button";
import moment from "moment";

type Props = {
  userName: string;
  timeStamp: string;
  meetLink: string;
};

export default function ListNotification({
  userName,
  timeStamp,
  meetLink,
}: Props) {
  const joinMeet = () => {
    open(meetLink, "_blank");
  };
  return (
    <div className="d-flex align-items-center justify-content-between bg-white p-4 border-b border-gray-200">
      <div className="d-flex align-items-center">
        <img
          className="h-8 w-8 rounded-full"
          src={PROFIL_DEFAULT_IMAGE}
          alt="Profile"
        />
        <div className="ml-4">
          <div className="font-medium text-gray-900">
            <strong>{userName}</strong> a commencé une nouvelle réunion.
          </div>
          <div className="text-sm text-gray-500">
            {moment(timeStamp).fromNow()}
          </div>
        </div>
      </div>
      <div className="ml-4">
        <Button color="primary" textColor="white" onClick={joinMeet}>
          rejoindre
        </Button>
      </div>
    </div>
  );
}
