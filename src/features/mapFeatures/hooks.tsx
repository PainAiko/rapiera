import { useAppSelector } from "@app/hooks/App";
import { useEffect, useState } from "react";
import { LevelDevices, LevelPosition } from "./Model";
type Props = {
  levelPosition: LevelPosition;
  devices: LevelDevices[];
};
export const useZoomImage = ({ levelPosition, devices }: Props) => {
  const { deviceSearch } = useAppSelector((state) => state.mapAppareil);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [centerPosition, setCenterPosition] = useState({ x: 0, y: 0 });
  const [mapStyles, setMapStyles] = useState<Record<string, string>>({
    transition: "transform 0.5s",
    transformOrigin: "top left",
  });

  const handleZoomReset = () => {
    setZoomLevel(1);
    setCenterPosition({ x: 0, y: 0 });
  };

  const centerOnDevice = (
    deviceX: number,
    deviceY: number,
    width: number,
    height: number
  ) => {
    const newZoomLevel = 2; // Facteur de zoom dédié pour mettre en évidence l'appareil

    // Centrer l'appareil sélectionné
    const offsetX = -(deviceX * newZoomLevel) + width / 2;
    const offsetY = -(deviceY * newZoomLevel) + height / 2;

    return {
      x: offsetX / newZoomLevel - 50,
      y: offsetY / newZoomLevel - 50,
    };
  };

  useEffect(() => {
    handleZoomReset();
  }, [levelPosition.map.dataURL]);

  useEffect(() => {
    if (deviceSearch) {
      const device = devices.find((d) => d.id === deviceSearch);
      if (device) {
        const { x, y } = centerOnDevice(
          +device.position.x,
          +device.position.y,
          +levelPosition.map.width,
          +levelPosition.map.height
        );

        setMapStyles({
          ...mapStyles,
          width: `${+levelPosition.map.width * zoomLevel}px`,
          height: `${+levelPosition.map.height * zoomLevel}px`,
          backgroundImage: `url(${levelPosition.map.dataURL})`,
          transform: `scale(${zoomLevel}) translate(${x}px, ${y}px)`,
        });
      }
    } else {
      handleZoomReset();
      setMapStyles({
        transition: "transform 0.5s",
        transformOrigin: "top left",
        width: `${+levelPosition.map.width * zoomLevel}px`,
        height: `${+levelPosition.map.height * zoomLevel}px`,
        backgroundImage: `url(${levelPosition.map.dataURL})`,
      });
    }
  }, [
    deviceSearch,
    devices,
    centerPosition.x,
    centerPosition.y,
    zoomLevel,
    levelPosition.map.width,
    levelPosition.map.height,
  ]);

  return {
    mapStyles,
  };
};
