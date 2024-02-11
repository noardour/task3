import Table from "cli-table3";
import Controll from "./Controll";
import Rules from "./Rules";

export default class Printer {
  printCommands(controll: Controll): void {
    console.log(controll.getCommands().join("\n"));
  }

  printHMAC(hmac: string): void {
    console.log(`HMAC: ${hmac}`);
  }

  printChoosedMoves(playerMove: string, AIMove: string): void {
    console.log(`Player move: ${playerMove}`);
    console.log(`Computer move: ${AIMove}`);
  }

  printWin(): void {
    console.log("You win!");
  }

  printLoose(): void {
    console.log("You loose!");
  }

  printDraw(): void {
    console.log("It' a draw!");
  }

  printKey(key: string): void {
    console.log(`HMAC key is ${key}`);
  }

  /* printMovesTable(rules: Rules[]) {
    const table = new Table({
      head: ["↓PC/Player→", ...moves],
    });
    table.push(
      ...moves.map((aiMove, i) => [
        aiMove,
        ...moves.map((_, j) => checkWin(j, i, moves.length)),
      ])
    );
    console.log(table.toString());
  } */

  printErrors(errors: string[]) {
    errors[0] = errors[0][0].toUpperCase() + errors[0].slice(1);
    console.log(`Error${errors.length > 1 ? "s" : ""}: ${errors.join(", ")}.`);
  }
}
