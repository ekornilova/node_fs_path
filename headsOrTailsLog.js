#! /usr/local/bin/node

const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const args = yargs(hideBin(process.argv)).argv;
if (!args._[0]) {
  console.error("Введите имя файла");
  return;
}
const fileName = args._[0];
const readerStream = fs.createReadStream(`${fileName}.txt`);
let data = "",
  countVictory = 0,
  countFailure = 0;
readerStream
  .setEncoding("UTF8")
  .on("data", (chunk) => {
    data += chunk;
  })
  .on("error", (e) => {
    console.error(e.message);
  })
  .on("end", () => {
    data
      .split("")
      .forEach((val) => (Number(val) ? countVictory++ : countFailure++));
    console.log("общее количество партий: ", countVictory + countFailure);
    console.log(
      "количество выигранных / проигранных партий:",
      `${countVictory} / ${countFailure}`
    );
    console.log(
      "процентное соотношение выигранных партий:",
      Math.round((countVictory / (countVictory + countFailure)) * 100)
    );
  });
