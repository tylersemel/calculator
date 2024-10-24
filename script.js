let firstNum = '';
let operator = '';
let secondNum = '';
let hasError = false;
let displayValue = '';

let display = document.querySelector(".display");
let operatorDisplay = document.querySelector(".operator-display");
const numbers = document.querySelector(".numbers");
const functions = document.querySelector(".functions");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const decimalBtn = document.querySelector(".decimal");

let afterOperator = false;

const PRECISION = 2;

// flow: if no numbers entered, after operator is false
// then press firstNum -> call numbers event
// then press operator 
// then press secondNum 
// either then press = or another operator
// if = then call calculate and reset everything, completing the loop

function checkWholeNumber(num) {
    return num % 2 == 0;
}

function add(a, b) {
    let sum = a + b;

    if (!checkWholeNumber(sum)) {
        return (a + b).toFixed(PRECISION);
    }

    return sum;
}

function subtract(a, b) {
    let sum = a - b;

    if (!checkWholeNumber(sum)) {
        return (a - b).toFixed(PRECISION);
    }

    return sum;
}

function multiply(a, b) {
    let product = a * b;

    if (!checkWholeNumber(product)) {
        return (a * b).toFixed(PRECISION);
    }

    return product;
}

function divide(a, b) {
    if (b === 0) {
        error();
        return;
    }

    let product = a / b;

    if (!checkWholeNumber(product)) {
        return (a / b).toFixed(PRECISION);
    }

    return product;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log("Incorrect operator");
            return;
    }
}

function error() {
    clear();
    setDisplay("Girl... no");
    hasError = true;
}

function setDisplay(value) {
    display.textContent = value;
    displayValue = value;
}

numbers.addEventListener("click", (e) => {
    if (hasError) {
        clear();
        setDisplay('');
        setOperatorDisplay('');
        hasError = false;
    }

    let currentDisplay = displayValue;

    if (!afterOperator) {
        firstNum = firstNum.toString();
        currentDisplay += e.target.textContent;
        firstNum = parseFloat(currentDisplay);
        setDisplay(firstNum.toString());
    }
    else {
        secondNum = secondNum.toString();

        if (secondNum !== '') {
            currentDisplay += e.target.textContent;
            secondNum = parseFloat(currentDisplay);
        }
        else {
            secondNum += e.target.textContent;
            secondNum = parseFloat(secondNum);
        }

        setDisplay(secondNum.toString());
        setOperatorDisplay('');
    }
});

function setOperator(operatorVal) {
    switch (operatorVal) {
        case '+':
            operator = '+';
            break;
        case '-':
            operator = '-';
            break;
        case '×':
            operator = '*';
            break;
        case '÷':
            operator = '/';
            break;
        default:
            console.log("Shouldnt be here");
    }
}

function setOperatorDisplay(operator) {
    operatorDisplay.textContent = operator;
}

function calculate() {
    let solution = operate(operator, firstNum, secondNum);

    if (solution == null) return;

    setDisplay(solution.toString());
}

function createNumber(val) {

}

//where to get the operator
functions.addEventListener("click", (e) => {
    if (hasError) {
        return;
    }
    
    if (firstNum === '' && displayValue != '') {
        if (displayValue === ".") {
            error();
            return;
        }
        firstNum = parseFloat(displayValue);
    }
    if (firstNum === '') return;
    if (secondNum !== '') {
        calculate();
        clear();
        if (hasError) {
            return;
        }
        else {
            firstNum = parseFloat(displayValue);
        }
    }

    setOperator(e.target.textContent);
    setOperatorDisplay(operator);
    afterOperator = true;
});

equalsBtn.addEventListener("click", () => {
    if (hasError) {
        return;
    }

    if (displayValue != '') setDisplay(displayValue);
    if (firstNum === '' || secondNum === '') return;

    calculate();
    clear();
});

function clear() {
    firstNum = '';
    operator = '';
    secondNum = '';
    afterOperator = false;
}

decimalBtn.addEventListener("click", () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        setDisplay(displayValue);
        // firstNum = parseFloat(displayValue).toFixed(1);
    }
    else {
        return;
    }
});

clearBtn.addEventListener("click", () => {
    clear();
    setDisplay('');
    setOperatorDisplay('');
    hasError = false;
});