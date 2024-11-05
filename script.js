let display = document.getElementById('display');
let currentValue = '';
let currentOperation = '';
let allowNextInput = true;

display.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        appendNumber(e.key);
    } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
        operation(e.key);
    } else if (e.key === ".") { // Decimal point
        appendDecimal();
    } else if (e.key === "^") { // Power
        operation("^");
    } else if (e.key == "Enter" || e.key == "=") {
        calculate();
    } else if (e.key === "Escape") { // Esc to clean
        clearDisplay();
    } else if (e.key === "Backspace") { // Delete last
        deleteLastEntry();
    }
});

function appendNumber(number) {
    if (!allowNextInput) clearDisplay(); //After result reset display
    currentValue += number;
    display.value = currentValue;
}

function appendDecimal() {
    if (!allowNextInput) clearDisplay(); // Reset display after a result
    // Prevent multiple decimals
    if (!currentValue.includes('.')) {
        currentValue += currentValue === '' ? '0.' : '.';
        display.value = currentValue;
    }
}

function operation(op) {
    if (currentValue === '' || isNaN(currentValue.slice(-1))) {
        return;
    }
    if (currentOperation) calculate(); //Calculate if there is an operation in course
    currentOperation = op;
    currentValue += ' ' + op + ' ';
    display.value = currentValue;
    allowNextInput = true; //Let new entry
}

function calculate() {
    try {
        let calculation = currentValue;
        if (currentValue.includes('^')) {
            const [base, exponent] = currentValue.split(' ^ ');
            const result = Math.pow(parseFloat(base), parseFloat(exponent));
            display.value = parseFloat(result.toFixed(4));
            currentValue = result.toString();
            addToHistory(`${base} ^ ${exponent}`, result);
        } else {
            let result = parseFloat(eval(currentValue).toFixed(4));
            display.value = result;
            addToHistory(calculation, display.value);
            currentValue = result.toString();
        }
        currentOperation = "";
    } catch (error) {
        display.value = 'Error';
    }
    allowNextInput = false; //Disable further input until resets
}

function clearDisplay() {
    currentValue = '';
    currentOperation = "";
    display.value = "";
    allowNextInput = true;
}

function deleteLastEntry() {
    currentValue = currentValue.trim().slice(0, -1); // Deletes last character
    display.value = currentValue;
}

function calculatePercentage() {
    if (currentValue) {
        currentValue = (parseFloat(currentValue) / 100).toString();
        display.value = parseFloat(currentValue).toString();
        addToHistory(`${originalValue}%`, currentValue);
    }
}

function calculateSquareRoot() {
    if (currentValue) {
        let originalValue = currentValue;
        let result = Math.sqrt(parseFloat(currentValue));
        currentValue = result.toFixed(4).toString();
        display.value = currentValue;
        addToHistory(`√${originalValue}`, result);
    }
}

function addToHistory(calculation, result) {
    const history = document.getElementById("history");

    if (display.value === '') return;

    const li = document.createElement('li');
    let text = calculation + " = " + result;
    li.textContent = text;
    history.appendChild(li);
    let lastOperation = document.getElementById("lastOperation");
    lastOperation.textContent = text;
}

function showTab(tab) {
    const calculatorTab = document.getElementById("calculator-tab");
    const historyTab = document.getElementById("history-tab");
    const calculatorButton = document.getElementById("tab-calculator");
    const historyButton = document.getElementById("tab-history");

    if (tab === 'calculator') {
        calculatorTab.style.display = 'flex';
        historyTab.style.display = 'none';
        calculatorButton.classList.add('active-tab');
        historyButton.classList.remove('active-tab');
        document.getElementById("display").focus();
    } else if (tab === 'history') {
        calculatorTab.style.display = 'none';
        historyTab.style.display = 'flex';
        calculatorButton.classList.remove('active-tab');
        historyButton.classList.add('active-tab');
    }
}

function toggleSign() {
    if (currentValue) {
        currentValue = currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue;
        display.value = currentValue;
    }
}

