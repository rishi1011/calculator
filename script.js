const divideOperator = document.getElementById('divide').textContent;
const multiplyOperator = document.getElementById('multiply').textContent;
const subtractOperator = document.getElementById('subtract').textContent;
const addOperator = document.getElementById('add').textContent;
const clearKey = document.getElementById('clear').textContent;
const delKey = document.getElementById('del').textContent;
const equalKey = document.getElementById('equal').textContent;
const decimalPoint = document.getElementById('point').textContent;

const enterKey = 'Enter';
const backspaceKey = 'Backspace';
const escapeKey = 'Escape';

const buttons = document.querySelectorAll('.keypad > button');
const currentValue = document.getElementById("currentValue");
const result = document.getElementById("result");

let displayValue = "0";
let topValue = "";

buttons.forEach(button => {
    // console.log(button);
    button.addEventListener('click', (event) => {
        console.log(event)
        let value = event.target.textContent;
        changeResultValue(value);
    })
});

window.addEventListener('keydown', (event) => {
    changeResultValue(event.key);
    event.preventDefault();
})

function changeResultValue(value) {
    if (value === equalKey || value === enterKey) {
        if (!isInt(displayValue) && !isFloat(displayValue) && includesOperator(topValue + displayValue)) {
            topValue += displayValue + ' =';
            displayValue = '';
            let expression = ('' + topValue).trim().split(" ");
            if (expression.length > 2) {
                displayValue = operate(+expression[0], +expression[2], expression[1]);
            }
        }
    } else if (value === delKey || value === backspaceKey) {
        if (isInt(displayValue) || isFloat(displayValue) || (topValue === "" && +displayValue <= 9)) {
            clearDisplay();
        } else {
            if (displayValue === "") {
                displayValue = topValue.split(" ").join("");
                topValue = "";
            }
            displayValue = displayValue.slice(0, -1);
        }
    } else if (value === clearKey || value === escapeKey) {
        clearDisplay();
    } else if (isOperator(value)) {
        if (topValue !== '') {
            topValue += displayValue;
            let expression = ('' + topValue).trim().split(" ");
            if (expression.length > 2) {
                topValue = operate(+expression[0], +expression[2], expression[1]);
            }
            displayValue = '';
            topValue += ' ' + value + ' ';
        } else if (displayValue !== '') {
            topValue = displayValue + ' ' + value + ' ';
            displayValue = '';
        }
    } else if (value === decimalPoint) {
        if (!displayValue.includes(decimalPoint))
            displayValue += value;
    } else if (isNumberInAString(value)) {
        if (displayValue === "0")
            displayValue = value;
        else if (isInt(displayValue) || isFloat(displayValue)) {
            displayValue = value;
            topValue = "";
        }
        else
            displayValue += value;
    }
    displayContent();
}

// function computeResult() {
    
// }

function includesOperator(string) {
    const arr = string.split(" ");
    for (let i = 0; i < arr.length; i++){
        if (isOperator(arr[i])) {
            return true;
        }
    }
    return false;
}

function clearDisplay() {
    displayValue = "0";
    topValue = "";
}

function isNumberInAString(value) {
    if (typeof value === 'string' && +value >= 0 && +value <= 9) {
        return true;
    }
    return false;
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