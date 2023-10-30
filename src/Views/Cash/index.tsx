import React, { useState } from "react";
import "./index.css";

import { Header } from "../../Components/Header";

function Cash() {
  const [total, setTotal] = useState<string>("");
  const [oldTotal, setOldTotal] = useState<number>(0);
  const [cash, setCash] = useState<string>("");
  const [oldCash, setOldCash] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [change, setChange] = useState<
    { [key: number]: number } | string | null
  >(null);
  const [changeTotal, setChangeTotal] = useState<number>(0);
  const [error, setError] = useState<string>("");

  // Função para resetar os valores (exceto os valores antigos/old)
  const reset = (): void => {
    if (total !== "") {
      setTotal("");
    }

    if (cash !== "") {
      setCash("");
    }

    if (changeTotal !== 0) {
      setChangeTotal(0);
    }

    if (change) {
      setChange(null);
    }

    if (error !== "") {
      setError("");
    }
  };

  // Função para calcular troco
  const calculateChange = (): void => {
    reset();

    setLoading(true);

    const totalValue = Number(total);
    const cashValue = Number(cash);

    setOldCash(cashValue);
    setOldTotal(totalValue);

    if (isNaN(totalValue) || isNaN(cashValue)) {
      setError("Insira valores válidos");
      setLoading(false);
      return;
    }

    if (total === "" || cash === "") {
      setError("Insira o total e a quantia oferecida");
      setLoading(false);
      return;
    }

    const availableBanknotes: number[] = [100, 10, 1]; // Banknote denominations in descending order

    if (totalValue > cashValue) {
      setError("O dinheiro oferecido não foi o suficiente");
      setLoading(false);
      return;
    }

    let remainingChange: number = cashValue - totalValue;

    setChangeTotal(remainingChange);

    const change: { [key: number]: number } = {};

    for (const banknote of availableBanknotes) {
      const banknoteCount: number = Math.floor(remainingChange / banknote);

      if (banknoteCount > 0) {
        change[banknote] = banknoteCount;
        remainingChange -= banknote * banknoteCount;
      }
    }

    setChange(change);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-slate-800 w-full min-h-[89.1vh] md:px-[6rem] lg:max-lg:px-[10rem]">
        <div className="max-w-[700px]">
          <h1 className="mt-[3rem] text-[3rem] text-center text-slate-50">
            Troco inteligente
          </h1>

          <p className="mt-[0.75rem] text-[1.25rem] text-center text-slate-300">
            Digite abaixo o total da compra efetuada e o dinheiro oferecido para
            receber o troco da compra
          </p>
        </div>
        <div className="mt-[1.55rem] flex flex-wrap gap-4 justify-center items-end">
          <div className="flex flex-col">
            <label
              className="mt-[1.25rem] text-[1.45rem] text-center text-slate-300"
              htmlFor="max"
            >
              Total da compra
            </label>
            <input
              type="number"
              name="total"
              className="search-input border rounded-lg text-xl p-2 bg-slate-900
              text-slate-300 placeholder-slate-300 focus:outline-none"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mt-[1.25rem] text-[1.45rem] text-center text-slate-300"
              htmlFor="max"
            >
              Quantia oferecida
            </label>
            <input
              type="number"
              name="max"
              className="search-input border rounded-lg text-xl p-2 bg-slate-900
              text-slate-300 placeholder-slate-300 focus:outline-none"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />
          </div>
          <button
            className="py-2 px-4 bg-slate-400 text-slate-900 hover:bg-slate-900 hover:text-slate-400 underline-offset-4 hover:ease-in transition duration-150 ease-out text-[1.25rem] font-bold rounded-md ml-2"
            onClick={calculateChange}
          >
            {!loading ? "Calcular" : ". . ."}
          </button>
        </div>

        {change !== null && (
          <div className="flex justify-between my-[2rem] w-max">
            <div className="mr-4">
              <div className="flex justify-between">
                <h2 className="mr-4 w-max text-[1.45rem] text-center text-slate-300">
                  T. compra:
                </h2>
                <p className="text-[1.45rem] text-center text-slate-100">
                  {oldTotal}
                </p>
              </div>

              <div className="flex justify-between">
                <h2 className="mr-4 text-[1.45rem] text-center text-slate-300">
                  D. entregue:
                </h2>
                <p className="text-[1.45rem] text-center text-slate-100">
                  {oldCash}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2 ">
              <div className="flex items-end">
                <h2 className="mr-4 text-[1.45rem] text-center text-slate-300">
                  Notas <br /> trocadas:
                </h2>
                {typeof change === "string" ? (
                  <p>{change}</p>
                ) : (
                  <ul className="border-b-4 border-sky-500">
                    {Object.keys(change).map((banknote) => (
                      <li
                        className="text-[1.45rem] text-center text-slate-100"
                        key={banknote}
                      >
                        {banknote} x {change[parseInt(banknote)]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-between">
                <h2 className="text-[1.45rem] text-center text-slate-300">
                  Troco:
                </h2>
                <p className="text-[1.45rem] text-center text-slate-100">
                  {changeTotal}
                </p>
              </div>
            </div>
          </div>
        )}

        {error !== "" && (
          <p className="mt-4 text-[1.55rem] text-center text-slate-300">
            {error}
          </p>
        )}
      </div>
    </>
  );
}

export default Cash;
