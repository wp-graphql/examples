// helpers.js
/**
 * External dependencies
 */
import { every } from 'lodash'

/**
 * Pause javascript execution
 * @param {number} ms - pause length in milliseconds 
 * @param {boolean} verbose - show pause progress in console.
 */
export const waitSync = (ms, verbose = false) => {
  const start = Date.now();
  let now = Date.now;
  let i = 0
  while (now - start < ms) {
    i = i + 1;
    now = Date.now();
    if (verbose) {
      console.log(i);
    }
  }
};

export const Validators = {
  TEXT: /^\w+$/.test,
  EMAIL: /^.+@.+$/.test,
  URL: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test,
  PHONE: /^\+?(\d.*){3,}$/.test,
  US_CANADA_POSTAL_CODE: /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/.test,
  BRAZILIAN_POSTAL_CODE: /^[0-9]{5}-[0-9]{3}$/.test,
  MIN_LENGTH: (length) => (value) => value.length >= length,
  MAX_LENGTH: (length) => (value) => value.length <= length,
};

export const createValidator = (validators = [Validators.TEXT]) => value => every(
  validators,
  test => test(value)
);