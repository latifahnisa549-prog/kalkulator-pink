let currentNumber = "0";
let previousNumber = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const history = document.getElementById("history");


function updateDisplay() {
    display.textContent = currentNumber;
}


/* =========================
   ANGKA
========================= */

function appendNumber(number) {

    if (currentNumber === "0" || shouldResetDisplay) {
        currentNumber = number;
        shouldResetDisplay = false;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


/* =========================
   DESIMAL
========================= */

function appendDecimal() {

    if (shouldResetDisplay) {
        currentNumber = "0";
        shouldResetDisplay = false;
    }

    if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }

    updateDisplay();
}


/* =========================
   OPERATOR
========================= */

function chooseOperator(selectedOperator) {

    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }

    previousNumber = parseFloat(currentNumber);

    operator = selectedOperator;

    shouldResetDisplay = true;

    history.textContent =
        previousNumber + " " + getOperatorSymbol(operator);
}


/* =========================
   HITUNG
========================= */

function calculate() {

    if (operator === null || previousNumber === null) {
        return;
    }

    const current = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = previousNumber + current;
            break;

        case "-":
            result = previousNumber - current;
            break;

        case "*":
            result = previousNumber * current;
            break;

        case "/":

            if (current === 0) {
                currentNumber = "Tidak bisa ÷ 0";
                operator = null;
                previousNumber = null;

                updateDisplay();

                history.textContent = "";

                shouldResetDisplay = true;

                return;
            }

            result = previousNumber / current;
            break;
    }

    history.textContent =
        previousNumber +
        " " +
        getOperatorSymbol(operator) +
        " " +
        current +
        " =";

    currentNumber = formatResult(result);

    operator = null;
    previousNumber = null;

    shouldResetDisplay = true;

    updateDisplay();
}


/* =========================
   FORMAT HASIL
========================= */

function formatResult(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }

    return parseFloat(number.toFixed(10)).toString();
}


/* =========================
   SIMBOL OPERATOR
========================= */

function getOperatorSymbol(operator) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[operator];
}


/* =========================
   CLEAR
========================= */

function clearDisplay() {

    currentNumber = "0";
    previousNumber = null;
    operator = null;

    shouldResetDisplay = false;

    history.textContent = "";

    updateDisplay();
}


/* =========================
   HAPUS SATU ANGKA
========================= */

function deleteNumber() {

    if (shouldResetDisplay) {
        return;
    }

    if (
        currentNumber.length === 1 ||
        currentNumber === "Tidak bisa ÷ 0" ||
        currentNumber === "Error"
    ) {
        currentNumber = "0";
    } else {
        currentNumber =
            currentNumber.slice(0, -1);
    }

    updateDisplay();
}


/* =========================
   PERSEN
========================= */

function percentage() {

    const number = parseFloat(currentNumber);

    if (!isNaN(number)) {
        currentNumber = formatResult(number / 100);
        updateDisplay();
    }
}


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key);
    }

    else if (key === ".") {
        appendDecimal();
    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {
        chooseOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

    else if (key === "Backspace") {
        deleteNumber();
    }

    else if (key === "%") {
        percentage();
    }

});
