let firstNum = '';
let operator = '';
let secondNum = '';
let hasError = false;
let displayValue = '0';

let display = document.querySelector(".display");
let prevDisplay = document.querySelector(".previous-display");
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

/**
 * Operate on the two given numbers and return that result.
 * @param {string} operator 
 * @param {number} a 
 * @param {number} b 
 * @returns the calculation between two numbers and their operator.
 */
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

/**
 * Display an error if there is one, for example divide by zero.
 * @param {string} error the error message to be displayed.
 */
function displayError(error) {
    setDisplay(error);
    clear();
    hasError = true;
}

/**
 * Show the value of the number or calculation on the calculator's display.
 * @param {string} value 
 */
function setDisplay(value) {
    display.textContent = value;
    displayValue = value;
}

/**
 * Based on the string value from the button pressed, set the operator.
 * @param {string} operatorVal 
 */
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

/**
 * Set the display for the previous calculations. If the previous
 * solution was pressed with the equals, then that is added.
 */
function setPreviousDisplay(isSolution) {
    prevDisplay.textContent = firstNum + " " + operator + " " + secondNum;

    if (isSolution) {
        prevDisplay.textContent += " =";
    }
}

/**
 * Clear the data from the global values of the calculator.
 */
function clear() {
    firstNum = '';
    operator = '';
    secondNum = '';
    firstNumFilled = false;
    hasError = false;
}

/**
 * When a number button is clicked. Set firstNum or secondNum depending on
 * where in the calculation the user is.
 * @param {string} numberText 
 */
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
    }

    setPreviousDisplay();
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
        setPreviousDisplay();
    }
}

/**
 * If either number is empty, nothing is to be done. Otherwise, calculate
 * the solution of firstNum and secondNum and display that solution (if not null).
 * @returns The solution of two numbers and their operator.
 */
function clickEquals() {
    if (firstNum === '' || secondNum === '') return;

    const solution = operate(operator, parseFloat(firstNum), parseFloat(secondNum));

    if (solution !== null) {
        setDisplay(solution.toString());
        setPreviousDisplay(true);
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

/**
 * Undo last input (not including the operator).
 */
function clickBackspace() {
    if (!firstNumFilled) {
        firstNum = firstNum.toString();
        if (firstNum === '') {
            return;
        }
        firstNum = firstNum.length !== 1 ? firstNum.slice(0, firstNum.length - 1) : '0';
        setDisplay(firstNum);
    }
    else {
        secondNum = secondNum.toString();
        if (secondNum === '') {
            return;
        }
        secondNum = secondNum.length !== 1 ? secondNum.slice(0, secondNum.length - 1) : '0';
        setDisplay(secondNum);
    }    

    setPreviousDisplay();
}

function checkIsNumber(targetId) {
    const numbers = "0123456789";
    return numbers.includes(targetId);
}

function checkIsOperator(targetId) {
    const operators ="+-*/";
    return operators.includes(targetId);
}

/**
 * Where all the buttons on the calculator are. From here, the correct functions
 * will be callled according to which button was pressed.
 */
buttons.addEventListener("click", (e) => {
    let targetId = null;

    if (e.target.matches('button')) {
        targetId = e.target.id;
    }

    if (hasError &&
        (checkIsNumber(targetId) ||
        targetId === "clear" ||
        targetId === "equals"          
        )) {
            clear();
            hasError = false;
    }
    else if (hasError) {
        return;
    }

    if (checkIsNumber(targetId)) {
        targetId = "numbers";
    }
    else if (checkIsOperator(targetId)) {
        targetId = "operators"
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
            setPreviousDisplay('');
            break;
        case "backspace":
            clickBackspace();
            break;
        default:
            console.log("Did not click a button");
    }
});