export class CalculatorStore {
  memoryValue = 0;
  displayValue = 0;
  previousValue = null;
  selectedFunction = null;
  isFunctionDone = false;
  repeatedValue = 0;
  wasEqualClicked = false;
  wasSpecialFunctionClicked = false;
  history = null;
  display = null;

  set displayElement(element) {
    this.display = element;
  }

  set historyElement(element) {
    this.history = element;
  }

  concatenateNumber(e) {
    this.displayValue =
      this.displayValue === null || this.displayValue === 0 || this.wasSpecialFunctionClicked
        ? e.target.textContent
        : this.displayValue + e.target.textContent;

    if (this.wasEqualClicked) {
      this.previousValue = null;
      this.repeatedValue = 0;
      this.wasEqualClicked = false;
    }
    this.wasSpecialFunctionClicked = false;
    this.isFunctionDone = false;
    this.display.textContent = this.displayValue;
  }

  memoryClear() {
    this.wasSpecialFunctionClicked = true;
    this.memoryValue = 0;
  }

  memoryRead() {
    this.wasSpecialFunctionClicked = true;
    this.changeDisplayValue(this.memoryValue);
  }

  memoryAdd() {
    this.wasSpecialFunctionClicked = true;
    this.memoryValue = this.memoryValue + Number(this.displayValue);
  }

  memoryMinus() {
    this.wasSpecialFunctionClicked = true;
    this.memoryValue = this.memoryValue - Number(this.displayValue);
  }

  memorySet() {
    this.wasSpecialFunctionClicked = true;
    this.memoryValue = Number(this.displayValue);
  }

  clear() {
    this.previousValue = null;
    this.selectedFunction = null;
    this.changeDisplayValue(null);
    this.memoryValue = 0;
  }

  cancel() {
    this.changeDisplayValue(null);
  }

  addition(hasRepeatedValue) {
    this.callPreviousFunctionAndAssignNew(this.addition, hasRepeatedValue);
    if (this.isFunctionDone) {
      this.setValuesForIsFunctionDone();

      return;
    }

    const [displayValue, previousValue] = this.getDisplayAndPreviousValue(hasRepeatedValue);
    const newValue = displayValue + previousValue;

    this.createHistoryElement(previousValue, `+`, displayValue, newValue);

    this.getRepeatedValue(hasRepeatedValue, newValue);
    this.setValuesAfterSettingNewValue(newValue);
  }

  substraction(hasRepeatedValue) {
    this.callPreviousFunctionAndAssignNew(this.substraction, hasRepeatedValue);
    if (this.isFunctionDone) {
      this.setValuesForIsFunctionDone();

      return;
    }

    const [displayValue, previousValue] = this.getDisplayAndPreviousValue(hasRepeatedValue);
    let newValue;

    if (this.previousValue !== null) {
      newValue = hasRepeatedValue ? displayValue - this.repeatedValue : previousValue - displayValue;

      this.getRepeatedValue(hasRepeatedValue, newValue);
    }

    this.createHistoryElement(previousValue, `-`, displayValue, newValue);

    this.setValuesAfterSettingNewValue(newValue);
  }

  multiplication(hasRepeatedValue) {
    this.callPreviousFunctionAndAssignNew(this.multiplication, hasRepeatedValue);
    if (this.isFunctionDone) {
      this.setValuesForIsFunctionDone();

      return;
    }

    const [displayValue, previousValue] = this.getDisplayAndPreviousValue(hasRepeatedValue);
    const newValue = displayValue * previousValue;

    this.createHistoryElement(previousValue, `*`, displayValue, newValue);

    this.getRepeatedValue(hasRepeatedValue, newValue);
    this.setValuesAfterSettingNewValue(newValue);
  }

  divide(hasRepeatedValue) {
    this.callPreviousFunctionAndAssignNew(this.divide, hasRepeatedValue);
    if (this.isFunctionDone) {
      this.setValuesForIsFunctionDone();

      return;
    }

    const [displayValue, previousValue] = this.getDisplayAndPreviousValue(hasRepeatedValue);
    const newValue = hasRepeatedValue
      ? displayValue / this.repeatedValue
      : previousValue === 0
      ? displayValue
      : previousValue / displayValue;

    this.createHistoryElement(previousValue, `/`, displayValue, newValue);

    this.getRepeatedValue(hasRepeatedValue, newValue);
    this.setValuesAfterSettingNewValue(newValue);
  }

  equal() {
    this.isFunctionDone = false;
    if (!this.wasEqualClicked) {
      this.selectedFunction(false);
    } else {
      this.selectedFunction(true);
    }

    this.wasEqualClicked = true;
  }

  power() {
    this.callSpecialFunction(this.displayValue ** 2);
  }

  square() {
    this.callSpecialFunction(Math.sqrt(this.displayValue));
  }

  percent() {
    this.callSpecialFunction((this.previousValue * this.displayValue) / 100);
  }

  fraction() {
    if (this.displayValue !== 0) {
      this.callSpecialFunction(1 / this.displayValue);
    }
  }

  callSpecialFunction(value) {
    this.wasSpecialFunctionClicked = true;
    this.wasEqualClicked = false;
    this.changeDisplayValue(value);
  }

  inversion() {
    this.changeDisplayValue(this.displayValue >= 0 ? -Math.abs(this.displayValue) : Math.abs(this.displayValue));
  }

  back() {
    this.changeDisplayValue(this.displayValue ? this.displayValue.slice(0, -1) : null);
  }

  addComma() {
    if (!this.display.textContent.includes('.')) {
      this.changeDisplayValue(`${this.displayValue ? this.displayValue : '0'}.`);
    }
  }

  callPreviousFunctionAndAssignNew(currentFunction, hasRepeatedValue) {
    if (this.selectedFunction !== currentFunction && this.selectedFunction) {
      this.selectedFunction(hasRepeatedValue);
    }
    this.selectedFunction = currentFunction;
  }

  setValuesForIsFunctionDone() {
    this.repeatedValue = Number(this.previousValue);
    this.displayValue = 0;
    this.wasEqualClicked = false;
  }

  getDisplayAndPreviousValue(hasRepeatedValue) {
    const displayValue = Number(this.display.textContent);
    const previousValue = hasRepeatedValue ? this.repeatedValue : Number(this.previousValue);

    return [displayValue, previousValue];
  }

  getRepeatedValue(hasRepeatedValue, newValue) {
    this.repeatedValue = hasRepeatedValue
      ? this.repeatedValue
      : this.wasEqualClicked
      ? newValue
      : Number(this.display.textContent);
  }

  setValuesAfterSettingNewValue(newValue) {
    this.isFunctionDone = true;
    this.wasEqualClicked = false;
    this.displayValue = null;
    this.display.textContent = this.previousValue !== null ? newValue : this.display.textContent;
    this.previousValue = this.previousValue !== null ? newValue : this.display.textContent;
  }

  createHistoryElement(firstValue, char, secondValue, result) {
    const paragraph = document.createElement('p');
    paragraph.classList.add('calculator__history-element');
    paragraph.textContent = `${firstValue} ${char} ${secondValue} = ${result}`;

    this.history.insertAdjacentElement('afterbegin', paragraph);
  }

  // showHistoryContainer() {
  //   const historyContainer = document.querySelector(HISTORY_CONTAINER_CLASS_SELECTOR);
  //   historyContainer.classList.toggle(IS_VISIBLE_CLASS_SELECTOR);
  // }

  changeDisplayValue(value) {
    const isNoValue = value === null || value === '';

    this.displayValue = value;
    this.display.textContent = isNoValue ? '0' : value.toString();
  }
}
