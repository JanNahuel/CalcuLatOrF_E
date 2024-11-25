// Seleccionamos el campo de pantalla
const display = document.getElementById('display');

// Variables para almacenar el estado actual de la operación
let currentInput = ''; // Entrada actual
let operator = null;   // Operador actual
let previousInput = ''; // Entrada anterior

// Seleccionamos todos los botones de la calculadora
const buttons = document.querySelectorAll('.button');

// Agregamos un event listener para cada botón
buttons.forEach(button => {
    button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
        clearDisplay();
    } else if (value === '=') {
        calculate();
    } else if (['+', '-', '*', '/'].includes(value)) {
        setOperator(value);
    } else {
        appendNumber(value);
    }
});
});

// Función para limpiar la pantalla
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.value = '';
}

// Función para agregar números y el punto decimal
function appendNumber(value) {
  if (value === '.' && currentInput.includes('.')) return; // Evita múltiples puntos decimales
    currentInput += value;
    display.value = currentInput;
}

// Función para definir el operador y almacenar el valor anterior
function setOperator(op) {
  if (currentInput === '') return; // No hacer nada si no hay número ingresado
  if (previousInput) calculate(); // Calcula si ya hay una operación en curso
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Función para realizar el cálculo
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return; // Evita cálculos inválidos

    switch (operator) {
    case '+':
        result = prev + current;
        break;
    case '-':
        result = prev - current;
        break;
    case '*':
      result = prev * current;
        break;
    case '/':
        result = prev / current;
        break;
    default:
        return;
}

    display.value = result;
    currentInput = result.toString();
    previousInput = '';
    operator = null;
}
