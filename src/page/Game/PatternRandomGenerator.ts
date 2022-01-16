export class PatternRandomGenerator {
  private size;

  constructor(private row = 3, private column = 3) {
    this.size = row * column;
  }

  generate = () => {
    const temp = new Array<number>();
    const candidates = new Array(this.size).fill(null).map((_, i) => {
      return i;
    });

    while (temp.length < this.size) {
      const idx = (Math.random() * 2000) % candidates.length;
      const removed = candidates.splice(idx, 1);
      temp.push(removed[0]);
    }

    return temp;
  };
}
