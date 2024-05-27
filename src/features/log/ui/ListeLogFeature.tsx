
type Props = {
    value: string,
}

export default function ListeLogFeature({value}: Props) {
  return  <li className="bg-white p-3 d-flex align-items-center">
  <i className="fa-solid fa-circle-info text-2xl text-primary m-2"></i>
  {value}
</li>
}