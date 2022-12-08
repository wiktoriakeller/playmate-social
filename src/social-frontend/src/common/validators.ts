export type ValidationCallback = (message: string) => void;
export type ValidationFunc = () => boolean;

export const validateRegex = (
  value: string,
  regex: RegExp,
  errorMessage: string,
  validationCallback: ValidationCallback
) => validate(regex.test(value), errorMessage, validationCallback);

export const validateMinLength = <Type extends { length: number }>(
  data: Type,
  minVal: number,
  errorMessage: string,
  validationCallback: ValidationCallback
) => validate(data.length >= minVal, errorMessage, validationCallback);

export const validateMaxLength = <Type extends { length: number }>(
  data: Type,
  maxValue: number,
  errorMessage: string,
  validationCallback: ValidationCallback
) => validate(data.length <= maxValue, errorMessage, validationCallback);

export const validateRange = <Type extends { length: number }>(
  data: Type,
  minValue: number,
  maxValue: number,
  errorMessage: string,
  validationCallback: ValidationCallback
) =>
  validate(
    data.length >= minValue && data.length <= maxValue,
    errorMessage,
    validationCallback
  );

export const validateEquality = (
  first: string,
  second: string,
  errorMessage: string,
  validationCallback: ValidationCallback
) => validate(first === second, errorMessage, validationCallback);

export const validate = (
  condition: boolean,
  errorMessage: string,
  validationCallback: ValidationCallback
): boolean => {
  if (condition) {
    validationCallback("");
    return true;
  }

  validationCallback(errorMessage);
  return false;
};

export const validateAll = (
  validate: boolean,
  validators: ValidationFunc[]
) => {
  if (validate) {
    let isError = false;
    validators.forEach((validationFunc) => {
      const result = validationFunc();
      if (!result) {
        isError = true;
      }
    });

    return isError;
  }
};
