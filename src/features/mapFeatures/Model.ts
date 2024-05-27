export interface SearchListDevices {
    id: string;
    name: string;
    level: number;
    namelevel: string;
  }


export type LevelPosition = {
    map: {
        width: string,
        height: string,
        dataURL: string
    }
} 

export interface LevelDevices {
    id: string
    label: string
    position: {
        x: string,
        y: string
    }
}

export interface LevelMaps {
    level: number
    name: string
    positions: LevelPosition
    devices: LevelDevices[]
}