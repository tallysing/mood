"use strict";

import {
  checkRegisterAccount,
  regPassword,
  CreateAccount,
} from "./signInMethod.js";

const signUpBtnPanel = document.getElementById("signUp"),
  signInBtnPanel = document.getElementById("signIn"),
  main = document.getElementById("main"),
  userName = document.getElementById("register-name"),
  registerEmail = document.getElementById("register-email"),
  registerPassword = document.getElementById("register-password"),
  createBtn = document.getElementById("sign_up"),
  signInEmail = document.getElementById("sign-in-email"),
  signInPassword = document.getElementById("sign-in-password"),
  signInBtn = document.getElementById("sign-in-btn");

createBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  if (checkRegisterAccount && regPassword) {
    const newAccount = new CreateAccount(
        userName.value,
        registerEmail.value,
        registerPassword.value
      ),
      response = await fetch("/register", {
        method: "POST",
        body: JSON.stringify(newAccount),
      });

    if (response.ok) {
      main.classList.remove("right-panel-active");
    } else {
      console.error("Failed to register new account");
    }
  } else {
    alert("unvalid name, emailaddress or password entered");
    console.log(
      user.value,
      registerEmail.value,
      verifyPassword.value,
      registerPassword.value
    );
  }
});

signInBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const response = await fetch("/login", {
    method: "POST",
    body: JSON.stringify({
      email: signInEmail.value,
      password: signInPassword.value,
    }),
  });
  if (response.ok) {
    window.location = "moodTable.html";
  } else {
    console.error("Failed to register new account");
  }
});

signUpBtnPanel.addEventListener("click", () =>
  main.classList.add("right-panel-active")
);

signInBtnPanel.addEventListener("click", () =>
  main.classList.remove("right-panel-active")
);
