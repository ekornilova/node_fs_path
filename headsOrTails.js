#! /usr/local/bin/node

const readline = require("readline");
const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { stdin: input, stdout: output } = require("node:process");
const args = yargs(hideBin(process.argv)).argv;
if (!args._[0]) {
  console.error("Введите имя файла");
}
const fileName = args._[0];
const appendFileCallBack = () => {
  console.log("данные залогированы");
};

const rl = readline.createInterface({ input, output });
const number = Math.floor(Math.random() * 100);
const logGame = (isVictory) => {
  fs.appendFile(
    `${fileName}.txt`,
    isVictory ? "1" : "0",
    {},
    appendFileCallBack
  );
  rl.close();
};
rl.write("Загадано число в диапазоне от 0 до 100\n");
rl.on("line", (input) => {
  if (input === "close") {
    logGame();
    return;
  }
  const userNumber = Number(input);
  if (isNaN(userNumber)) {
    console.log(`Неверный формат числа`);
  }
  if (userNumber === number) {
    console.log(`Отгадано число ${number}`);
    logGame(true);
    return;
  } else {
    console.log(userNumber > number ? "Меньше" : "Больше");
  }
});
rl.on("error", (e) => {
  console.error(e.message);
});
rl.on("close", function () {
  console.log("До следующей игры");
});
