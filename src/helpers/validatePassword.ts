export const checkLengthPassword = (password: string) =>
  !!password && password.length >= 8 && password.length <= 20;

export const checkUpperCasePassword = (password: string) =>
  !!password && /[A-Z]/.test(password);

export const checkLowerCasePassword = (password: string) =>
  !!password && /[a-z]/.test(password);

export const checkDigitPassword = (password: string) =>
  !!password && /\d/.test(password);

export const checkSpecialCharacterPassword = (password: string) =>
  // eslint-disable-next-line no-useless-escape
  !!password && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

export const checkNoSpaceWhitePassword = (password: string) =>
  !!password && password.indexOf(' ') === -1;
