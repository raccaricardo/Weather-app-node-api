const axios = require("axios");
require('dotenv').config();
require('colors');


const { getChoice } = require("../helpers/inquirer");

class Searches {

  _searchHistory = [];

  constructor(/*city = '' */) {
    //TODO: read db if exist
    // this._searchHistory = [];
  }

  set addHistoryCity(city) {
    console.log("addHistory, city = ", city);
    this._searchHistory.push(city);
  }

  get searchHistory() {
    return this._searchHistory;
  }

  get paramsMapBox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es',
    };
  }

  async city(place = "") {
  //   //http petition
     try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });
      const { data }  = await instance.get();
      
      const { features } = data;
      
      // console.log('Aqui esta la data.features: '.red, features);
      let cities = [];
      
      for(let i = 0; i<=4; i ++){
        
      cities.push(features[i].place_name_es);
      // console.log(features[i].place_name_es);
      }
      // console.log({cities});
      let city = await getChoice(cities);//      getChoice(cities, message = "seleccione una ciudad");
      console.log('Ciudad elegida: ', city)
        
        // const city = data.features[0].place_name_es;
        // this._searchHistory.push(city);
        
        // console.log(data.features[0].place_name_es);
      
      return cities;
    } catch (error) {;
      console.clear()
      console.error('Hubo un error al conectar \n \n',error);
    }
 
  }
}

module.exports = Searches;
