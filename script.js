let display = document.getElementById('display');
let currentValue = '';
let currentOperation = '';
let allowNextInput = true;

display.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        appendNumber(e.key);
    } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
        operation(e.key);
    }
    else if (e.key == "Enter" || e.key == "=") {
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

function operation(op) {
    if (currentOperation) calculate(); //Calculate if there is an operation in course
    currentOperation = op;
    currentValue += ' ' + op + ' ';
    display.value = currentValue;
    allowNextInput = true; //Let new entry
}

function calculate() {
    console.log(eval(currentValue));
    try {
        let calculation = currentValue;
        let result = eval(currentValue);
        display.value = result;
        currentValue = result.toString();
        currentOperation = "";
        addToHistory(calculation, result);
    } catch (error) {
        display.value = 'Error';
    }
    allowNextInput = false; //Inhabilitates the entry after calculation
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

function addToHistory(calculation, result) {
    const history = document.getElementById("history");

    if (display.value === '') return;

    const li = document.createElement('li');
    li.textContent = calculation + " = " + result;
    history.appendChild(li);
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