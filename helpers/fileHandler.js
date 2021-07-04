
const fs = require('fs');
 

const fileName = 'data.json';
// const path = `.db/${fileName}`;
const path = `./db/data.json`;

const saveData = (data = []) => {
    try {
        let cities = {};
        data.forEach(element => {
 
            cities[element.id] = element;
        });
        fs.writeFileSync(path, JSON.stringify(data));
    // fs.writeFileSync( path, data );

    } catch (error) {
        console.log( 'Error al grabar data /n /n ', error );        
    }
}


// Object.keys(this._list).forEach((key) => {
//     const task = this._list[key];

//     if (!task.is_completed) {
//         taskObjList.push({
//             value: task.id,
//             name: `${i.toString().green} ${task.description} `
//         });
//         i++;
//     }
//     return taskObjList;
// });

const readData = () => {

    if (!fs.existsSync(path)) {
        return null;
    }

  
        const info = fs.readFileSync( path, 'utf8' );
        return JSON.parse( info );
  
}

module.exports = {
    saveData,
    readData
}