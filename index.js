require("colors");

const { saveData, readData } = require("./helpers/fileHandler");
const { readInput, inquirerMenu, pause, getChoice } = require("./helpers/inquirer");
const Searches = require("./models/searches");


const main = async () => {

  let opt = "";
  let searches = new Searches();
  const routes = {
    '1': async () => { //search city
      console.clear();
      const place = await readInput(`Ciudad: `);
      console.log({ place });
      // searches.addCity = place ;
    },
    '2': () => {
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
    const data = readData();
    if ( data ){
      searches._searchHistory = data;
    }
    opt = await inquirerMenu();
    switch (opt) {
      case '1': {
        //search city
        const place = await readInput(`Ciudad: `);
        const similarPlaces = await searches.city(place);
        const cities = similarPlaces.map( place => (
          {
            id: place.id,
            title: place.name
          }))

        const message = "seleccione una ciudad" ;
        let city = await getChoice( message, cities );

        //add to history search 
        searches.addHistoryCity = city;
        saveData(searches.searchHistory);
        city = similarPlaces.find( place => place.id === city.id );
        const { name, lng, lat } = city;
        console.clear();
        console.log( `Ciudad: ${name}` );
        console.log( `Lat: ${lat}` );
        console.log( `Lng: ${lng}` );
        // console.log(`Temperatura: ${temperature}`);
        // console.log(`Min: ${min}`);
        // console.log(`Max: ${max}`);

      }
        break;

      case '2': {
        //ACA ESTOY TRABAJANDO
        
        record = readData() || searches.searchHistory;
        const message = "Historial de busquedas"  ;
        if ( !record ){
          await getChoice();
        }else{
          await getChoice(message, record);          
        }
 
 
      }
        break;
      case '3': {
        console.log(searches.searchHistory);
      }
        break;
      default:
        break;
    }
    if (opt !== '0') await pause();

  } while (opt !== '0');
};

main();
