import React, { useState } from "react";
import "./index.css";

import { Header } from "../../Components/Header";

function Cash() {
  const [total, setTotal] = useState<string>("");
  const [cash, setCash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [change, setChange] = useState<
    { [key: number]: number } | string | null
  >(null);

  const calculateChange = (): void => {
    setLoading(true);

    const totalValue = Number(total);
    const cashValue = Number(cash);

    if (isNaN(totalValue) || isNaN(cashValue)) {
      setChange("Invalid input. Please enter valid numbers.");
      setLoading(false);
      return;
    }

    const availableBanknotes: number[] = [100, 10, 1]; // Banknote denominations in descending order

    if (total > cash) {
      setChange("Not enough cash provided");
      setLoading(false);
      return;
    }

    let remainingChange: number = cashValue - totalValue;
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
      <div className="flex flex-col items-center bg-slate-800 w-full min-h-[89.1vh] px-[10rem]">
        <div className="max-w-[700px]">
          <h1 className="mt-[3rem] text-[3rem] text-center text-slate-50">
            Troco inteligente
          </h1>

          <p className="mt-[1.25rem] text-[1.25rem] text-center text-slate-300">
            Digite abaixo o total da compra efetuada e o dinheiro oferecido para
            receber o troco da compra
          </p>
        </div>
        <div className="mt-[3rem] flex content-between items-end">
          <div className="flex flex-col mr-4">
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
            className="py-2 px-4 bg-slate-400 text-slate-900 hover:bg-slate-900 hover:text-slate-400 underline-offset-4 hover:ease-in transition duration-150 ease-out text-[1.25rem] font-bold rounded-md ml-6"
            onClick={calculateChange}
          >
            {!loading ? "Calcular" : ". . ."}
          </button>
        </div>

        {change !== null && (
          <div>
            <h2>Change to be returned:</h2>
            {typeof change === "string" ? (
              <p>{change}</p>
            ) : (
              <ul>
                {Object.keys(change).map((banknote) => (
                  <li key={banknote}>
                    {banknote} x {change[banknote]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Cash;
