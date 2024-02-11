import crypto from "crypto";

export default class Crypto {
  #key: Buffer | null;
  #hmac: crypto.Hmac | null;

  constructor() {
    this.#key = null;
    this.#hmac = null;
  }

  generateKey(): Crypto {
    this.#key = crypto.randomBytes(32);
    return this;
  }

  generateHMAC(str: string): Crypto {
    if (!this.#key) throw Error("You need to generate key first!");
    this.#hmac = crypto.createHmac("sha3-256", this.#key).update(str);
    return this;
  }

  getHMAC(): string {
    if (!this.#hmac) throw Error("You need to generate HMAC first!");
    return this.#hmac.digest("hex");
  }

  getKey(): string {
    if (!this.#key) throw Error("You need to generate key first!");
    return this.#key.toString("hex");
  }
}
