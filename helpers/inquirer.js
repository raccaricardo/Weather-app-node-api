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
      },
    ],
  },
];

const transformInquirerChoices = (message = "", choices = []) => {
  let arr = [];
  for (let i = 0; i <= 4; i++) {
    // console.log(features[i].place_name_es);
    arr.push({
      value: choices[i],
      name: ` ${(i+1).toString().green} ${choices[i]} `,
    });
  }
  return [
    {
      type: "list",
      name: "option",
      message,
      choices: arr,
    },
  ];
};

const getChoice = async (message = '', cities = [""]) => {
  const choices = await transformInquirerChoices(message, cities);
  const { option } = await inquirer.prompt(choices);
  return option;
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
