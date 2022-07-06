const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();
const main = async() => {
    let opt;
    const busquedas = new Busquedas();

    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //mostrar mensaje
    

                const termino = await leerInput('Ciudad:');
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                if(id === '0') break;
                const {nombre, lat, lng} = lugares.find(l => l.id === id);
                
                //const clima 
                const {min,temp,des, max} = await busquedas.climaLugar(lat,lng);
                console.log('\ninformacion de la ciudad\n'.green);
                console.log(`Ciudad: ${nombre}`);
                console.log(`Lat: ${lat}`);
                console.log(`Long: ${lng}`);
                console.log(`Temp: ${temp}`);
                console.log(`Minima: ${min} `);
                console.log(`Maxima: ${max}`);
                console.log(`Descripcion :  ${des}`);
                break;
        
            
        }

        if(opt !== 0 ) await pausa();
        

    } while (opt !== 0);
}
main();