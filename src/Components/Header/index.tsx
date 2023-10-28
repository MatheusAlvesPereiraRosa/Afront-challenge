import React from "react";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-slate-900">
      <ul className="flex">
        <Link to="/">
          <li className="p-4 text-[1.5rem] text-white hover:bg-slate-200 hover:text-slate-900 hover:underline underline-offset-4 hover:ease-in transition duration-150 ease-out">
            Home
          </li>
        </Link>
        <Link to="/number">
          <li className="p-4 text-[1.5rem] text-white hover:bg-slate-200 hover:text-slate-900 hover:underline underline-offset-4 hover:ease-in transition duration-150 ease-out">
            Cálculo
          </li>
        </Link>
        <Link to="/">
          <li className="p-4 text-[1.5rem] text-white hover:bg-slate-200 hover:text-slate-900 hover:underline underline-offset-4 hover:ease-in transition duration-150 ease-out">
            CEP
          </li>
        </Link>
        <Link to="/">
          <li className="p-4 text-[1.5rem] text-white hover:bg-slate-200 hover:text-slate-900 hover:underline underline-offset-4 hover:ease-in transition duration-150 ease-out">
            Caixa
          </li>
        </Link>
        <Link to="/">
          <li className="p-4 text-[1.5rem] text-white hover:bg-slate-200 hover:text-slate-900 hover:underline underline-offset-4 hover:ease-in transition duration-150 ease-out">
            Veículos
          </li>
        </Link>
      </ul>
    </header>
  );
};
