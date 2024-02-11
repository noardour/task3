import Rules from "./Rules";

export default class Player {
  #choosedMove: string | null = null;
  #rules: Rules;

  constructor(rules: Rules) {
    this.#rules = rules;
  }

  chooseMove(): void {}

  set move(value: string) {
    if (this.#rules.getMoves().includes(value)) this.#choosedMove = value;
  }

  get move(): string | null {
    return this.#choosedMove;
  }
}
