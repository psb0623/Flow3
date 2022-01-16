export class PatternRandomGenerator {
  private size;

  constructor(private row = 3, private column = 3) {
    this.size = row * column;
  }

  generate = () => {
    let ret = new Array<number>();
    let visited = new Array<boolean>(this.size).fill(false);

    let start = Math.floor(Math.random() * this.size);
    ret.push(start);
    visited[start] = true;
    let used = 1;

    while (used < this.size) {
      let p = ret[ret.length - 1];
      let pool: number[] = [];
      for (let i = 0; i < visited.length; i++) if (!visited[i]) pool.push(i);
      let idx = Math.floor(Math.random() * pool.length);
      let c = pool[idx];

      let px = p % this.column,
        py = (p / this.row) >> 0;
      let cx = c % this.column,
        cy = (c / this.row) >> 0;
      let inc = py < cy,
        jnc = px < cx;
      for (let i = py; i != cy + (inc ? 1 : -1); inc ? i++ : i--) {
        for (let j = px; j != cx + (jnc ? 1 : -1); jnc ? j++ : j--) {
          if (i == py && j == px) continue;
          if (i == cy && j == cx) continue;
          if ((j - px) * (cy - i) == (i - py) * (cx - j)) {
            let here = i * this.row + j;
            ret.push(here);
            visited[here] = true;
            used++;
          }
        }
      }
      ret.push(c);
      visited[c] = true;
      used++;
    }
    return ret;
  };
}
