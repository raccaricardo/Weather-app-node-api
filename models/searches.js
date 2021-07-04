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
}

module.exports = Searches;
