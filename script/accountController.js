"use strict";

const Account /* class */ = require("./accountModel"),
  { getPostData } = require("./utils");

async function getAccounts(req, res) {
  try {
    const accounts = await Account.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(accounts));
  } catch (error) {
    console.log(error);
  }
}

async function createAccount(req, res) {
  try {
    const body = await getPostData(req);
    const newAccount = await Account.create(body);

    res.writeHead(201, { "Content-Type": "application/json" });

    return res.end(newAccount);
  } catch (error) {
    console.log(error);
  }
}

async function handleLogin(req, res) {
  const reqData = await getPostData(req),
    accounts = await Account.findAll(),
    user = JSON.parse(reqData),
    users = JSON.parse(accounts);

  users.forEach(obj => {
    if (obj.email === user.email) {
      if (obj.password === user.password) {
        const userCookie = JSON.stringify(obj);
        res.writeHead(200, {
          "Set-Cookie": `user=${userCookie}`,
        });
        return res.end(userCookie);
      }
    }
  });
}

async function updateAccount(req, res, { email }) {
  try {
    const reqData = await getPostData(req),
      accounts = await Account.findAll(),
      user = JSON.parse(reqData),
      users = JSON.parse(accounts),
      updAccount = await Account.update(email, user);
    // console.log(updAccount);
    res.writeHead(200, { "Set-Cookie": `user=${updAccount}` });
    return res.end(JSON.stringify(updAccount));
  } catch (error) {
    console.log(error);
  }
}

function parseCookies(req) {
  const list = {},
    cookieHeader = req.headers.cookie;

  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach(cookie => {
    let [name /* user */, ...rest /* obj */] = cookie.split("=");

    name = name.trim();

    if (!name) return;

    const val /* obj */ = rest.join("=").trim();

    if (!val) return;

    list /* nested obj */[name] /* obj */ = decodeURIComponent(val);
  });
  return list;
}

module.exports /* Node's internal hidden func's returned property */ = {
  createAccount,
  getAccounts,
  parseCookies,
  handleLogin,
  updateAccount,
};
