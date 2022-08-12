"use strict";

class CreateAccount {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.logDates = [];
    this.blueZone = {
      ledsen: 0,
      uttrakad: 0, // prettier-ignore
      trog: 0,
      utmattad: 0,
      besviken: 0,
      hjalplos: 0,
      kylig: 0,
      kraftlos: 0,
      likgiltig: 0,
      nedstamd: 0,
      olycklig: 0,
      tveksam: 0,
      deprimerad: 0,
      demoraliserad: 0,
      disillusionerad: 0,
      vardelos: 0,
      brustet_hjarta: 0,
      melankolisk: 0,
      nostalgisk: 0,
      snal: 0,
      misstanksam: 0,
      cynisk: 0,
      skeptisk: 0,
      otymplig: 0,
    };
    this.greenZone = {
      lugn: 0,
      fokuserad: 0,
      redo: 0,
      pigg: 0,
      glad: 0,
      eftertanksam: 0,
      naiv: 0,
      stoisk: 0,
      peppig: 0,
      sjalvsaker: 0,
      vagad: 0,
      entusiatisk: 0,
      komisk: 0,
      vordnadsfull: 0,
      karleksfull: 0,
      motiverad: 0,
      oppenhjartlig: 0,
      spontan: 0,
      harmonisk: 0,
      upprymd: 0,
    };
    this.yellowZone = {
      frusterad: 0,
      orolig: 0,
      bekymrad: 0,
      angslig: 0,
      forvanad: 0,
      generad: 0,
      besvarad: 0,
      hapen: 0,
      nervos: 0,
      panikslagen: 0,
      radd: 0,
      desperat: 0,
      angerfull: 0,
      overvalmad: 0,
      anklagad: 0,
      skamfull: 0,
      blyg: 0,
      skyldig: 0,
      missforstadd: 0,
      forsiktig: 0,
      panik: 0,
      paralyserad: 0,
      paranoid: 0,
      fortranger: 0,
      hemlighetsfull: 0,
      osaker: 0,
      feg: 0,
      otalig: 0,
      kanslig: 0,
      defensiv: 0,
    };
    this.redZone = {
      arg: 0,
      forskrackt: 0,
      rosenrasande: 0,
      ilsken: 0,
      irriterad: 0,
      sur: 0,
      upprord: 0,
      vansinnig: 0,
      hysterisk: 0,
      kravande: 0,
      avundsjuk: 0,
      manipulerande: 0,
      aggressiv: 0,
      acklad: 0,
      hatisk: 0,
      ovanlig: 0,
      indignerad: 0,
      galen: 0,
      rebellisk: 0,
      arrogant: 0,
      stangd: 0,
      fordomsfull: 0,
      barnslig: 0,
    };
  }
}

function checkRegisterAccount() {
  let value;

  if (user && registerEmail) {
    value = true;
  } else {
    value = false;
  }
  return value;
}

function regPassword() {
  let value;

  if (registerPassword.value === verifyPassword.value) {
    value = true;
  } else {
    value = false;
  }

  return value;
}

export { checkRegisterAccount, regPassword, CreateAccount };
