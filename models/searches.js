const axios = require("axios");
require("dotenv").config();
require("colors");

const { readData } = require("../helpers/fileHandler");
const { getChoice } = require("../helpers/inquirer");

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
    if (this._searchHistory === []) {
      return false;
    } else {
      return this._searchHistory;
    }
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 10,
      language: "es",
    };
  }
  paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }
  //#region api connections
  async findCity(place = "") {
    //http petition
    try {
      let cities = [];
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });
      const { data } = await instance.get();

      const { features } = data;
      // console.log({features});

      return features.map((place) => ({
        id: place.id,
        name: place.place_name_es,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      console.clear();
      console.error("Hubo un error al conectar con MapBox \n \n \n \n");
      return [];
    }
  }
  async findWeather(lat = 0, lon = 0) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsOpenWeather, lat, lon}
      });
      const { data } = await instance.get();
      const { weather, main } = data;
      const {
        temp,
        feels_like: realFeel,
        temp_min: tempMin,
        temp_max: tempMax,
        humidity,
      } = main;
      return {
        description: weather[0].description,
        temp,
        realFeel,
        tempMin,
        tempMax,
        humidity,
      };
    } catch (error) {
      console.clear();
      console.error("Hubo un error al conectar con openWeather\n \n \n \n");
      return [];
    }
    //#endregion
  }
}

module.exports = Searches;
