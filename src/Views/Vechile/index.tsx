import React, { useState } from "react";
import "./index.css";
import axios from "axios";

import { Header } from "../../Components/Header";

interface Vehicle {
  Type: string; // Valor para diferenciar de qual tipo é o veículo
  Model: string;
  FabricYear: string;
  Brand: string;
}

class Car implements Vehicle {
  Type: string;
  Doors = 2 | 4;
  Model: string;
  FabricYear: string;
  Brand: string;

  constructor(
    Type: string,
    Doors: 2 | 4,
    Model: string,
    FabricYear: string,
    Brand: string,
  ) {
    this.Type = Type;
    this.Doors = Doors;
    this.Model = Model;
    this.FabricYear = FabricYear;
    this.Brand = Brand;
  }
}

class Bike implements Vehicle {
  Type: string;
  Wheels = 2;
  Passengers = 1 | 2;
  Model: string;
  FabricYear: string;
  Brand: string;

  constructor(Type: string, Model: string, FabricYear: string, Brand: string) {
    this.Type = Type;
    this.Model = Model;
    this.FabricYear = FabricYear;
    this.Brand = Brand;
  }
}

function Vechile() {
  const [type, setType] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [fabricYear, setFabricYear] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [doors, setDoors] = useState<2 | 4>(2);
  const [passengers, setPassengers] = useState<1 | 2>(1);
  //const [error, setError] = useState<string>("");

  const saveVehicles = () => {
    // Criando objeto do veículo

    if (type === "Car") {
      const newVehicle = {
        Type: type,
        Model: model,
        FabricYear: fabricYear,
        Brand: brand,
        Doors: doors,
      };

      axios
        .post("http://localhost:5000/save-vehicle", newVehicle, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Vehicle saved:", response.data);
          // Optionally, you can clear the form fields here
          setModel("");
          setFabricYear("");
          setBrand("");
          setDoors(2);
          setPassengers(2);
        })
        .catch((error) => {
          console.error("Failed to save vehicle:", error);
        });
    } else {
      const newVehicle = {
        Type: type,
        Model: model,
        FabricYear: fabricYear,
        Brand: brand,
        Wheels: 2,
        Passengers: passengers,
      };

      axios
        .post("http://localhost:5000/save-vehicle", newVehicle, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Vehicle saved:", response.data);
          // Optionally, you can clear the form fields here
          setModel("");
          setFabricYear("");
          setBrand("");
          setDoors(2);
          setPassengers(2);
        })
        .catch((error) => {
          console.error("Failed to save vehicle:", error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-slate-800 w-full min-h-[89.1vh] px-[10rem]">
        <div className="max-w-[700px]">
          <h1 className="mt-[3rem] text-[3rem] text-center text-slate-50">
            Gerenciamento de veículos
          </h1>

          <p className="mt-[0.75rem] text-[1.25rem] text-center text-slate-300">
            Insira as informações de seus veículos abaixo para salvá-las
          </p>
        </div>
        <div className="mt-[1.55rem] flex flex-wrap gap-4 content-between">
          <div className="flex flex-col ">
            <label className=" text-[1.45rem] text-center text-slate-300">
              Veículo
            </label>
            <select
              value={type}
              className="select-input border rounded-lg p-2 text-xl font-sans font-normal text-gray-700 bg-slate-900"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Selecione o veículo</option>
              <option value="Car">Carro</option>
              <option value="Bike">Moto</option>
            </select>
          </div>
          <div className="flex flex-col ">
            <label className=" text-[1.45rem] text-center text-slate-300">
              Modelo:
            </label>
            <input
              type="text"
              className="search-input border rounded-lg text-xl p-2 bg-slate-900
              text-slate-300 placeholder-slate-300 focus:outline-none"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="flex flex-col ">
            <label className=" text-[1.45rem] text-center text-slate-300">
              Ano de fabricação:
            </label>
            <input
              type="text"
              className="search-input border rounded-lg text-xl p-2 bg-slate-900
              text-slate-300 placeholder-slate-300 focus:outline-none"
              value={fabricYear}
              onChange={(e) => setFabricYear(e.target.value)}
            />
          </div>
          <div className="flex flex-col ">
            <label className=" text-[1.45rem] text-center text-slate-300">
              Marca:
            </label>
            <input
              type="text"
              className="search-input border rounded-lg text-xl p-2 bg-slate-900
              text-slate-300 placeholder-slate-300 focus:outline-none"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          {type !== "Bike" && (
            <div className="flex flex-col ">
              <label className=" text-[1.45rem] text-center text-slate-300">
                Portas:
              </label>
              <select
                value={doors}
                className="select-input w-20 border rounded-lg p-2 text-center text-xl font-sans font-normal text-gray-700 bg-slate-900"
                onChange={(e) => setDoors(parseInt(e.target.value) as 2 | 4)}
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
              </select>
            </div>
          )}

          {type === "Bike" && (
            <div className="flex flex-col ">
              <label className=" text-[1.45rem] text-center text-slate-300">
                Passageiros:
              </label>
              <select
                value={passengers}
                className="select-input w-20 border rounded-lg p-2 text-center text-xl font-sans font-normal text-gray-700 bg-slate-900"
                onChange={(e) =>
                  setPassengers(parseInt(e.target.value) as 1 | 2)
                }
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
          )}

          <div className="mt-auto">
            <button
              className="py-2 px-4 bg-slate-400 text-slate-900 hover:bg-slate-900 hover:text-slate-400 underline-offset-4 hover:ease-in transition duration-150 ease-out text-[1.25rem] font-bold rounded-md"
              onClick={saveVehicles}
            >
              Adicionar veículo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vechile;
