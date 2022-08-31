import { isValidEmail, isValidLogin, isValidMessage, isValidName, isValidPassword, isValidPhone } from "../utils/validation";

type TKeys =
  'oldPassword' |
  'newPassword' |
  'repeatPassword' |
  "password" |
  'email' |
  'login' |
  'first_name' |
  'second_name' |
  'phone' |
  'message';

type TValidatorData = {
  [key in TKeys]?: string;
};

type TStateForm = {
  isDisabled: boolean
};

export function useValidator() {
  const errors: TValidatorData = {};
  const values: TValidatorData = {};
  const stateForm: TStateForm = {
    isDisabled: false
  };

  const _setValues = (newValues: TValidatorData = {}) => {
    Object.entries(newValues).forEach(([key, value]: [TKeys, string]) => {
      values[key] = value;
    })
  };

  const _setErrors = (values: TValidatorData = {}) => {
      Object.entries(values).forEach(([key, value]: [TKeys, string]) => {
        switch (key) {
          case 'oldPassword':
            errors[key] = isValidPassword(value);
            break;
          case 'newPassword':
            errors[key] = isValidPassword(value);
            break;
          case 'repeatPassword':
            errors[key] = isValidPassword(value);
            break;
          case 'password':
            errors[key] = isValidPassword(value);
            break;
          case 'email':
            errors[key] = isValidEmail(value);
            break;
          case 'login':
            errors[key] = isValidLogin(value);
            break;
          case 'first_name':
            errors[key] = isValidName(value);
            break;
          case 'second_name':
            errors[key] = isValidName(value);
            break;
          case 'phone':
            errors[key] = isValidPhone(value);
            break;
          case 'message':
            errors[key] = isValidMessage(value);
            break;
        }
      });
  }

  const _setDisabledForm = () => {
    stateForm.isDisabled = Object.values(errors).some(err => err.length !== 0)
  }

  const init = (initValues: TValidatorData = {}): void => {
    _setValues(initValues);
    _setErrors(initValues);
    _setDisabledForm();
  }

  const onChangeValues = ( elem: HTMLElement) => {
    let newValues = {};
    if (elem instanceof HTMLInputElement) {
      newValues = _getInputData(elem)
    } else {
      newValues = _getFormData(elem)
    }
    _setValues(newValues);
    _setErrors(newValues);
    _setDisabledForm();
  }

  const _getFormData = ( elem: HTMLElement ) => {
    const inputsNodeList = elem.querySelectorAll('input');
    const inputs: HTMLInputElement[] = Array.from(inputsNodeList);
    const formValues: Record<string, string> = {};
    inputs.forEach(input => {
      formValues[input.name] = input.value
    })
    return formValues;
  }

  const _getInputData = ( elem: HTMLInputElement ) => {
    const { name, value } = elem;
    const valueObj: Record<string, string> = {};
    valueObj[name] = value;
    return valueObj;
  }

  return { errors, values, stateForm, init, onChangeValues };
}
