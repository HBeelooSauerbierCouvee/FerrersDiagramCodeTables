
export function isMonotone(context) {
  const columns = context.columns;
  const n = context.order;

  for (let i = 0; i < n - 1; i++) {
    if (columns[i] > 0 && columns[i] < n && !(columns[i + 1] > columns[i])) return false;
  }
  return true;
}

// Compute the width of the Ferrers diagram.
export function diagramWidth(columns) {
  return columns.length;
}

// Compute the height of the Ferrers diagram.
export function diagramHeight(columns) {
  return Math.max(...columns);
}

// Compute the order n determined by the diagram dimensions.
export function diagramOrder(columns) {
  return Math.max(diagramHeight(columns), diagramWidth(columns));
}


export function pHeight(columns, p) {
  const n = columns.length;

  let h = 0;
  let ph = 1;
  while (true) {
    const next = ph * p;
    if (n % next !== 0) break;
    if (!columns.every((v) => v % next === 0)) break;
    // check constancy on blocks of size `next`
    let ok = true;
    for (let start = 0; start < n && ok; start += next) {
      const block = columns.slice(start, start + next);
      if (!block.every((v) => v === block[0])) ok = false;
    }
    if (!ok) break;
    ph = next;
    h++;
  }
  return h;
}

export function pContraction(columns, p) {
  const n = columns.length;
  const h = pHeight(columns, p);
  const ph = Math.pow(p, h);
  const m = n / ph;
  const out = new Array(m);
  // c'_i = c_{p^h * i} / p^h,  i = 1..m  (1-indexed on the original c)
  for (let i = 1; i <= m; i++) {
    out[i - 1] = columns[ph * i - 1] / ph;
  }

  const N = diagramOrder(out);
  return Array(N - out.length + 1)
      .fill(0)
      .concat(out);
}


export function characteristicOfPrimePower(q) {
  if (!Number.isInteger(q) || q < 2) return null;
  for (let p = 2; p <= q; p += 1) {
    if (q % p !== 0) continue;
    let n = q;
    while (n % p === 0) n /= p;
    if (n === 1) return p;
  }
  return null;
}


const p = 3;
const char = characteristicOfPrimePower(p);
console.log(char);

const myColumns = [3,3,3,6,6,6,6,6,6];
const myPContraction = pContraction(myColumns, p);

console.log(myPContraction);

export function isPMonotone(context) {
  const columns = context.columns;
  const p = context.char;
  const pContractionResult = pContraction(columns, p);
  const pContractionContext = { columns: pContractionResult, order: Math.max(pContractionResult.length, Math.max(...pContractionResult)), char: char };
  return isMonotone(pContractionContext);
}

const myColumnContext = { columns: myColumns, order: Math.max(myColumns.length, Math.max(...myColumns)), char: char };
const pContractionContext = { columns: myPContraction, order: Math.max(myPContraction.length, Math.max(...myPContraction)), char: char };

console.log(myColumnContext);
console.log(pContractionContext);
console.log(isMonotone(pContractionContext));
console.log(isPMonotone(myColumnContext));

const testColumns = [0,2,2];
console.log(testColumns);
console.log(isMonotone({ columns: testColumns, order: testColumns.length }));