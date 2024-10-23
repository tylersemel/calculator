let firstNum = '';
let operator = '';
let secondNum = '';
let display = document.querySelector(".display");
const numbers = document.querySelector(".numbers");
const functions = document.querySelector(".functions");

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
            add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
            break;
        default:
            console.log("Incorrect operator");
    }
}

function populateDisplay(value) {
    displayValue = parseInt(value);
    display.textContent = parseInt(value);
}

numbers.addEventListener("click", (e) => {
    if (!afterOperator) {
        firstNum += e.target.textContent;
        populateDisplay(firstNum);
    }
    else {
        secondNum += e.target.textContent;
        populateDisplay(secondNum);
    }
});



//where to get the operator
functions.addEventListener("click", (e) => {
    if (firstNum == '') {
        return;
    }

    
    populateDisplay(e.target.textContent);
})