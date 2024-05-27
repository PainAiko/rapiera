import Resizer from "react-image-file-resizer";
import { ImageConfig } from "./const";

export const compressFile = (file: File) => {{
       return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            ImageConfig.maxWidth,
            ImageConfig.maxHeight,
            ImageConfig.type,
            ImageConfig.quality,
            ImageConfig.rotation,
            (uri) => {
                resolve(uri)
            },
            ImageConfig.output,
        )
       })
    }
}