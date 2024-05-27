import Swal, { SweetAlertIcon } from "sweetalert2";

export const popup = (icontype: SweetAlertIcon, message: string, timer: number = 1500, position: "left" | "right" = "right" ) => {
    Swal.fire({
        toast: true,
        title: message,
        timer: timer,
        icon: icontype,
        position: position === "right" ? "top-right" : "bottom-left",
        showConfirmButton: false
      });
}

export const askForJoinCall = (message: string, meetLink: string, resolve: () => void, reject: () => void) => {
  Swal.fire({
      text: message,
      confirmButtonText: "Oui",
      denyButtonText: "Non",
      position: "center",
      showDenyButton: true,
      reverseButtons: true,
      denyButtonColor: "red",
      confirmButtonColor: "purple",
      iconHtml: '<i class="fas fa-bell"></i>'
    }).then(async (result) => {
      if (result.isConfirmed) {
        open(meetLink, "_blank")
        resolve()
      }else if(result.isDenied) {
        reject()
      }
    });
}