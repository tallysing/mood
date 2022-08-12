"use strict";

const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, content, "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise(
    /* construct */ (resolve, reject) => {
      try /* create an exception */ {
        let body = "";

        req.on(
          /* data evt is emitted */ "data",
          chunk => (body += chunk.toString())
        );

        req.on(/* end evt is emitted*/ "end", () => resolve(body));
      } catch (error) {
        reject(error);
      }
    }
  );
}

module.exports = { writeDataToFile, fs, getPostData };
