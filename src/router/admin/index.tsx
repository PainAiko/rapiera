import Dashboard from "@pages/dashboardv2";
import ListeIntervention from "@pages/dashboardv2/pages/ListeIntervention/ListeIntervention";
import Rapport from "@pages/dashboardv2/pages/listeRapport/Rapport";
import User from "@pages/dashboardv2/pages/gestionUser/GestionUser"
import Prestataire from "@pages/dashboardv2/pages/gestionPrestataire/GestionPrestataire"
import ListInterventionTermier from "@pages/dashboardv2/pages/listInterventionTerniner/ListInterventionTermier";
import History from "@pages/dashboardv2/pages/log/History";
import NotificationCall from "@pages/dashboardv2/pages/notificationCall/NotificationCall";

export const BoRoute = [
  {
    path: "",
    element: <Dashboard />,
    children: [
      {
        path: "intervention",
        element: <ListeIntervention />
      },
      {
        path: "intervention-terminer",
        element: <ListInterventionTermier />
      },
      {
        path: "rapport",
        element: <Rapport />
      },
      {
        path: "gestion-user",
        element: <User />
      },
      {
        path: "gestion-prestataire",
        element: <Prestataire />
      },
      {
        path: "log",
        element: <History />
      },
      {
        path: "notification-call",
        element: <NotificationCall />
      }
    ]
  }
];
