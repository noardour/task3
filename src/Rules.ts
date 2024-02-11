import Player from "./Player";

export default class Rules {
  #rules: Map<string, Set<string>>;

  constructor(moveSet: string[]) {
    this.#rules = new Map<string, Set<string>>();
    moveSet.forEach((move, moveIndex) => {
      const beatedMoves = new Set<string>();
      for (let i = (moveSet.length - 1) / 2; i > 0; i--) {
        beatedMoves.add(
          moveSet[(moveSet.length + moveIndex - i) % moveSet.length]
        );
      }
      this.#rules.set(move, beatedMoves);
    });
  }

  getMoves(): string[] {
    return [...this.#rules.keys()];
  }

  getMovesCount(): number {
    return this.#rules.size;
  }

  getWinner(firstPlayer: Player, secondPlayer: Player): Player | null {
    if (!firstPlayer.move || !secondPlayer.move)
      throw Error("player must make a move");
    if (this.#rules.get(firstPlayer.move)?.has(secondPlayer.move))
      return firstPlayer;
    if (this.#rules.get(secondPlayer.move)?.has(firstPlayer.move))
      return secondPlayer;
    return null;
  }
}
