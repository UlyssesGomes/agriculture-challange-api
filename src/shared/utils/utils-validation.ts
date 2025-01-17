export class UtilsValidation {
  private static validateCpfOrCnpj(
    word,
    length,
    multipleFactorArray,
    multipleFactorArrayExt,
  ): boolean {
    const cpfDigitLengthRegex = /^\d{11}$/;
    const cnpjDigitLengthRegex = /^\d{14}$/;

    const regex = length == 11 ? cpfDigitLengthRegex : cnpjDigitLengthRegex;

    if (word.match(regex) == null) {
      return false;
    }

    let wordDigits = word.substr(0, length - 2);

    let sum = 0;

    for (let u = 0; u < length - 2; u++) {
      sum += parseInt(wordDigits.charAt(u)) * multipleFactorArray[u];
    }

    let firstDigit = sum % 11;
    firstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;

    multipleFactorArray = [...[multipleFactorArrayExt], ...multipleFactorArray];

    wordDigits += firstDigit;

    sum = 0;

    for (let u = 0; u < length - 1; u++) {
      sum += parseInt(wordDigits.charAt(u)) * multipleFactorArray[u];
    }

    let secondDigit = sum % 11;
    secondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;

    if (
      parseInt(word.charAt(word.length - 2)) != firstDigit ||
      parseInt(word.charAt(word.length - 1)) != secondDigit
    ) {
      return false;
    }

    return true;
  }

  static validateCpfDigits(cpf: string): boolean {
    return this.validateCpfOrCnpj(cpf, 11, [10, 9, 8, 7, 6, 5, 4, 3, 2], 11);
  }

  static validateCnpjDigits(cnpj): boolean {
    return this.validateCpfOrCnpj(
      cnpj,
      14,
      [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
      6,
    );
  }
}
