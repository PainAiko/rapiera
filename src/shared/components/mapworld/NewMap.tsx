import { useAppDispatch } from "@app/hooks/App";
import { LevelDevices, LevelPosition } from "@features/mapFeatures/Model";
import { useZoomImage } from "@features/mapFeatures/hooks";
import { show } from "@features/mapFeatures/mapFeatureSlice";

type Props = {
  levelPosition: LevelPosition;
  devices: LevelDevices[];
};
function NewMap({ levelPosition, devices }: Props) {
  const dispatch = useAppDispatch();
  const { mapStyles } = useZoomImage({ levelPosition, devices });

  return (
    <>
      {" "}
      <div className="outer" style={mapStyles}>
        {devices.map((value, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                dispatch(show({ title: value.label, materielId: value.id }))
              }
              className="inner"
              style={{
                top: `${value.position.y}px`,
                left: `${value.position.x}px`,
              }}
            >
              <i className="fa-solid fa-sitemap"></i>
              <div className="name">{value.label}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default NewMap;
