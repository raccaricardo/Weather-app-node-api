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
    // this._searchHistory.push(city);

    if (this._searchHistory.length >= 5) {
      this._searchHistory.unshift(city);
      this._searchHistory.pop();
    } else {
      this._searchHistory.unshift(city);
    }
  }

  get searchHistory() {
    if (this._searchHistory === []) {
      return false;
    } else {
      return this._searchHistory;
    }
  }
  // get searchHistoryCapitalized() {
  //   if (!this._searchHistory === []) {
  //     return this._searchHistory.map((place) => {
  //       let words = place.splip(" ");
  //       words = words.map((w) => w[0].toUpperCase() + w.substring(1));
  //       return words.join(" ");
  //     });
  //   } else {
  //     return [];
  //   }
  // }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 10,
      language: "es",
    };
  }
  get paramsOpenWeather() {
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
      console.error(
        error,
        "\n \n \n \n Hubo un error al conectar con MapBox \n \n \n \n"
      );
      return [];
    }
  }
  async findWeather(lat = 0, lon = 0) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
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
      return {};
    }
    //#endregion
  }
  //#endregion
}

module.exports = Searches;
