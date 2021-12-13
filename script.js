const divideOperator = document.getElementById('divide').childNodes[0].textContent;
const multiplyOperator = document.getElementById('multiply').childNodes[0].textContent;
const subtractOperator = document.getElementById('subtract').childNodes[0].textContent;
const addOperator = document.getElementById('add').childNodes[0].textContent;
const clearKey = document.getElementById('clear').childNodes[0].textContent;
const delKey = document.getElementById('del').childNodes[0].textContent;
const equalKey = document.getElementById('equal').childNodes[0].textContent;

const buttons = document.querySelectorAll('.keypad > button');
const currentValue = document.getElementById("currentValue");
const result = document.getElementById("result");

let displayValue = "0";
let topValue = "";

buttons.forEach(button => {
    // console.log(button);
    button.addEventListener('click', changeResultValue)
});

function changeResultValue(event) {
    let value = event.target.textContent;
    if (value === equalKey) {
        console.log()
        topValue += displayValue + ' =';
        displayValue = '';
        let expression = ('' + topValue).trim().split(" ");
        console.log(expression)
        if (expression.length > 2) {
            displayValue = operate(+expression[0], +expression[2], expression[1]);
        }
    } else if (value === delKey) {
        if (isInt(displayValue) || isFloat(displayValue)) {
            displayValue = "0";
            topValue = "";
        } else {
            if (displayValue === "") {
                displayValue = topValue.split(" ").join("");
                console.log(displayValue);
                topValue = "";
            }
            displayValue = displayValue.slice(0, -1);
        }
    } else if (value === clearKey) {
        displayValue = "0";
        topValue = "";
    } else if (isOperator(value)) {
        if (displayValue !== "") {
            topValue = displayValue + ' ' + value + ' ';
            displayValue = '';
        }
    } else if (displayValue === "0" || isInt(displayValue) || isFloat(displayValue)) {
        displayValue = value;
        topValue = "";
    } else {
        displayValue += value;
    }
    displayContent();
}

function displayContent() {
    currentValue.innerText = displayValue;
    result.innerText = topValue;
}

function isOperator(value) {
    if (value === addOperator || value === subtractOperator || value === multiplyOperator || value === divideOperator) {
        return true;
    }
    return false;
}

const operate = (a, b, operator) => {
    if (operator === addOperator)
        return add(a, b);
    else if (operator === subtractOperator)
        return subtract(a, b);
    else if (operator === multiplyOperator)
        return multiply(a, b);
    else if (operator === divideOperator)
        return divide(a, b);
}

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

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}