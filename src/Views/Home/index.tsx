import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Number from "../../Assets/number.png";
import Vechile from "../../Assets/vechile.png";
import CEP from "../../Assets/cep.png";
import Cash from "../../Assets/cash.png";

function Home() {
  return (
    <div className="flex flex-col justify-evenly items-center bg-slate-800 min-w-[100vh] min-h-[100vh]">
      <div>
        <h1 className="text-[3rem] text-slate-50">
          Seja bem vindo ao meu teste!
        </h1>

        <p className="text-[1.25rem] text-slate-300 text-center">
          Abaixo estão o link para os desafios que foram propostos no projeto
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-12">
        <div className="p-4 rounded-lg hover:bg-slate-500 hover:ease-in transition duration-150 ease-out">
          <Link to="/number">
            <img src={Number} alt="Números" />
          </Link>
        </div>
        <div className="p-4 rounded-lg hover:bg-slate-500 hover:ease-in transition duration-150 ease-out">
          <Link to="/cep">
            <img src={CEP} alt="Números" />
          </Link>
        </div>
        <div className="p-4 rounded-lg hover:bg-slate-500 hover:ease-in transition duration-150 ease-out">
          <Link to="/cash">
            <img src={Cash} alt="Números" />
          </Link>
        </div>
        <div className="p-4 rounded-lg hover:bg-slate-500 hover:ease-in transition duration-150 ease-out">
          <Link to="/vechile">
            <img src={Vechile} alt="Números" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
