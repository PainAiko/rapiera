import NotificationCallFeatures from "@features/notificationCallFeatures/NotificationCallFeatures";
import PageLayout from "@widgets/Bov2/PageLayout";

type Props = {}

export default function NotificationCall({}: Props) {
  return  (
    <PageLayout title="Les appels du jour">
      <NotificationCallFeatures />
    </PageLayout>
  );
}