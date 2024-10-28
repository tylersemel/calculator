let firstNum = '';
let operator = '';
let secondNum = '';
let hasError = false;
let displayValue = '';

let display = document.querySelector(".display");
let operatorDisplay = document.querySelector(".operator-display");
const buttons = document.querySelector("#buttons");

let firstNumFilled = false;

const PRECISION = 2;
const ERROR_MESSAGE = "Girl... no";

// flow: if no numbers entered, after operator is false
// then press firstNum -> call numbers event
// then press operator 
// then press secondNum 
// either then press = or another operator
// if = then call calculate and reset everything, completing the loop

function checkWholeNumber(num) {
    return num % 1 == 0;
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

function setDisplay(value) {
    display.textContent = value;
    displayValue = value;
}

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

    return solution;
}


function clear() {
    firstNum = '';
    operator = '';
    secondNum = '';
    firstNumFilled = false;
    hasError = false;
}

function clickNumber(numberText) {
    if (!firstNumFilled) {
        firstNum = firstNum.toString();
        firstNum += numberText;
        firstNum = parseFloat(firstNum);
        setDisplay(firstNum);
    }
    else {
        secondNum = secondNum.toString();
        secondNum += numberText;
        secondNum = parseFloat(secondNum);
        setDisplay(secondNum);
        setOperatorDisplay('');
    }
}


/**
 * When an operator button is clicked. If firstNum is empty, do nothing. Otherwise
 * set that the first num has been filled along with the operator.
 * @param {string} operatorText 
 * @returns Nothing.
 */
function clickOperator(operatorText) {
    if (firstNum === '' && displayValue === '') return;

    if (firstNum === '' && displayValue !== '') {
        firstNum = parseFloat(displayValue);
    }

    if (firstNum !== '' && !firstNumFilled) {
        firstNumFilled = true;
    }
    else if (secondNum !== '') {
        firstNum = clickEquals();
        firstNumFilled = true;
    }

    setOperator(operatorText);
    setOperatorDisplay(operatorText);
}

function clickEquals() {
    if (firstNum === '' || secondNum === '') return;

    const solution = calculate(operator, firstNum, secondNum);

    if (solution === null) return;

    setDisplay(solution.toString());
    setOperatorDisplay('');
    clear();
    return solution;
}

buttons.addEventListener("click", (e) => {
    let targetId = null;

    if (e.target.matches('button')) {
        targetId = e.target.parentNode.id && e.target.parentNode.id !== "buttons" ? e.target.parentNode.id : e.target.id;
    }

    switch(targetId) {
        case "numbers":
            clickNumber(e.target.textContent);
            break;
        case "operators":
            clickOperator(e.target.textContent);
            break;
        case "equals":
            clickEquals();
            break;
        case "clear":
            clear();
            setDisplay('');
            setOperatorDisplay('');
            break;
        default:
            console.log("Did not click a button");
    }
});