let firstNum = '';
let operator = '';
let secondNum = '';
let displayValue = '0';
let prevDisplayValue = '';
let firstNumFilled = false;
let hasError = false;

const PRECISION = 5;
const ERROR_MESSAGE = "Hrmmm not quite";
const buttons = document.querySelector("#buttons");
const decimalBtn = document.querySelector("#decimal");

let display = document.querySelector(".display");
let prevDisplay = document.querySelector(".previous-display");

function checkWholeNumber(num) {
    return num % 1 === 0;
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
        setError(ERROR_MESSAGE);
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
        case '×':
            result = multiply(a, b);
            break;
        case '÷':
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
function setError(error) {
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
 * Set the display for the previous calculations. If the previous
 * solution was pressed with the equals, then that is added.
 */
function setPreviousDisplay(value) {
    prevDisplay.textContent = value;
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

function setFirstNum(val) {
    firstNum = firstNum.toString();

    if ((firstNum === '' || firstNum === '0') && val === '.') {
        firstNum = '0.';
    }
    else {
        firstNum = firstNum === '0' ? val : firstNum + val;
    }
}

function setSecondNum(val) {
    secondNum = secondNum.toString();
    
    if ((secondNum === '' || secondNum === '0') && val === '.') {
        secondNum = '0.';
    }
    else {
        secondNum = secondNum === '0' ? val : secondNum + val;
    }
}

/**
 * When a number button is clicked. Set firstNum or secondNum depending on
 * where in the calculation the user is.
 * @param {string} numberText 
 */
function clickNumber(numberText) {
    if (!firstNumFilled) {
        setFirstNum(numberText);
        setDisplay(firstNum);
    }
    else {
        setSecondNum(numberText);
        setDisplay(secondNum);
    }
}

/**
 * When an operator button is clicked. If firstNum is empty, do nothing. Otherwise
 * set that the first num has been filled along with setting the operator.
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
        setFirstNum(clickEquals().toString());
        firstNumFilled = true;
    }

    if (!hasError) {
        if (decimalBtn.disabled) {
            decimalBtn.toggleAttribute('disabled');
        }
        operator = operatorText;
        setPreviousDisplay(`${firstNum} ${operator}`);
    }
}

/**
 * If either number is empty, nothing is to be done. Otherwise, calculate
 * the solution of firstNum and secondNum and display that solution (if not null).
 * @returns The solution of two numbers and their operator.
 */
function clickEquals() {
    if (firstNum === '' || secondNum === '') return;

    if (decimalBtn.disabled) {
        decimalBtn.toggleAttribute('disabled');
    }

    const solution = operate(operator, parseFloat(firstNum), parseFloat(secondNum));

    if (solution !== null) {
        setDisplay(solution.toString());
        setPreviousDisplay(`${firstNum} ${operator} ${secondNum} =`);
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

    if (!firstNumFilled) {
        setFirstNum('.');
        setDisplay(firstNum);
    }
    else {
        setSecondNum('.');
        setDisplay(secondNum);
    }

    decimalBtn.toggleAttribute('disabled');
}

function removeCharacter(num) {
    num = num.toString();

    if ((num.length === 2 && num.at(0) === '-') || num.length === 1) {
        return '0';
    }
    else {
        return num.slice(0, num.length - 1);
    }
}

/**
 * Undo last input (not including the operator).
 */
function clickBackspace() { 
    if (!firstNumFilled && firstNum !== '') {
        firstNum = removeCharacter(firstNum);
        setDisplay(firstNum);
    }
    else if (secondNum !== '') {
        secondNum = removeCharacter(secondNum);
        setDisplay(secondNum);
    }  
}

function checkIsNumber(targetId) {
    const numbers = "0123456789";
    return numbers.includes(targetId);
}

function checkIsOperator(targetId) {
    const operators ="+-*/";
    return operators.includes(targetId);
}

function changeSign(num) {
    num = parseFloat(num);
    num = num - (num * 2);
    num = num.toString();
    return num;
}

function clickChangeSign() {
    if (firstNum === '' && displayValue !== '') {
        firstNum = displayValue;
    }

    if (!firstNumFilled && firstNum !== '' && displayValue !== '') {
        firstNum = changeSign(firstNum);
        setDisplay(firstNum);
    }
    else if (secondNum !== '') {
        secondNum = changeSign(secondNum);
        setDisplay(secondNum);
    }  
}

function checkError(targetId) {
    if (hasError &&
        (targetId === "numbers" ||
        targetId === "clear" ||
        targetId === "equals"          
        )) {

        clear();
        hasError = false;
        return false;
    }
    else if (hasError) {
        return true;
    }

    return false;
}

/**
 * Clears only the current display
 */
function clickClearLine() {
    setDisplay('0');
    
    if (!firstNumFilled && (firstNum !== '' || (firstNum !== display && secondNum === ''))) {
        firstNum = '';
        setPreviousDisplay('');
    }
    else if (secondNum !== '') {
        secondNum = '';
    }
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

    if (checkIsNumber(targetId)) {
        targetId = "numbers";
    }
    else if (checkIsOperator(targetId)) {
        targetId = "operators"
    }

    if (checkError(targetId)) return;

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
        case "change-sign":
            clickChangeSign();
            break;
        case "clear-line":
            clickClearLine();
            break;
        default:
            console.log("Did not click a button");
    }
});