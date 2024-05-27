import { ChangeEvent, MutableRefObject } from 'react'

type Props = {
    acceptTypeFile: string;
    refInput: MutableRefObject<HTMLInputElement>
    caputre: boolean | "environment" | "user" | undefined
    onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void> | void
}

export default function Upload({acceptTypeFile, refInput, onChange, caputre}: Props) {
  return <input
  type="file"
  ref={refInput}
  accept={acceptTypeFile}
  capture={caputre}
  id="fileInput"
  className="hidden"
  onChange={onChange}
/>
}