diesArray = [];
rolledDies = [];
result = 0;
rerolledDies = 0;
output = ("Hey! There are the dices...\n" + 
"Os dados rolados foram: " + rolledDies +
"\n Gerando um resultado de: " + result +
"\n e " + rerolledDies + " dados foram reroladoss")

function diceRoll (dies) {
  splitDies(dies)
}

function splitDies(dies) {
  if (!/^[+-]/.test(dies)) {
    dies = "+" + dies;
  }
  dies = dies.split(/(?=[+-])/);
  diesArray = diesArray.concat(dies);
  diesArray.forEach((die) => checkDies(die));
}

function checkDies(die) {
  const parts = die.match(
    /([+-])?(\d*d?\d+)?(rr\d+)?([kd][hl]\d+)?(exp\d+)?(crit\d+)?(!)?(.*)/
  );
  if (parts == null) {
    return "Houve um erro, a expressão não foi reconhecida";
  }
  diceRoller(parts);
}

function diceRoller(diceParts) {
  const sign = diceParts[1]; // Recolhe o primeiro sinal de + ou 0 que surgir
  const dice = diceParts[2]; // Recolhe o número ou dado que aparecer
  const reroll = diceParts[3]; // Define um valor em que caso os dados sejam rolados neste valor ou menor, são rerolados mais uma vez
  const keepDiscard = diceParts[4]; // Recolhe KD / HL
  const exploding = diceParts[5]; // Recolhe EXPx
  const critical = diceParts[6]; // Recolhe o valor de critico
  const ordening = diceParts[7]; // Recolhe !
  const trash = diceParts[8]; // Recolhe o restante

  // Define as variaveis necessárias para este dado
  let thisDiceRolls = [];
  let thisDiceResult = 0;
  let explodingValue = 0;
  let rerollCounter = 0;

  // Configura o dado, faces e quantidade inicial
  const indexDice = dice.lastIndexOf("d");
  let amountDices = dice.slice(0, indexDice);
  let facesDice = dice.slice(indexDice + 1);

  // Define um valor 0 para casi não seja definido o explosion
  if (exploding) {
    let explodingIndex = exploding.lastIndexOf("p");
    explodingValue = exploding.slice(explodingIndex + 1);
  } else {
    explodingValue = parseInt(facesDice) + 1;
  }
  // A partir daqui os dados são rolados
  for (let i = 0; i < amountDices; i++) {
    let thisDice;
    if (facesDice == 0) {
      thisDice = 0;
    } else {
      thisDice = Math.floor(Math.random() * facesDice) + 1;
    if (thisDice == explodingValue) {
      amountDices++;
    }
    if (reroll && thisDice >= reroll.slice(2)) {
      thisDice = Math.floor(Math.random() * facesDice) + 1;
      rerollCounter++;
    }
    thisDiceRolls.push(thisDice);
  }
}

  // Aqui ele ordena os dados caso seja necessário
  if (ordening) {
    thisDiceRolls.sort((a, b) => b - a);
  }
  // Aqui ele deleta os maiores ou menores dados
  if (keepDiscard) {
    keepHigher(thisDiceRolls, keepDiscard);
  } else {
    thisDiceResult = thisDiceRolls.reduce((total, num) => total + num, 0);
  }
  function keepHigher(arr, cmd) {
    abrev = cmd.slice(0, 2);
    let n = parseInt(cmd.slice(2));
    let arrCopy = [...arr];
    let arrCopy2 = [...arr];
    let indices = [];
    switch (abrev) {
      case "kh":
        for (let i = 0; i < n; i++) {
          let maxIndex = arrCopy.indexOf(Math.max(...arrCopy));
          indices.push(maxIndex);
          arrCopy[maxIndex] = -Infinity;
        }
        break;
      case "kl":
        for (let i = 0; i < n; i++) {
          let minIndex = arrCopy.indexOf(Math.min(...arrCopy));
          indices.push(minIndex);
          arrCopy[minIndex] = Infinity;
        }
        break;
      case "dh":
        for (let i = 0; i < n; i++) {
          const maxIndex = arrCopy.indexOf(Math.max(...arrCopy));
          arrCopy[maxIndex] = -Infinity;
        }
        break;
      case "dl":
        for (let i = 0; i < n; i++) {
          const minIndex = arrCopy.indexOf(Math.min(...arrCopy));
          arrCopy[minIndex] = Infinity;
        }
        break;
      default:
        console.log("Comando inválido.");
        return;
    }
    switch (abrev.slice(0, 1)) {
      case "k":
        arrCopy2.forEach((num, index) => {
          if (!indices.includes(index)) {
            arrCopy2[index] = `~${num}~`;
          }
        });
        break;
      case "d":
        arrCopy.forEach((num, index) => {
          if (num == Infinity) {
            arrCopy2[index] = `~${arrCopy2[index]}~`;
          }
        });
        break;
      default:
        console.log("Comando inválido.");
        break;
    }
    arrCopy2.forEach((num) => {
      if (typeof num === "number") {
        thisDiceResult += num;
      }
    });
    thisDiceRolls = arrCopy2;
  }
  // Fez a checagem de critico e marca (Estamos quase terminando)
  if (critical) {
    boldCritials(thisDiceRolls, critical);
  }
  function boldCritials(arr, critical) {
    const criticalChance = critical.slice(4);
    arr.forEach((num, index) => {
      if (num >= criticalChance) {
        arr[index] = `**${num}**`;
      }
    });
  }

  // Por fim, verifica se é uma soma ou subtração
  switch (sign) {
    case "+":
      result = parseInt(result) + parseInt(thisDiceResult);
      break;
    case "-":
      result = parseInt(result) - parseInt(thisDiceResult);
      break;
    default:
      console.log("Houve um erro ao ler o código, por favor verifique");
  }
  rolledDies.push(thisDiceRolls);
  rolledDies.push("PLACEHOLDER");
  rerolledDies = rerollCounter
}
