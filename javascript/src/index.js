/* eslint-disable no-throw-literal */
import './style.css';

const ADDITION_ID = 'js-addition';
const BACK_ID = 'js-back';
const CANCEL_ID = 'js-cancel';
const CLEAR_ID = 'js-clear';
const COMMA_ID = 'js-comma';
const DISPLAY_ID = 'js-display';
const DIVIDE_ID = 'js-divide';
const EQUAL_ID = 'js-equal';
const FRACTION_ID = 'js-fraction';
const HISTORY_CONTAINER_CLASS_SELECTOR = '.calculator__history-container';
const IS_VISIBLE_CLASS_SELECTOR = 'is-visible';
const HISTORY_BUTTON_ID = 'js-history';
const INVERT_ID = 'js-invert';
const MEMORY_ADD_ID = 'js-M+';
const MEMORY_CLEAR_ID = 'js-MC';
const MEMORY_MINUS_ID = 'js-M-';
const MEMORY_READ_ID = 'js-MR';
const MEMORY_SET_ID = 'js-MS';
const MULTIPLY_ID = 'js-multiply';
const NUMBER_OF_NUMBERS_IN_KEYBOARD = 10;
const NUMBER_CLASS_SELECTOR = '.calculator__button--is-number';
const PERCENT_ID = 'js-percent';
const POWER_ID = 'js-power';
const SUBSTRACTION_ID = 'js-subtraction';
const SQUARE_ID = 'js-square';

class Calculator {
  constructor() {
    this.memoryValue = 0;
    this.displayValue = 0;
    this.previousValue = null;
    this.selectedFunction = null;
    this.isFunctionDone = false;
    this.repeatedValue = 0;
    this.wasEqualClicked = false;
    this.wasSpecialFunctionClicked = false;

    this.bindToDisplay();
    this.bindToNumbers();
    this.bindToButtons();
  }

  bindToDisplay() {
    const display = document.getElementById(DISPLAY_ID);

    if (!display) {
      throw 'Nie znaleziono elementu dla wyświetlacza';
    }

    display.textContent = this.displayValue;
    this.display = display;
  }

  bindToNumbers() {
    const numbers = document.querySelectorAll(NUMBER_CLASS_SELECTOR);

    if (numbers.length !== NUMBER_OF_NUMBERS_IN_KEYBOARD) {
      console.warn('W klawiaturze brakuje cyfr');
    }

    numbers.forEach((number) => number.addEventListener('click', (e) => this.concatenateNumber(e)));
  }

  bindToButtons() {
    this.bindFunctionToButton(MEMORY_CLEAR_ID, () => this.memoryClear());
    this.bindFunctionToButton(MEMORY_READ_ID, () => this.memoryRead());
    this.bindFunctionToButton(MEMORY_ADD_ID, () => this.memoryAdd());
    this.bindFunctionToButton(MEMORY_MINUS_ID, () => this.memoryMinus());
    this.bindFunctionToButton(MEMORY_SET_ID, () => this.memorySet());
    this.bindFunctionToButton(CLEAR_ID, () => this.clear());
    this.bindFunctionToButton(CANCEL_ID, () => this.cancel());
    this.bindFunctionToButton(ADDITION_ID, () => this.addition());
    this.bindFunctionToButton(SUBSTRACTION_ID, () => this.substraction());
    this.bindFunctionToButton(MULTIPLY_ID, () => this.multiplication());
    this.bindFunctionToButton(DIVIDE_ID, () => this.divide());
    this.bindFunctionToButton(EQUAL_ID, () => this.equal());
    this.bindFunctionToButton(BACK_ID, () => this.back());
    this.bindFunctionToButton(INVERT_ID, () => this.inversion());
    this.bindFunctionToButton(COMMA_ID, () => this.addComma());
    this.bindFunctionToButton(PERCENT_ID, () => this.percent());
    this.bindFunctionToButton(SQUARE_ID, () => this.square());
    this.bindFunctionToButton(POWER_ID, () => this.power());
    this.bindFunctionToButton(FRACTION_ID, () => this.fraction());
    this.bindFunctionToButton(HISTORY_BUTTON_ID, () => this.showHistyory());
  }

  bindFunctionToButton(id, callback) {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Nie znaleziono elementu o id ${id}`);

      return;
    }
    element.addEventListener('click', () => callback());
  }

  concatenateNumber(e) {
    this.displayValue =
      this.displayValue === null || this.displayValue === 0 || this.wasSpecialFunctionClicked
        ? e.target.textContent
        : this.displayValue + e.target.textContent;

    if (this.wasEqualClicked) {
      this.previousValue = 0;
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

  showHistyory() {
    const historyContainer = document.querySelector(HISTORY_CONTAINER_CLASS_SELECTOR);
    historyContainer.classList.toggle(IS_VISIBLE_CLASS_SELECTOR);
  }

  changeDisplayValue(value) {
    const isNoValue = value === null || value === '';

    this.displayValue = value;
    this.display.textContent = isNoValue ? '0' : value.toString();
  }
}

new Calculator();
