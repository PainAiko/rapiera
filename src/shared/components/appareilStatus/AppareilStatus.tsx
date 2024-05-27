import deviceState from "../../assets/images/etat-appareils.png"
function AppareilStatus() {
  return <div className="wfx-card">
  <div className="wfx-card__header">
    <h2>Etat des appareils sur site</h2>
  </div>
  <div className="wfx-card__content">
    <img src={deviceState} alt="..." className="w-full h-full" />
  </div>
</div>
}

export default AppareilStatus
