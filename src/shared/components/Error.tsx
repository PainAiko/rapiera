
function Error({error}: {error: string}) {
  return <div className="text-center bg-danger text-white p-2 br-xs">
  <div>{error}</div>
</div>
}

export default Error
