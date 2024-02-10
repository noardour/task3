import Table from "cli-table3";
import checkWin from "./checkWin";

export default class Printer {
  printCommands(moves: string[]): void {
    let str = "Avalible moves:\n";
    moves.forEach((move, i) => (str += `${i + 1} - ${move}\n`));
    str += "0 - exit\n";
    str += "? - help";
    console.log(str);
  }

  printHMAC(hmac: string): void {
    console.log(`HMAC: ${hmac}`);
  }

  printChoosedMoves(playerMove: string, AIMove: string): void {
    console.log(`Player move: ${playerMove}`);
    console.log(`Computer move: ${AIMove}`);
  }

  printOutcome(tag: string): void {
    const outcome = {
      loose: "You loose!",
      draw: "It' a draw!",
      win: "You win!",
    }[tag];
    console.log(outcome + "\n");
  }

  printKey(key: string): void {
    console.log(`HMAC key is ${key}`);
  }

  printMovesTable(moves: string[]) {
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
  }
}
