import { PropsWithChildren, memo } from "react"
import ImageSingle from "./ImageSingle"

type Props = PropsWithChildren<{
    image: string
}>

const ImageIntervention = memo(({image,children}: Props) => {
  return <div className="col-lg-3 col-md-4 col-sm-6 col-12 border-1 p-3">
  <ImageSingle image={image} />
  {children}
</div>
})

export default ImageIntervention
