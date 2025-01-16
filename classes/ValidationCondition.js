class ValidationCondition {
  constructor(checkFunction, failMessage) {
    this.checkFunction = checkFunction;
    this.failMessage = failMessage;
  }

  check(value) {
    return this.checkFunction(value);
  }

  getMessage() {
    return this.failMessage;
  }
}

module.exports = ValidationCondition;
