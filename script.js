let firstNum = 0;
let operator = '+';
let secondNum = 0;
let display = document.querySelector(".display");
let numbers = document.querySelector(".numbers");
let displayValue = 0;

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

function populateDisplay(number) {
    displayValue = number;
    display.textContent = number;
}

numbers.addEventListener("click", (event) => {
    populateDisplay(parseInt(event.target.textContent));
});