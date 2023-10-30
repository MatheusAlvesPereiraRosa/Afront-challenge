import React, { useState } from "react";
import "./index.css";
import axios from "axios";

import { Header } from "../../Components/Header";

interface LocationData {
  localidade: string;
  uf: string;
  bairro: string;
  logradouro: string;
  complemento: string;
  ddd: string;

  // Add more fields as needed based on the API response
}

function CEP() {
  const [locationIDs, setLocationIDs] = useState(["", "", "", "", ""]);
  const [locationData, setLocationData] = useState<LocationData[]>([]);

  const fetchLocationData = async (locationID: string) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${locationID}/json/`,
      );
      const data: LocationData = response.data;
      setLocationData((prevData) => [...prevData, data]);
    } catch (error) {
      console.error(`Error fetching data for ${locationID}: ${error}`);
    }
  };

  const handleLocationIDChange = (index: number, value: string) => {
    const updatedLocationIDs = [...locationIDs];
    updatedLocationIDs[index] = value;
    setLocationIDs(updatedLocationIDs);
  };

  const handleFetchLocationData = () => {
    setLocationData([]); // Clear the existing data
    locationIDs.forEach((locationID) => {
      if (locationID) {
        fetchLocationData(locationID);
      }
    });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-slate-800 w-full min-h-[89.1vh] sm:px-[2rem] md:px-[6rem] lg:px-[10rem]">
        <div className="max-w-[700px]">
          <h1 className="mt-[3rem] text-[3rem] text-center text-slate-50">
            Localizador de CEPS
          </h1>

          <p className="mt-[0.75rem] text-[1.25rem] text-center text-slate-300">
            Insira as informações 5 CEPs abaixo e veja as informações dos locais
            informados
          </p>
        </div>
        <div className="mt-[1.55rem] flex flex-wrap gap-4 justify-evenly">
          {locationIDs.map((value, index) => (
            <div className="flex flex-col" key={index}>
              <label className=" text-[1.45rem] text-center text-slate-300">
                CEP - {index + 1}
              </label>
              <input
                type="text"
                placeholder="Location ID"
                className="search-input border rounded-lg text-xl p-2 bg-slate-900 text-slate-300 placeholder-slate-300 focus:outline-none"
                value={value}
                onChange={(e) => handleLocationIDChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            className="py-2 px-4 bg-slate-400 text-slate-900 hover:bg-slate-900 hover:text-slate-400 underline-offset-4 hover:ease-in transition duration-150 ease-out text-[1.25rem] font-bold rounded-md"
            onClick={handleFetchLocationData}
          >
            Fetch Location Data
          </button>
        </div>

        {locationData.length > 0 && (
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 max-sm:grid-cols-2  gap-4 my-16">
            {locationData.map((data, index) => (
              <div className="p-4 bg-slate-400 rounded-lg" key={index}>
                <p className="text-slate-900 font-bold text-xl">
                  CEP:{" "}
                  <span className="text-slate-700 font-bold text-lg">
                    {locationIDs[index]}
                  </span>
                </p>
                <p className="text-slate-900 font-bold text-lg">
                  Estado:{" "}
                  <span className="text-slate-700 font-bold text-lg">
                    {data.uf}
                  </span>
                </p>
                <p className="text-slate-900 font-bold text-xl">
                  Cidade:{" "}
                  <span className="text-slate-700 font-bold text-lg">
                    {data.localidade}
                  </span>
                </p>
                {data.logradouro && (
                  <p className="text-slate-900 font-bold text-xl">
                    Logradouro:{" "}
                    <span className="text-slate-700 font-bold text-lg">
                      {data.logradouro}
                    </span>
                  </p>
                )}

                {data.complemento && (
                  <p className="text-slate-900 font-bold text-xl">
                    Complemento:{" "}
                    <span className="text-slate-700 font-bold text-lg">
                      {data.complemento}
                    </span>
                  </p>
                )}

                {data.bairro && (
                  <p className="text-slate-900 font-bold text-xl">
                    Bairro:{" "}
                    <span className="text-slate-700 font-bold text-lg">
                      {data.localidade}
                    </span>
                  </p>
                )}

                {data.ddd && (
                  <p className="text-slate-900 font-bold text-lg">
                    DDD:{" "}
                    <span className="text-slate-700 font-bold text-lg">
                      {data.ddd}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CEP;
