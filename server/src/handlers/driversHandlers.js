const { getDriverById, getAllDrivers } = require("../controllers/driversControllers");
const {Driver, Teams} = require("../db")

const getDriversHandler = async (req, res) => {
    const name = req.query.name;
    try {
        let driversTotal = await getAllDrivers(); // Llamar a la función getAllDrivers correctamente
        if (name) {
            let driversName = driversTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            driversName.length ?
                res.status(200).send(driversName) :
                res.status(404).send("No se encontró ningún piloto con ese nombre.");
        } else {
            res.status(200).send(driversTotal);
        }
    } catch (error) {
        res.status(500).send("Error al obtener los pilotos: " + error.message);
    }
};



//
const createDriversHandler = async (req, res) => {
    const {
        name,
        surname,
        description,
        image,
        nationality,
        birthdate,
        teams
    } = req.body;

    try {
        // Crear el conductor
        const driverCreated = await Driver.create({
            name,
            surname,
            description,
            image,
            nationality,
            birthdate
        });

        // Buscar los equipos en la base de datos
        const teamsDb = await Teams.findAll({
            where: { name: teams }
        });

        // Agregar el conductor a los equipos encontrados
        await driverCreated.addTeams(teamsDb);

        res.send("Creado con éxito");
    } catch (error) {
        console.error("Error al crear el conductor:", error);
        res.status(500).send("Error interno del servidor");
    }
};

const getDetailHandler = async (req, res) => {
    const id = req.params.id;
    const driversTotal = await getAllDrivers(); // Esperar a que se resuelva la promesa

    if (id) {
        const driversId = await driversTotal.filter(el => el.id == id);
        driversId.length?
            res.status(200).send(driversId) :
            res.status(404).send("No se encontró al piloto");
    }
};

//
// const getDetailHandler = async (req, res)=>{
//     const {id} = req.params

//     const source = isNaN(id)?"bdd" : "api"

//     try {
//         const response = await getDriverById(id, source)
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
//     //res.status(200).send(`Detalle del conductor ${id}`)
// };

// const createDriversHandler = async (req, res)=>{
//     const {name, surname, description, image, nacionality, brithday} = req.body;
//     try {
//         const response = await createDriversDB(name, surname, description, image, nacionality, brithday)
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
//     //res.status(200).send(`Usuario ${name} creado`);
// };

module.exports = {
    getDriversHandler,
    getDetailHandler,
    createDriversHandler
}