import React from "react";


export default function Card({name, image, teams}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{teams}</h5>
             <img src={image.url} alt="img not found" width="220px" height="250"/>
        </div>
    )
}