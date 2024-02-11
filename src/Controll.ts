import readline from "readline-sync";

export default class Controll {
  #exitCommand = "0";
  #helpCommand = "?";
  #moveCommands: [string, string][];

  #onExitFn: (() => void)[] = [];
  #onHelpFn: (() => void)[] = [];
  #onMoveFn: ((move: string) => void)[] = [];

  constructor(moves: string[]) {
    this.#moveCommands = moves.map((move, i) => [`${i + 1}`, move]);
  }

  #getRawCommands(): string[] {
    return [
      ...this.#moveCommands.map((item) => item[0]),
      this.#exitCommand,
      this.#helpCommand,
    ];
  }

  isCommand(command: string): boolean {
    return this.#getRawCommands().includes(command);
  }

  getCommands(): string[] {
    return [
      ...this.#moveCommands.map((item) => `${item[0]} - ${item[1]}`),
      `${this.#exitCommand} - exit`,
      `${this.#helpCommand} - help`,
    ];
  }

  onExit(handler: () => void) {
    this.#onExitFn.push(handler);
  }

  removeOnExit(handler: () => void) {
    this.#onExitFn.filter((fn) => fn != handler);
  }

  onHelp(handler: () => void) {
    this.#onHelpFn.push(handler);
  }

  removeOnHelp(handler: () => void) {
    this.#onHelpFn.filter((fn) => fn != handler);
  }

  onMove(handler: (move: string) => void) {
    this.#onMoveFn.push(handler);
  }

  removeOnMove(handler: (move: string) => void) {
    this.#onMoveFn.filter((fn) => fn != handler);
  }

  getInput() {
    let input = "";
    while (true) {
      input = readline.question("Your move: ");
      if (!this.isCommand(input)) console.log("wrong command");
      else break;
    }
    switch (input) {
      case this.#exitCommand:
        this.#onExitFn.forEach((fn) => fn());
        break;
      case this.#helpCommand:
        this.#onHelpFn.forEach((fn) => fn());
        break;
      default:
        const command = this.#moveCommands.find(
          (command) => command[0] == input
        ) as [string, string];
        this.#onMoveFn.forEach((fn) => fn(command[1]));
    }
  }
}
