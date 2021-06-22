require("colors");
const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");

const Searches = require("./models/searches");

const main = async () => {

  let opt = "";
 let searches = new Searches();
  const routes = {
    '1': async () => { //search city
      console.clear();
      const place = await readInput( `Ciudad: ` );
      console.log('lugar: ', place);
      // searches.addCity = place ;
    },
    '2':  () =>{
        console.log(searches.arrayList);
    },

    //mostrar mensaje

    //buscar los lugares
    //seleccionar el lugares
    //clima
    //mostrar lugares
    // console.log('informacion de la ciudad');
  };

  do {
      
    opt = await inquirerMenu();
     switch(opt){
      case '1': {
        //search city
        console.clear();
        const place = await readInput( `Ciudad: ` );
        searches.searchHistory = place ;
        console.log(`Ciudad: ${place}`);
          console.log(`Lat: ${lat}`);
          console.log(`Lng: ${lng}`);
          console.log(`Temperatura: ${temperature}`);
          console.log(`Min: ${min}`);
          console.log(`Max: ${max}`);
      }
      break;
    
    case '2': {  
          console.log(searches.arrayList);
          

      }
      break;
    
    default:
    break;
    }
    if ( opt !== '0' ) await pause();

  } while (opt !== '0');
};

main();
