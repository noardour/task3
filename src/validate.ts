export default function validate(moves: string[]) {
  const errors: string[] = [];

  if (moves.length % 2 !== 1 && moves.length !== 0)
    errors.push("There must to be an odd nubmer of arguments");

  if (moves.length !== new Set(moves).size)
    errors.push("Arguments must be unique");

  if (moves.length < 3) errors.push("There must be at least 3 arguments");

  if (errors.length) {
    let errStr: string = `Error${errors.length > 1 ? "s" : ""}:`;
    errStr = `${errStr} ${errors.join(", ")}.`;
    console.log(errStr);
    process.exit();
  }
}
