import React, { useState } from "react";
import "./index.css";

import { Header } from "../../Components/Header";

function Number() {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number[]>([]);

  const isPalindrome = (number: number): boolean => {
    const numberStr = number.toString();
    const length = numberStr.length;

    // Checando apenas até metade do intervalo informado
    for (let i = 0; i < Math.floor(length / 2); i++) {
      if (numberStr[i] !== numberStr[length - 1 - i]) {
        return false;
      }
    }

    return true;
  };

  const calculatePalindromicNumbers = () => {
    setLoading(true);
    const minNumber = Math.max(parseInt(min), 1); // Confirmando que o mínimo tem pelo menos até o valor 1
    const maxNumber = parseInt(max);
    const palindromicNumbers: number[] = [];

    for (let i = minNumber; i <= maxNumber; i++) {
      if (i < 10 || isPalindrome(i)) {
        palindromicNumbers.push(i);
      }
    }

    setLoading(false);
    setResult(palindromicNumbers);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-slate-800 w-full min-h-[89.1vh] px-[10rem]">
        <div className="max-w-[700px]">
          <h1 className="mt-[3rem] text-[3rem] text-center text-slate-50">
            Números palíndromos
          </h1>

          <p className="mt-[1.25rem] text-[1.25rem] text-center text-slate-300">
            Digite abaixo o mínimo e o máxima de uma sequência de números para
            serem mostrados todos os números palíndromos dessa sequência
          </p>
        </div>
        <div className="mt-[3rem] flex content-between items-end">
          <div className="flex flex-col mr-4">
            <label
              className="mt-[1.25rem] text-[1.45rem] text-center text-slate-300"
              htmlFor="min"
            >
              Mínimo
            </label>
            <input
              type="number"
              name="min"
              className="search-input border rounded-lg text-xl p-2 bg-slate-900 text-slate-300 placeholder-slate-300 focus:outline-none"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mt-[1.25rem] text-[1.45rem] text-center text-slate-300"
              htmlFor="max"
            >
              Máximo
            </label>
            <input
              type="number"
              name="max"
              className="search-input border rounded-lg text-xl p-2 bg-slate-900 text-slate-300 placeholder-slate-300 focus:outline-none"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>

          <button
            className="py-2 px-4 bg-slate-400 text-slate-900 hover:bg-slate-900 hover:text-slate-400 underline-offset-4 hover:ease-in transition duration-150 ease-out text-[1.25rem] font-bold rounded-md ml-6"
            onClick={calculatePalindromicNumbers}
          >
            {!loading ? "Calcular" : ". . ."}
          </button>
        </div>

        {result.length !== 0 && (
          <div className="mt-[2rem]">
            <h2 className="text-[1.85rem] text-white text-center">
              Números palíndromes de {min} até {max}
            </h2>
            <ul className="flex flex-wrap gap-6 my-4">
              {result.map((number, index) => (
                <li
                  className="p-2 text-[1.25rem] rounded-lg bg-teal-800 text-white hover:bg-white hover:text-teal-800 hover:underline underline-offset-4 hover:ease-in transition duration-150 ease-out"
                  key={index}
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Number;
