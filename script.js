let subCalculatorCount = 0;
let operations = []; // Stores operation choices between sub-calculators;

function addSubCalculator() {
  subCalculatorCount++;

  const subCalculatorDiv = document.createElement('div');
  subCalculatorDiv.className = 'sub-calculator';
  subCalculatorDiv.innerHTML = `
      <h2>Form ${subCalculatorCount}</h2>
      <div class="dropdown">
        <button class="dropdown-btn">Choose form ▼</button>
        <div class="dropdown-options">
          <button class="form-option">Cube</button>
          <button class="form-option">Prism</button>
          <button class="form-option">Pyramid</button>
          <button class="form-option">Steekkap</button>
        </div>
      </div>
      <div class="calculator">
      <div class="input-row">
          <div class="input-group">
            <label for="input-a-${subCalculatorCount}">A (m):</label>
            <input type="number" id="input-a-${subCalculatorCount}">
          </div>
          <div class="input-group">
            <label for="input-b-${subCalculatorCount}">B (m):</label>
            <input type="number" id="input-b-${subCalculatorCount}">
          </div>
          <div class="input-group">
            <label for="input-c-${subCalculatorCount}">C (m):</label>
            <input type="number" id="input-c-${subCalculatorCount}">
          </div>
        </div>
        <button class="calculate-btn" data-index="${subCalculatorCount}">Calculate</button>
        <p class="result">Vorm ${subCalculatorCount} Volume: <span class="value">0</span> m<sup>3</sup></p>
      </div>
      <div class="operation">
        <button class="add-btn">+</button>
        <button class="subtract-btn">-</button>
      </div>
    `;

  document.querySelector('.sub-calculators-container').appendChild(subCalculatorDiv);

  const dropdownBtn = subCalculatorDiv.querySelector('.dropdown-btn');
  const dropdown = subCalculatorDiv.querySelector('.dropdown');
  const dropdownOptions = subCalculatorDiv.querySelector('.dropdown-options');
  const formOptions = subCalculatorDiv.querySelectorAll('.form-option');
  const calculator = subCalculatorDiv.querySelector('.calculator');
  const calculateBtn = subCalculatorDiv.querySelector('.calculate-btn');
  const resultValue = subCalculatorDiv.querySelector('.value');
  const addBtn = subCalculatorDiv.querySelector('.add-btn');
  const subtractBtn = subCalculatorDiv.querySelector('.subtract-btn');

  dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });

  formOptions.forEach(option => {
    option.addEventListener('click', () => {
      dropdownBtn.textContent = option.textContent;
      dropdown.classList.remove('show');
      calculator.style.display = 'block';
    });
  });

  calculateBtn.addEventListener('click', (event) => {
    const index = event.target.getAttribute('data-index');
    const a = parseFloat(document.getElementById(`input-a-${index}`).value);
    const b = parseFloat(document.getElementById(`input-b-${index}`).value);
    const c = parseFloat(document.getElementById(`input-c-${index}`).value);
    const form = dropdownBtn.textContent;

    let result = 0;

    if (form === 'Kubus') {
      result = a * b * c;
    } else if (form === 'Prisma') {
      result = (a * b * c) / 2;
    } else if (form === 'Piramide') {
      result = (a * b * c) / 3;
    } else if (form === 'Steekkap') {
      result = (a * b * c) / 6;
    }

    resultValue.textContent = result.toFixed(2);
    updateCalculation();
  });

  addBtn.addEventListener('click', () => {
    if (subCalculatorDiv.nextElementSibling === null) {
      operations.push('+');
      addSubCalculator();
      updateOperationButtons();
      updateCalculation();
    }
  });

  subtractBtn.addEventListener('click', () => {
    if (subCalculatorDiv.nextElementSibling === null) {
      operations.push('-');
      addSubCalculator();
      updateOperationButtons();
      updateCalculation();
    }
  });
}

function updateOperationButtons() {
  const operationDivs = document.querySelectorAll('.operation');
  operationDivs.forEach((operationDiv, index) => {
    const addBtn = operationDiv.querySelector('.add-btn');
    const subtractBtn = operationDiv.querySelector('.subtract-btn');
    if (operations[index] === '+') {
      addBtn.classList.add('active');
      subtractBtn.classList.remove('active');
    } else if (operations[index] === '-') {
      addBtn.classList.remove('active');
      subtractBtn.classList.add('active');
    }

    // Toggle operation and update operations array on button click
    addBtn.addEventListener('click', () => {
      if (operations[index] !== '+') {
        operations[index] = '+';
        updateOperationButtons();
        updateCalculation();
      }
    });

    subtractBtn.addEventListener('click', () => {
      if (operations[index] !== '-') {
        operations[index] = '-';
        updateOperationButtons();
        updateCalculation();
      }
    });
  });
}

function updateCalculation() {
  const values = Array.from(document.querySelectorAll('.value')).map(span => parseFloat(span.textContent));

  let total = values[0];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === '+') {
      total += values[i + 1];
    } else if (operations[i] === '-') {
      total -= values[i + 1];
    }
  }

  document.querySelector('.total-result .value').textContent = total.toFixed(2);
}

//document.querySelector('.calculate-all-btn').addEventListener('click', updateCalculation);

document.querySelector('.clear-all-btn').addEventListener('click', () => {
  const subCalculatorsContainer = document.querySelector('.sub-calculators-container');
  subCalculatorsContainer.innerHTML = ''; // Remove existing sub-calculators
  
  const inputFields = document.querySelectorAll('input[type="number"]');
  const resultValues = document.querySelectorAll('.result .value');
  
  inputFields.forEach(input => (input.value = ''));
  resultValues.forEach(resultValue => (resultValue.textContent = '0'));
  
  operations = []; // Clear operations array
  
  // Reset form number
  subCalculatorCount = 0;
  
  // Update total volume to 0
  document.querySelector('.total-result .value').textContent = '0';
  
  // Add a new sub-calculator after clearing
  addSubCalculator();
});

// Show the first calculator by default
addSubCalculator();
