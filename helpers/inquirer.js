const inquirer = require("inquirer");
require("colors"); //no lo asignamos a una contante porque no necesatimos traer ningun metodo

/**
 * @array menuQuestions
 * defines the type of function(  list,input,etc )
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
        value: "3",
        name: ` ${"3.".green} Historial de busquedas `,
      },
      {
        value: "0",
        name: ` ${`0.`.green} Salir `,
      },
    ],
  },
];
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

const transformInquirerChoices = (message = "", choicess = []) => {
  // message = "", choicess = []
  let choices;
  let messag;
  if(choicess === [] ){
    title = 'No se encontraron resultados';
    messag = title
    choices = {
      value: '0',
      name: ` ${ ('0').green } ${ title } `,
    }
  }else{
    choices = choicess.map((choice, index) => ({
      value: {
        id: choice.id,
        title: choice.title,
      },
      name: ` ${(index + 1).toString().green} ${choice.title} `,
    }));
    choices.push({ 
      value: '0',
      name: `${'0. Volver atras.'.black.bgRed}`
    })
  }
  

  return [
    {
      type: "list",
      name: "option",
      message: messag,
      choices,
    },
  ];
};

const getChoice = async (message = "", options = []) => {
  const choices = await transformInquirerChoices(message, options);
  const { option } = await inquirer.prompt(choices);
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

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  getChoice,
};
