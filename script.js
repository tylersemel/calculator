let firstNum = '';
let operator = '';
let secondNum = '';
let hasError = false;
let displayValue = '0';

let display = document.querySelector(".display");
let operatorDisplay = document.querySelector(".operator-display");
const buttons = document.querySelector("#buttons");

let firstNumFilled = false;

const PRECISION = 5;
const ERROR_MESSAGE = "Hrmmm not quite";

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
    if (!checkWholeNumber(a + b)) {
        return parseFloat((a + b).toFixed(PRECISION));
    }

    return a + b;
}

function subtract(a, b) {
    if (!checkWholeNumber(a - b)) {
        return parseFloat((a - b).toFixed(PRECISION));
    }

    return a - b;
}

function multiply(a, b) {
    if (!checkWholeNumber(a * b)) {
        return parseFloat((a * b).toFixed(PRECISION));
    }

    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        displayError(ERROR_MESSAGE);
        return null;
    }

    if (!checkWholeNumber(a / b)) {
        return parseFloat((a / b).toFixed(PRECISION));
    }

    return a / b;
}

function operate(operator, a, b) {
    let result = null;

    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            console.log("Incorrect operator");
    }

    return result;
}

function displayError(error) {
    setDisplay(error);
    setOperatorDisplay('');
    clear();
    hasError = true;
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
    operatorDisplay.textContent = '';//operator;
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
        firstNum = firstNum === '0' ? numberText : firstNum + numberText;
        setDisplay(firstNum);
    }
    else {
        secondNum = secondNum.toString();
        secondNum = secondNum === '0' ? numberText : secondNum + numberText;
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
    if (firstNum === '' && displayValue !== '') {
        firstNum = displayValue;
    }

    if (!firstNumFilled) {
        firstNumFilled = true;
    }
    else if (secondNum !== '') {
        firstNum = clickEquals().toString();
        firstNumFilled = true;
    }

    if (!hasError) {
        setOperator(operatorText);
        setOperatorDisplay(operatorText);
    }
}

function clickEquals() {
    if (firstNum === '' || secondNum === '') return;

    const solution = operate(operator, parseFloat(firstNum), parseFloat(secondNum));

    if (solution !== null) {
        setDisplay(solution.toString());
        setOperatorDisplay('');
        clear();
    }
    
    return solution;
}

/**
 * Sets the firstNum and secondNum to have a decimal point if there
 * is not already one present.
 * @returns Nothing.
 */
function clickDecimal() {
    if ((!firstNumFilled && firstNum.toString().includes('.')) ||
        (firstNumFilled && secondNum.toString().includes('.'))) {
        return;
    }
    else if (!firstNumFilled && firstNum === '') {
        firstNum = '0.';
        setDisplay(firstNum);
    }
    else if (!firstNumFilled) {
        firstNum += '.';
        setDisplay(firstNum);
    }
    else if (secondNum === '') {
        secondNum = '0.';
        setDisplay(secondNum);
    }
    else {
        secondNum += '.';
        setDisplay(secondNum);
    }
}

buttons.addEventListener("click", (e) => {
    let targetId = null;

    if (e.target.matches('button')) {
        targetId = e.target.parentNode.id && e.target.parentNode.id !== "buttons" ? e.target.parentNode.id : e.target.id;
    }

    if (hasError &&
        (targetId === "numbers" ||
        targetId === "clear" ||
        targetId === "equals"          
        )) {
            clear();
            hasError = false;
    }
    else if (hasError) {
        return;
    }

    switch(targetId) {
        case "numbers":
            clickNumber(e.target.textContent);
            break;
        case "operators":
            clickOperator(e.target.textContent);
            break;
        case "decimal":
            clickDecimal();
            break;
        case "equals":
            clickEquals();
            break;
        case "clear":
            clear();
            setDisplay('0');
            setOperatorDisplay('');
            break;
        default:
            console.log("Did not click a button");
    }
});