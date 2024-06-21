// script.js

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.textContent = displayValue;
}

updateDisplay();

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('operator')) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }

        updateDisplay();
    });
});

function handleNumber(value) {
    if (waitingForSecondValue) {
        displayValue = value;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? value : displayValue + value;
    }
}

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null && !isNaN(value)) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }

    return second;
}
