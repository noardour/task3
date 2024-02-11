import readline from "readline-sync";
import Printer from "./Printer";
import Validator from "./Validator";
import Crypto from "./Crypto";
import Rules from "./Rules";
import Player from "./Player";
import Controll from "./Controll";

const moves: string[] = process.argv.slice(2);

const printer = new Printer();
const validator = new Validator(moves);

const errors = validator.isOdd().isUnique().isNotEmpty().getErrors();
if (errors) {
  printer.printErrors(errors);
  process.exit();
}

const rules = new Rules(moves);
const crypto = new Crypto();
const controll = new Controll(rules.getMoves());

printer.printCommands(controll);

let exit = false;
while (true) {
  const HumanPlayer = new Player(rules);
  const AIPlayer = new Player(rules);

  crypto.generateKey();

  AIPlayer.move =
    rules.getMoves()[Math.floor(Math.random() * rules.getMovesCount())];
  crypto.generateHMAC(AIPlayer.move);

  printer.printHMAC(crypto.getHMAC());

  /* controll.onHelp(() => printer.printMovesTable(moves)); */
  controll.onExit(() => {
    exit = true;
  });
  controll.onMove((move) => (HumanPlayer.move = move));

  while (!HumanPlayer.move && !exit) controll.getInput();
  if (exit) break;

  printer.printChoosedMoves(
    HumanPlayer.move as string,
    AIPlayer.move as string
  );

  const winner = rules.getWinner(HumanPlayer, AIPlayer);
  if (winner == HumanPlayer) printer.printWin();
  else if (winner == AIPlayer) printer.printLoose();
  else if (!winner) printer.printDraw();

  printer.printKey(crypto.getKey());
  console.log("");
}
