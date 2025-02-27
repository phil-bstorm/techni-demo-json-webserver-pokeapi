const axios = require('axios');

const main = async () => {
    console.log("Debut du programme.")

    let id = 10;

    let pokemon = null;
    try {
        // regarder si je ne possede déjà pas le pokemon avec l'ID dans mon json-server
        const response = await axios.get("http://localhost:3000/pokemons/" + id);
        pokemon = response.data;
    } catch (e) {
        // ne rien faire
        console.log(e.status);
    }

    if (!pokemon) {
        // chercher dans la poke api
        let pokemonInsert = null;
        try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
            pokemonInsert = response.data;
        } catch (e) {
            console.log("Il y a un probleme avec la pokepai");
            return;
        }

        try {
            await axios.post("http://localhost:3000/pokemons", {
                id: pokemonInsert.id,
                name: pokemonInsert.name
            })
        } catch (e) {
            console.log(e.status);
            return;
        }
    } else {
        console.log("exist déja", pokemon);
    }

    console.log("Fin du programme");
};

main();