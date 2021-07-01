const inquirer = require("inquirer");
require("colors"); //no lo asignamos a una contante porque no necesatimos traer ningun metodo

/**
 * @array menuQuestions
 * defines the type of function(  list,input )
 *
 */
const menuQuestions = [
  {
    type: "list",
    name: "option",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: ` ${"1.".green} Buscar Ciudad `,
      },
      {
        value: "2",
        name: ` ${"2.".green} Historial de busquedas `,
      },
      
      {
        value: "0",
        name: ` ${`0.`.green} Salir `,
      }
    ],
  },
];
//choicesList for inquirer.prompt(). In this case, choices of tasks to mark incomplete, complete

const choicesTo = (choices = [], message = '') => {
  return [
    {
      type: "list",
      name: "choice",
      message,
      choices,
    },
  ];
};
const transformInquirerChoices = (choices = []) => {
   
  let arr = [];
  for(let i = 0; i<=4; i ++){
    // console.log(features[i].place_name_es);
    arr.push({
      value: i,
      name: ` ${ i.toString().green} ${ choices[i] } `    
    })  
  } 
  // choices.forEach((element, index) => {
  //   console.clear();
  //   console.log({index});
  //   arr.push({
  //     value: index,
  //     name: ` ${index.toString().green, ' ', element} `    
  //   })
  // });
  return [
    {
      type: "list",
      name: "option",
      message: "¿Qué desea hacer?",
      choices: arr,
    },
  ];
   
}

const getChoice = async (cities = []) => {
  const message = "Seleccione una opción";
  const choices = await transformInquirerChoices(cities);
  // console.log(choices[0].choices)
  const { choice } = await inquirer.prompt(
    choicesTo(choices, message)
  );
  console.log({choice})
  return choice;
};
/*
 *
 *         HEADER MENU
 *
 */
const inquirerMenu = async () => {
  console.clear();
  console.log(`==================================================`.green);
  console.log("            Seleccione una opción                 ".bgCyan);
  console.log(`==================================================\n`.green);

  const { option } = await inquirer.prompt(menuQuestions);

  return option;
};
/**
 *
 * @function pause A function to avoid the end of program
 *
 */
const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(` Presiene ${"ENTER".green} para continuar `, (opt) => {
      //opt es la opcion seleccionada
      readline.close();
      resolve();
    });
  });
};

/**
 *
 * @param {string} message message to show before to readInput
 * @returns {string} input by user
 *
 */
const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const getTaskToDelete = async (taskObjList) => {
  const message = "Seleccione una tarea para eliminar";
  const { idTask } = await inquirer.prompt(
    choicesTasksTo(taskObjList, message)
  );
  return idTask;
};
const getTaskToIncomplete = async (taskObjList) => {
  const message = "Seleccione una tarea para marcar como incompleta";
  const { idTask } = await inquirer.prompt(
    choicesTasksTo(taskObjList, message)
  );
  return idTask;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  getChoice,
  getTaskToDelete,
  getTaskToIncomplete,
};
