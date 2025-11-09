export class Rc<K> {
  readonly #refs: Map<K, number> = new Map();

  add(key: K): void {
    const count = this.#refs.get(key) ?? 0;

    this.#refs.set(key, count + 1);
  }

  remove(key: K): boolean {
    const count = this.#refs.get(key);

    if (count === undefined) {
      return false;
    }

    const newCount = count - 1;

    if (newCount > 0) {
      this.#refs.set(key, newCount);

      return false;
    }

    this.#refs.delete(key);

    return true;
  }

  count(key: K): number | undefined {
    return this.#refs.get(key);
  }
}
