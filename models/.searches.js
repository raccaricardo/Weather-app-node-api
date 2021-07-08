const axios = require("axios");
const { readData } = require("../helpers/fileHandler");
require('dotenv').config();
require('colors');

 

class Searches {

  _searchHistory = [];

  constructor(/*city = '' */) {
    //TODO: read db if exist
    this._searchHistory = readData() || [];
  }

  set addHistoryCity(city) {
     this._searchHistory.push(city);
  }

  get searchHistory() {

    if ( this._searchHistory===[] ){
      return false;
    }else{
      return this._searchHistory;
    }
  }

  get paramsMapBox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es',
    };
  }
  // get paramsOpenWeather(lng, lat){
  //   return{
  //     'appid': process.env.OPENWEATHER_KEY,
  //     'lang': 'es',
  //     'units': 'metric',
  //     'lat':lat,
  //     'lon': lng      
  //   };
  // }
  async city(place = "") {
  //   //http petition
     try {
      
      let cities = [];
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });
      const { data }  = await instance.get();
      
      const { features } = data;
      // console.log({features});
      
      return features.map( place => ({

        id: place.id, 
        name: place.place_name_es,
        lng: place.center[0],
        lat: place.center[1],
      }))
      
    } catch (error) {;
      console.clear();
      console.error('Hubo un error al conectar \n \n \n \n',error);
      return [];
    }
 
  }

  async searchWeather( lat = 0, lon = 0 ){
    
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params:{
          'appid': process.env.OPENWEATHER_KEY,
          'lang': 'es',
          'units': 'metric',
          'lat':lat,
          'lon': lon      
        }
      }) 
      const { data } = await instance.get();
      const { weather, main} = data;
      console.clear();
      console.log(data);      
      console.log('fin del comunicado');
      // const {temp, feels_like} = main;
      const { temp, feels_like: realFeel, temp_min: tempMin, temp_max: tempMax, humidity } = main;
      // return {
      //   description: weather.description,
      //   temp: main.temp,
      //   realFeel: main.feels_like,
      //   temp_min:
      // };
      console.log({ temp, realFeel, tempMin, tempMax, humidity })
      return {
        description: weather.description,
        temp,
        realFeel,
        tempMin,
        tempMax,
        humidity
      };
    } catch (error) {
      console.clear();
      console.error( "No se pudo conectar con OpenWeather \n \n ", error);
      return [];
    }
  }
}

module.exports = Searches;
