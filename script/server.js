"use strict";

const http = require(/* call is Node's internal management of the programs dependencies */ "http"),
  { fs, getPostData } /* the APIs */ = require("./utils"),
  {
    createAccount,
    getAccounts,
    parseCookies,
    handleLogin,
    updateAccount,
  } = require("./accountController"),
  server /* evt emitter */ = http.createServer(
    /* invoked after an incoming req is received */ async (req, res) => {
      if (req.url.endsWith(".js")) {
        res.setHeader(/* res header */ "Content-Type", "text/javascript");
      } else if (req.url.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
      let path = "../";

      switch (req.url) {
        case "/":
          path += "signIn.html";

          res.statusCode = 200;

          break;
        case "/moodTable":
          path += "moodTable.html";

          res.statusCode = 200;
          break;

        case "/register": {
          path = null;

          if (req.method !== "POST") {
            res.statusCode = 404;
            res.end();
            return;
          }
          createAccount(req, res);

          break;
        }
        case "/login": {
          path = null;

          if (req.method != "POST") {
            console.log(req.method);
            res.statusCode = 404;
            res.end();
          }
          handleLogin(req, res);

          break;
        }
        case "/update_zones": {
          path = null;

          const cookies = parseCookies(req);

          if (!("user" in cookies)) {
            res.statusCode = 401;
            res.end();
          }

          if (req.method !== "PUT") {
            console.log(req.method);

            res.statusCode = 404;
            res
              .end /* no more data */
              ();
          }
          const obj = JSON.parse(cookies.user);

          updateAccount(req, res, obj);
          break;
        }
        default:
          path += req.url;
          break;
      }

      if (path) {
        fs.readFile(
          path,
          (
            /* callback pattern; 1st arg is an err */ err,
            data
          ) /* async pattern; last arg is a callback */ => {
            if (err) {
              res.statusCode = 404;
              res
                .end /* end the connection */
                ();
            } else {
              res.end(data);
            }
          }
        );
      }
    }
  );

server.listen(
  /* for incoming req on a specific: */ 5000 /* port */,
  "localhost" /* hostname */,
  () =>
    /* console.log("Server listening...") */ process.stdout.write(
      "Server listening on port 5000"
    )
);
