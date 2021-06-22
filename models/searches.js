const axios = require('axios');


class Searches{

    _searchHistory = [];

    constructor( /*city = '' */) {
        //TODO: read db if exist
        // this._searchHistory = [];

    
    }
    set addHistoryCity(city){
        this._searchHistory.push( city );

    }
    get searchHistory() {
        return this._searchHistory;
    }
    
    async city( place = '' ){
        //http petition
        try {
            const token = 'pk.eyJ1IjoicmljYXJkb3JhY2NhIiwiYSI6ImNrcTg0MXE0dTBjZHkyd28yYmMyeGRrd3oifQ.8VImGJQms7m5jsWKVV1LgA' ;
            
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/villa%20maria.json?access_token=${token}&language=es`;
            const city = await axios.get(url); 
            console.log(`Ciudad ${city}`);
        } catch (error) {
            
        }
    }
}

module.exports = Searches;