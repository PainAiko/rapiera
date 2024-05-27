import { ChangeEvent, useEffect, useState } from 'react'

function useSearchDataTable<T>(data: T[]) {
const [filteredData, setFilteredData] = useState(data);

const searchInDataTable = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value; // Change variable name to avoid confusion
    if (searchValue) {
      setFilteredData(
        data.filter((item) => {
          return Object.values(item as any).some(
            (itemValue) => // Rename inner `value` to `itemValue` to differentiate it from `searchValue`
              typeof itemValue === 'string' && 
              itemValue.toLowerCase().includes(searchValue.toLowerCase())
          )
        })
      );
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    if(data.length > 0) {
      setFilteredData(data)
    } 
  }, [data])
  return {
    filteredData,
    searchInDataTable
  }
}

export default useSearchDataTable