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

let afterOperator = false;

// flow: if no numbers entered, after operator is false
// then press firstNum -> call numbers event
// then press operator 
// then press secondNum 
// either then press = or another operator
// if = then call calculate and reset everything, completing the loop

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
        return;
    }
    return a / b;
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

    if (!afterOperator) {
        firstNum = firstNum.toString();
        firstNum += e.target.textContent;
        firstNum = parseInt(firstNum);
        setDisplay(firstNum.toString());
    }
    else {
        secondNum = secondNum.toString();
        secondNum += e.target.textContent;
        secondNum = parseInt(secondNum);
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

//where to get the operator
functions.addEventListener("click", (e) => {
    if (hasError) {
        return;
    }
    
    if (firstNum === '' && displayValue != '') firstNum = parseInt(displayValue);
    if (firstNum === '') return;
    if (secondNum !== '') {
        calculate();
        clear();
        if (hasError) {
            return;
        }
        else {
            firstNum = parseInt(displayValue);
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

clearBtn.addEventListener("click", () => {
    clear();
    setDisplay('');
    setOperatorDisplay('');
    hasError = false;
});