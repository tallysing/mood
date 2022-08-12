"use strict";

const { writeDataToFile, fs } = require("./utils");
const data = fs.readFileSync("./accounts.json", "utf8"),
  accounts = JSON.parse(data);
function findAll() {
  return new Promise((resolve, reject) => resolve(data));
}

function create(account) {
  return new Promise((resolve, reject) => {
    accounts.push(JSON.parse(account));

    const addAccount = JSON.stringify(accounts);

    writeDataToFile("./accounts.json", addAccount);
    resolve(addAccount);
  });
}

function update(email, emotions) {
  return new Promise((resolve, reject) => {
    const emailIdx = accounts.findIndex(user => user.email === email);

    const { blueZone, greenZone, yellowZone, redZone, logDates } =
      accounts[emailIdx];

    if (blueZone) {
      emotions.blueZone.forEach(m => {
        if (m in blueZone) {
          blueZone[m]++;
        }
      });
    }
    if (greenZone) {
      emotions.greenZone.forEach(m => {
        if (m in greenZone) {
          greenZone[m]++;
        }
      });
    }
    if (yellowZone) {
      emotions.yellowZone.forEach(m => {
        if (m in yellowZone) {
          yellowZone[m]++;
        }
      });
    }
    if (redZone) {
      emotions.redZone.forEach(m => {
        if (m in redZone) {
          redZone[m]++;
        }
      });
    }
    if (logDates) {
      const loguser = { date: new Date() };

      if (emotions.blueZone.length) {
        loguser.blueZone = emotions.blueZone;
      }
      if (emotions.greenZone.length) {
        loguser.greenZone = emotions.greenZone;
      }
      if (emotions.yellowZone.length) {
        loguser.yellowZone = emotions.yellowZone;
      }
      if (emotions.redZone.length) {
        loguser.redZone = emotions.redZone;
      }
      logDates.push(loguser);
    }

    const updAccounts = JSON.stringify(accounts),
      updAccount = JSON.stringify(accounts[emailIdx]);

    writeDataToFile("./accounts.json", updAccounts);
    resolve(updAccount);
  });
}

module.exports /* reasigning the empty obj to funcs */ = {
  findAll,
  create,
  update,
}; // Vals becomes the API
