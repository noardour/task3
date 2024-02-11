export default class Validator {
  #errors: string[];
  #validatedStrings: string[];

  constructor(strings: string[]) {
    this.#errors = [];
    this.#validatedStrings = strings;
  }

  isNotEmpty(): Validator {
    if (this.#validatedStrings.length < 3)
      this.#errors.push("there must be at least 3 arguments");
    return this;
  }

  isUnique(): Validator {
    if (this.#validatedStrings.length !== new Set(this.#validatedStrings).size)
      this.#errors.push("arguments must be unique");
    return this;
  }

  isOdd(): Validator {
    if (
      this.#validatedStrings.length % 2 !== 1 &&
      this.#validatedStrings.length !== 0
    )
      this.#errors.push("there must to be an odd nubmer of arguments");

    return this;
  }

  getErrors(): string[] | null {
    return this.#errors.length ? this.#errors : null;
  }
}
