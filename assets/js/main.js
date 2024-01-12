const display = document.querySelector("#display");
const button = document.querySelectorAll(".number");
const clear = document.querySelector(".clear");
const operator = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");

let currentNumber = "";
let oldNumber = "";
let resultNumber = "";
let currentOperator = "";

const maxDisplayLength = 7;

function updateDisplay(content) {
  if (content.length > maxDisplayLength) {
    const fontSize = Math.floor(500 / content.length) + "px";
    display.textContent = content;
    display.style.fontSize = fontSize;
  } else {
    const formattedNumber = formatNumber(content);
    display.textContent = formattedNumber;
    display.style.fontSize = "70px";
  }
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
// Pressing button

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", function (e) {
    if (resultNumber) {
      currentNumber = this.innerHTML;
      resultNumber = "";
    } else {
      currentNumber += this.innerHTML;
    }

    display.textContent = currentNumber;
    updateDisplay(currentNumber);
  });
}

decimal.addEventListener("click", function (e) {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    display.textContent = currentNumber;
    updateDisplay(currentNumber);
  }
});

// Old num = qurrent num

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    oldNumber = currentNumber;
    currentNumber = "";
    currentOperator = this.innerHTML;
  });
}

equal.addEventListener("click", function () {
  oldNumber = parseFloat(oldNumber);
  currentNumber = parseFloat(currentNumber);

  switch (currentOperator) {
    case "/":
      resultNumber = oldNumber / currentNumber;
      break;
    case "X":
      resultNumber = oldNumber * currentNumber;
      break;
    case "-":
      resultNumber = oldNumber - currentNumber;
      break;
    case "+":
      resultNumber = oldNumber + currentNumber;
      break;
    case "%":
      resultNumber = oldNumber / 100;
      console.log(resultNumber);
      break;
    default:
      resultNumber = currentNumber;
  }
  display.innerHTML = resultNumber;
  updateDisplay(resultNumber.toString());
});

clear.addEventListener("click", function () {
  display.innerText = 0;
  currentNumber = "";
  oldNumber = "";
  resultNumber = 0;
  currentOperator = "";
  display.style.fontSize = "72px";
});
