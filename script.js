let firstNum = '';
let operator = '';
let secondNum = '';
let solution = 0;
let display = document.querySelector(".display");
let operatorDisplay = document.querySelector(".operator-display");
const numbers = document.querySelector(".numbers");
const functions = document.querySelector(".functions");
const equals = document.querySelector(".equals");

let displayValue = 0;
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
}

function setDisplay(value) {
    displayValue = value;
    display.textContent = value;
}

numbers.addEventListener("click", (e) => {
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

//where to get the operator
functions.addEventListener("click", (e) => {
    if (firstNum == '') {
        return;
    }
    
    setOperator(e.target.textContent);
    setOperatorDisplay(operator);
    // populateDisplay(e.target.textContent);
    afterOperator = true;
    // operate(operator, firstNum, secondNum);

    console.log(operator);
});

function convertToInt(num) {
    return parseInt(num);
}

equals.addEventListener("click", () => {
    if (firstNum === '' || secondNum === '') {
        return;
    }

    convertToInt(firstNum);
    convertToInt(secondNum);

    operate(operator, firstNum, secondNum);
    setDisplay(solution);

    // afterOperator = false;
    firstNum = solution;
    secondNum = '';
});