const axios = require("axios");
require('dotenv').config();
require('colors');

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
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: es,
    };
  }

  async city(place = "") {
  //   //http petition
     try {
      // const instance = axios.create({
      //   baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${token}&limit=${limit}&language=${lang}`,
      //   params: this.paramsMapBox,
      // });
      // const { data } = await instance.get();
      // // console.log(`Ciudad ${city}`);
      // console.log(data.features);
      // https://api.mapbox.com/geocoding/v5/mapbox.places/villa%20maria.json?access_token=pk.eyJ1IjoicmljYXJkb3JhY2NhIiwiYSI6ImNrcTg0MXE0dTBjZHkyd28yYmMyeGRrd3oifQ.8VImGJQms7m5jsWKVV1LgA&language=es&limit=1
      const token = process.env.MAPBOX_KEY;
      const limit = 1;
      const lang = 'es';
         const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${token}&limit=${limit}&language=${lang}`)
        console.log('Aqui esta la data.features: '.red);
        // console.log(data.features);
        const city = data.features[0].place_name_es;
        this._searchHistory.push(city);
        
        // console.log(data.features[0].place_name_es);
      
      return [];
    } catch (error) {
      console.error(error);
    }
 
  }
}

module.exports = Searches;
