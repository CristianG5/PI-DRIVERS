const axios = require ("axios")
const {Teams} = require("../db")

const createTeamsHandlers = (req, res)=>{
    res.status(200).send("Crear un equipo")
};

const getTeamsHandlers = async (req, res) => {
    try {
        const teamsApi = await axios.get(`http://localhost:5000/drivers/`);
        const drivers = teamsApi.data; // Obtiene el arreglo de objetos JSON

        // Obtener equipos únicos de todos los conductores
        const teams = drivers.map(driver => driver.teams)
                            .filter(team => team) // Filtrar equipos no definidos o vacíos
                            .flatMap(team => team.split(', '))
                            .filter((team, index, self) => self.indexOf(team) === index);

        // Crear o encontrar cada equipo en la base de datos
        for (let i = 0; i < teams.length; i++) {
            await Teams.findOrCreate({
                where: { name: teams[i] }
            });
        }

        // Obtener todos los equipos después de crear o encontrarlos
        const allTeams = await Teams.findAll();
        res.send(allTeams);
    } catch (error) {
        console.error("Error al obtener equipos:", error);
        res.status(500).send("Error interno del servidor");
    }
};

module.exports = {
    createTeamsHandlers,
    getTeamsHandlers
}