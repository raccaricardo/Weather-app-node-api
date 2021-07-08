require("colors");

const { saveData, readData } = require("./helpers/fileHandler");
const {
  readInput,
  inquirerMenu,
  pause,
  getChoice,
} = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async () => {
  let opt = "";
  let searches = new Searches();
  const routes = {
    1: async () => {
      //search city
      console.clear();
      const place = await readInput(`Ciudad: `);
      console.log({ place });
      // searches.addCity = place ;
    },
    2: () => {
      console.log(searches.searchHistory);
    },

    //mostrar mensaje

    //buscar los lugares
    //seleccionar el lugares
    //clima
    //mostrar lugares
    // console.log('informacion de la ciudad');
  };
  console.clear();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        {
          //search city
          const place = await readInput(`Ciudad: `);
          const similarPlaces = await searches.findCity(place);
          const cities = similarPlaces.map((place) => ({
            id: place.id,
            title: place.name,
          }));

          const message = "seleccione una ciudad";
          let city = await getChoice(message, cities);

          //#region add to history search and save in .json file
          searches.addHistoryCity = city;
          saveData(searches.searchHistory);
          //#endregion

          //#region filtering data and printing
          city = similarPlaces.find((place) => place.id === city.id);
          const { name, lng, lat } = city;
          
          const { description, temp, realFeel, tempMin, tempMax, humidity } =
            await searches.findWeather(lat, lng);
          console.clear();
          console.log(`Ciudad: ${name}`);
          console.log(`Como esta el clima: ${description}`)
          console.log(`Lat: ${lat}`);
          console.log(`Lng: ${lng}`);
          console.log(`Temperatura: ${temp}º`);
          console.log(`Sensacion termica: ${realFeel}º`);
          console.log(`Min: ${tempMin}º`);
          console.log(`Max: ${tempMax}º`);
          console.log(`Humedad: ${humidity}%`);
          //#endregion
        }
        break;

      case "2":
        {
          const record = searches.searchHistory; 
          const message = "Historial de busquedas";
          if (!record) {
            await getChoice();
          } else {
            await getChoice(message, record);
          }
        }
        break;
      case "3":
        {
          // console.log(searches.searchHistory);
        }
        break;
      default:
        break;
    }
    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();
// const searches = new Searches();
// const abc = async ()=>{
// const lng = -63.2402;
// const lat = -32.4075;
// const { description, temp, realFeel, tempMin, tempMax, humidity } = await searches.findWeather(lat, lng);
// console.clear();
// // console.log(`Ciudad: ${name}`);
// console.log(`Lat: ${lat}`);
// console.log(`Long: ${lng}`);
// console.log(`Temperatura: ${temp}`);
// console.log(`Sensacion termica: ${realFeel} `);
// console.log(`Min: ${tempMin}`);
// console.log(`Max: ${tempMax}`);
// console.log(`Humedad: ${humidity}`);
// }
// abc();