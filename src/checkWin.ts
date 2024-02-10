const outcomes = ["loose", "draw", "win"];

export default function checkWin(
  playerMove: number,
  AIMove: number,
  movesCount: number
) {
  const halfMovesCount = Math.floor(movesCount / 2);
  const shift = halfMovesCount - playerMove;
  const result = Math.sign(
    ((playerMove + shift) % movesCount) -
      ((movesCount + AIMove + shift) % movesCount)
  );
  return outcomes[result + 1];
}
