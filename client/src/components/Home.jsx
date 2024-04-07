import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Cards"; 
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.drivers);
  const [currentPage, setCurrentPage] = useState(1)
  const [driversPerePage, setDriversPerPage] = useState(15)
  const indexOfLasDriver = currentPage * driversPerePage
  const indexOfFirstDriver = indexOfLasDriver - driversPerePage
  const currentDrivers = allDrivers.slice(indexOfFirstDriver, indexOfLasDriver)

const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
}

useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDrivers());
  }

  return (
    <div>
      <Link to="/">Crear Conductor</Link> {/* Asumiendo que este es el enlace para crear un conductor */}
      <h1>FORMULA 1</h1>
      <button onClick={(e) => handleClick(e)}>
        Todos los Conductores
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente</option>
          <option value="fn">Fecha Nacimiento</option>
        </select>

        <select>
          <option value="All">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Existente</option>
        </select>

        <Paginado 
            driversPerPage={driversPerePage}
            allDrivers={allDrivers.length}
            paginado={paginado}
        />

        {currentDrivers?.map((c) => {
          return (
            <Fragment key={c.id}>
              <Link to={"/home/" + c.id}>
                <Card name={c.name} image={c.image} teams={c.teams}></Card>
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

        

      
        
