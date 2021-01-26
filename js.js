function RespectImage() {
  document.getElementById("respect").style.visibility = "visible";
}
function GameOver() {
  document.getElementById("gameOver").style.visibility = "visible";
}

let config = [];
config["velocidade"] = 20;
config["unid"] = "px";
config["limite_tras"] = 10;
config["limite_baixo"] = screen.height;
config["limite_direita"] = eval(
  screen.width - document.getElementById("carro").width
);
config["limite_cima"] = 150;
config["x_pessoa"] = document.getElementById("pessoa").offsetLeft;
config["y_pessoa"] = document.getElementById("pessoa").offsetTop;

console.log(config);

async function movimenta(carro, orientacao) {
  mLeftEx = carro.style.marginLeft; // '10px'
  mTopEx = carro.style.marginTop; // ''
  mLeft = Number(mLeftEx.split("px")[0]);
  mTop = Number(mTopEx.split("px")[0]);

  if (mLeft == "") {
    mLeft = 0;
  }
  if (mTop == "") {
    mTop = 0;
  }

  if (orientacao == "tras") {
    console.log(mLeft + " " + config["limite_tras"]);
    while (mLeft > config["limite_tras"]) {
      mLeft = eval(mLeft - config["velocidade"]);

      if (mLeft > config["limite_tras"]) {
        await sleep(50);
        carro.style.marginLeft = mLeft + config["unid"];
      } else {
        carro.style.marginLeft = config["limite_tras"];
        alert("Já estou no meu limite, tente outro botão!");
        break;
      }
    }
  } else if (orientacao == "baixo") {
    while (mTop < config["limite_baixo"]) {
      mTop = eval(mTop + config["velocidade"]);

      if (mTop < config["limite_baixo"]) {
        await sleep(50);
        carro.style.marginTop = mTop + config["unid"];
      } else {
        carro.style.marginTop = config["limite_baixo"];
        alert("Já estou no meu limite, tente outro botão!");
        break;
      }
    }
  } else if (orientacao == "direita") {
    cont_batida = 0;
    while (mLeft < config["limite_direita"]) {
      mLeft = eval(mLeft + config["velocidade"]);

      if (mLeft < config["limite_direita"]) {
        await sleep(50);
        carro.style.marginLeft = mLeft + config["unid"];

        if (
          mLeft >= config["x_pessoa"] - 500 &&
          mTop == 0 &&
          cont_batida == 0
        ) {
          var confirma = confirm("Você deseja ATROPELAR esse o DevRacer?");
          if (confirma == true) {
            GameOver();
            var batidaA = new Audio("sounds/batida.mp3");
            batidaA.play();
            acelera = 0;
            while (acelera <= 100) {
              await sleep(5);
              document.getElementById("pessoa").style.marginLeft =
                "-" + acelera + "px";
              acelera++;
            }
            carro.style.width = "210px";
            carro.style.marginTop = "-48px";

            carro.src = "imagens/batida.png";
            document.getElementById("pessoa").style.visibility = "hidden";
          } else {
            RespectImage();
            var repectA = new Audio("sounds/respect.mp3");
            repectA.play();
            document.getElementById("pessoa").src = "imagens/wings.png";
            voa = 0;
            while (voa <= 200) {
              await sleep(10);
              document.getElementById("pessoa").style.marginTop =
                "-" + voa + "px";
              voa++;
            }
          }

          cont_batida++;
        }
      } else {
        carro.style.marginLeft = config["limite_direita"];
        carro.style.width = "150px";
        carro.style.marginTop = "0px";
        carro.src = "/imagens/carro1.png";
        alert("Já estou no meu limite, tente outro botão!");
        break;
      }
    }
  } else {
    while (mTop > config["limite_cima"]) {
      mTop = eval(mTop - config["velocidade"]);
      if (mTop >= config["limite_cima"]) {
        await sleep(50);
        carro.style.marginTop = mTop + config["unid"];
      } else {
        carro.style.marginTop = config["limite_cima"];
        alert("Já estou no meu limite, tente outro botão!");
        break;
      }
    }
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
