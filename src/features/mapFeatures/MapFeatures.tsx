import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import Card from "@widgets/card/Card";
import CardBody from "@widgets/card/CardBody";
import Input from "@widgets/form/Input";
import Cardheader from "@widgets/card/CardHeader";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import NewMap from "@shared/components/mapworld/NewMap";
import { setLevelToShow } from "./mapFeatureSlice";
import { SearchListDevices } from "./Model";
import LoadingComponent from "@widgets/loading/LoadingComponent";

function MapFeatures() {
  const [searList, setSearchList] = useState<SearchListDevices[]>([]);
  const [showList, setShowList] = useState(false);
  const [searchAppareils, setSearchAppareils] = useState("");
  const { levelMaps, levelToShow, listSearch,actualLevel } = useAppSelector(
    (state) => state.mapAppareil
  );
  const dispatch = useAppDispatch();
  const handleChangeMap = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setShowList(true);
      setSearchAppareils(e.target.value);
      setSearchList(listSearch.filter((device) => device.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())));
      return;
    }
    setShowList(false);
    dispatch(setLevelToShow({level:actualLevel}));
    setSearchAppareils("");
    setSearchList(listSearch)
  };
  const handleClick = (level: number, deviceName: string, deviceId: string) => {
    dispatch(setLevelToShow({level, id: deviceId}));
    setShowList(false);
    setSearchAppareils(deviceName);
  };
  useEffect(() => {
    if (levelMaps.length > 0 && listSearch.length > 0) {
      setSearchList(listSearch);
      dispatch(setLevelToShow({level:actualLevel}));
    }
  }, [levelMaps.length, listSearch.length]);
  return (
    <>
      <Card>
        <Cardheader title="Carte pour vous repérer">
          <h3 className="text-danger">
            Merci de sélectionner le ou les appareils sur lesquels vous
            intervenez
          </h3>
        </Cardheader>
        <CardBody>
          <Input>
            <input
              type="text"
              value={searchAppareils}
              onChange={handleChangeMap}
              placeholder="Rechercher un appareil"
            />
          </Input>
          {showList && (
            <div className="pg-home-dash">
              <ul className="wfx-list-collapse">
                {searList?.map((device, index) => (
                  <li
                    key={index}
                    onClick={() => handleClick(device.level, device.name, device.id)}
                  >
                    {device.name} ({device.namelevel})
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="map-content border-1 p-3 mb-4">
            {levelToShow ? (
              <NewMap
                levelPosition={levelToShow.positions}
                devices={levelToShow.devices}
              />
            ) : <LoadingComponent />}
          </div>
          <div className="p-2 text-green font-semibold">
            Vous ne trouvez pas l'équipement sur la map? Ou bien vous n'avez pas
            changé d'équipement?
          </div>
          <Link
            to="/intervention/supplementaire"
            className="wfx-btn wfx-btn-green text-white"
          >
            Ajouter des photos supplémentaires
          </Link>
        </CardBody>
      </Card>
    </>
  );
}

export default MapFeatures;
