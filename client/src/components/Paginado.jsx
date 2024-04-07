import React from "react";

export default function Paginado({ driversPerPage, allDrivers, paginado }) {
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allDrivers / driversPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul className="paginado" style={{ listStyleType: 'none', padding: 0 }}>
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li className="number" key={number} style={{ display: 'inline-block', margin: '0 5px' }}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
