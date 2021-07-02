require("colors");
// const path = require("path");
// require('dotenv').config( { path: path.resolve(__dirname, '../.env') } );
// require('dotenv').config({ path: require('find-config')('.env') });



const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Searches = require("./models/searches");
console.log(process.env);
// console.log(process.env.MAPBOX_KEY);
const main = async () => {

  let opt = "";
 let searches = new Searches();
  const routes = {
    '1': async () => { //search city
      console.clear();
      const place = await readInput( `Ciudad: ` );
      console.log({place});
      // searches.addCity = place ;
    },
    '2':  () =>{
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
     switch(opt){
      case '1': {
        //search city
        console.clear();
        const place = await readInput( `Ciudad: ` );
        const { city } = await searches.city( place ) ;
        searches.addHistoryCity = city ;
          // console.log(`Lat: ${lat}`);
          // console.log(`Lng: ${lng}`);
          // console.log(`Temperatura: ${temperature}`);
          // console.log(`Min: ${min}`);
          // console.log(`Max: ${max}`);
      }
      break;
    
    case '2': {  
          console.log(searches.searchHistory);
      }
      break;
    
    default:
    break;
    }
    if ( opt !== '0' ) await pause();

  } while (opt !== '0');
};

main();
