let firstNum = '';
let operator = '';
let secondNum = '';
let solution = 0;
let hasError = false;

let display = document.querySelector(".display");
let operatorDisplay = document.querySelector(".operator-display");
const numbers = document.querySelector(".numbers");
const functions = document.querySelector(".functions");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");

let afterOperator = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        error();
        return '';
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            solution = add(a, b);
            break;
        case '-':
            solution = subtract(a, b);
            break;
        case '*':
            solution = multiply(a, b);
            break;
        case '/':
            solution = divide(a, b);
            break;
        default:
            console.log("Incorrect operator");
    }

    // Math.round((solution + Number.EPSILON) * 100) / 100;
}

function error() {
    clear();
    setDisplay("Girl... no");
    hasError = true;
}

function setDisplay(value) {
    display.textContent = value;
}

numbers.addEventListener("click", (e) => {
    if (hasError) {
        clear();
        hasError = false;
    }
    if (!afterOperator) {
        firstNum += e.target.textContent;
        setDisplay(firstNum);
    }
    else {
        secondNum += e.target.textContent;
        setDisplay(secondNum);
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

function convertToInt(num) {
    return parseInt(num);
}

function calculate() {
    firstNum = convertToInt(firstNum);
    secondNum = convertToInt(secondNum);

    operate(operator, firstNum, secondNum);

    if (solution === '') {
        return;
    }

    setDisplay(solution);

    firstNum = solution;
    secondNum = '';
}

//where to get the operator
functions.addEventListener("click", (e) => {
    if (hasError) {
        clear();
        hasError = false;
    }

    if (firstNum === '') {
        return;
    }

    if (secondNum !== '') {
        calculate();
    }

    setOperator(e.target.textContent);
    setOperatorDisplay(operator);
    afterOperator = true;

});

equalsBtn.addEventListener("click", () => {
    if (hasError) {
        clear();
        hasError = false;
    }

    if (firstNum === '' || secondNum === '') {
        return;
    }

    calculate();
});

function clear() {
    firstNum = '';
    operator = '';
    secondNum = '';
    solution = '';
    afterOperator = false;
    setDisplay('');
    setOperatorDisplay('');
}

clearBtn.addEventListener("click", () => {
    clear();
    hasError = false;
});