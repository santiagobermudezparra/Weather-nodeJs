
const axios = require('axios');
require('dotenv').config();



class Busquedas {
    historial = ['a', 'b', 'c'];

    constructor() {
        //TODO : leer DB
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
    
            const resp= await instance.get();
            return resp.data.features.map( lugar => ({
                id : lugar.id,
                nombre : lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
            
        } catch (error) {
            console.log(error);
        }
        

    }

    async climaLugar(lat, lon ){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    'appid' : process.env.OPENWEATHER_KEY,
                    'units' : 'metric'
                }
            })
            const resp = await instance.get();
            
            return {
                min: resp.data.main.temp_min,
                max:  resp.data.main.temp_max,
                temp:  resp.data.main.temp,
                des : resp.data.weather[0].description
            }

        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = Busquedas;