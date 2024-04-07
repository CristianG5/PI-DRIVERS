const axios = require(`axios`)
const {Driver, Teams} = require(`../db`);


// const createDriversDB = async (name, surname, description, image, nacionality, brithday) =>{

//     //const newDriver = 
//     return await Driver.create({name, surname, description, image, nacionality, brithday})
//     //return newDriver
// }

//TRAER INFO DE LA API
const getApiInfo = async () => {
    const apiUrl = await axios.get(`http://localhost:5000/drivers/`);
    const apiData = apiUrl.data;
    const apiInfo = apiData.map(el => {
        return {
            id: el.id,
            name: el.name ? (el.name.forename + " " + el.name.surname) : "", // Verifica si el.name no es nulo
            description: el.description, 
            image: el.image, 
            nationality: el.nationality, 
            birthday: el.dob,
            teams: el.teams
        }
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Driver.findAll({
        include: {
            model: Teams,
            attributes: ['name'], // Corrige la sintaxis para especificar los atributos
            through: {
                attributes: [],
            }
        }
    });
}

const getAllDrivers = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo); // Asegúrate de que apiInfo y dbInfo sean arrays
    return infoTotal;
}


//
// const getDriverById = async (id, source) => {
//     const driver = source === "api" ? 
//         (await axios.get(`http://localhost:5000/drivers/${id}`)).data :
//         await Driver.findByPk(id); // Utiliza findByPk en lugar de finByPk

//     return driver;

// }

module.exports = {
    //getDriverById,
    getAllDrivers,
};