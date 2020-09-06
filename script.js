const calc = {
  displayNums: 0,
  opOne: null,
  initNum: false,
  operation: null,
  opTwo: false,
  afterEq: false,
};

function updateDisplay() {
  let display = document.getElementById('display');
  display.innerHTML = calc.displayNums;
  if (calc.displayNums.length > 13) {
    display.innerText = calc.displayNums.substring(0, 13);
  }
}

updateDisplay();

function enterNum(num) {
  if (
    (calc.operation !== null && calc.initNum === true) ||
    calc.displayNums == 'Error' ||
    calc.afterEq === true
  ) {
    calc.displayNums = 0;
    calc.initNum = false;
    calc.afterEq = false;
  }
  if (calc.operation != null) {
    calc.opTwo = true;
  }
  if (calc.displayNums === 0) {
    if (num === '.') {
      calc.displayNums = '0.';
    } else if (num === '0') {
      calc.displayNums = 0;
    } else {
      calc.displayNums = num;
    }
  } else {
    if (num === '.') {
      if (!calc.displayNums.includes('.')) {
        calc.displayNums += num;
      }
    } else {
      calc.displayNums += num;
    }
  }
  updateDisplay();
}

function handleOp(newOp) {
  if (calc.operation != null && calc.opTwo == true) {
    calc.displayNums = operate(calc.opOne, calc.displayNums, calc.operation);
    updateDisplay();
  }
  calc.opOne = calc.displayNums;
  calc.operation = newOp;
  calc.initNum = true;
  calc.opTwo = false;
}

function handleEq() {
  if (calc.operation != null) {
    calc.displayNums = operate(calc.opOne, calc.displayNums, calc.operation);
    updateDisplay();
  }
  calc.opOne = calc.displayNums;
  calc.operation = null;
  calc.initNum = true;
  calc.opTwo = false;
  calc.afterEq = true;
}

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (op === '+') {
    return a + b;
  } else if (op === '-') {
    return a - b;
  } else if (op === '*') {
    return a * b;
  } else if (op === '/') {
    if (b === 0) {
      return 'Boom!💥';
    } else {
      return a / b;
    }
  }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) =>
  button.addEventListener('click', (e) => {
    switch (e.target.value) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '.':
        enterNum(e.target.value);
        break;
      case '/':
      case '*':
      case '-':
      case '+':
        handleOp(e.target.value);
        break;
      case '=':
        handleEq();
        break;
      case 'plus-minus':
        calc.displayNums = parseFloat(calc.displayNums) * -1;
        updateDisplay();
        break;
      case 'percent':
        calc.displayNums = parseFloat(calc.displayNums) / 100;
        updateDisplay();
        break;
      case 'clear':
        calc.displayNums = 0;
        calc.opOne = null;
        calc.initNum = false;
        calc.operation = null;
        updateDisplay();
        break;
    }
  })
);
