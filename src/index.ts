import validate from "./validate";
import readline from "readline-sync";
import crypto from "crypto";
import checkWin from "./checkWin";
import Printer from "./Printer";

const moves: string[] = process.argv.slice(2);
validate(moves);

const printer = new Printer();

const key = crypto.randomBytes(32);

printer.printCommands(moves);

while (true) {
  const AIMove = Math.round(Math.random() * (moves.length - 1));
  const hmac = crypto.createHmac("sha3-256", key).update(moves[AIMove]);

  printer.printHMAC(hmac.digest("hex"));

  const PlayerCommand = readline.question("Your move: ");
  if (PlayerCommand == "0") break;
  if (PlayerCommand == "?") {
    printer.printMovesTable(moves);
    continue;
  }
  const playerMove = parseInt(PlayerCommand) - 1;

  printer.printChoosedMoves(moves[playerMove], moves[AIMove]);
  printer.printOutcome(checkWin(playerMove, AIMove, moves.length));
}

printer.printKey(key.toString("hex"));
