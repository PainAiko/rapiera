import { PropsWithChildren } from "react"
import { downloadImage } from "../../utils/genererPDF"
import { formatDateForRapport } from "../../utils/DateTime"


type Props = PropsWithChildren<{
    date: string,
    numIntervention: string,
    path: string
}>

function ListInterventionBo({date, numIntervention, path}: Props) {
  const genererPdf = () => {
    downloadImage(path, true, `rapport${date}.pdf`)
}
  return  <li className="p-0">
  <div className="rapport-item p-3 gap-5 d-flex justify-content-between flex-wrap hover:bg-primary hover:text-white">
    <div className="info">
      <div>
        Rapport d'intervention ({formatDateForRapport(date)})
      </div>
      <div>
        Numéro d'intervention :
        <strong className="font-bold">{numIntervention}</strong>
      </div>
    </div>
    <div className="action d-flex gap-5 align-items-center">
      <div>
        <a href={path} target="_blank"> <i className="fa-solid fa-eye"></i></a>
      </div>
      <div>
        <a onClick={genererPdf}>
          <i className="fa-solid fa-download"></i></a>
      </div>
    </div>
  </div>
</li>
}

export default ListInterventionBo
