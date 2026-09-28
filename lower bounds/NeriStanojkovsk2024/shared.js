/* import {
  isMonotone,
  isPowerOfPrime,
  isStrictlyMonotone,
  pHeightAndContraction,
} from "../../helper-functions.js";

export { isMonotone, isPowerOfPrime, isStrictlyMonotone, pHeightAndContraction };
 */

import { diagramOrder, isPowerOfPrime } from "../../helper-functions.js";

export function diagonalIntersectionSize(columns, i) {
  // |D cap Delta_i^n|, 1-indexed diagonal i
  const n = columns.length;

  let count = 0;
  for (let j = 1; j <= n - i + 1; j++) {
    const col = j + i - 1; // 1-indexed column
    if (columns[col - 1] >= j) count++;
  }
  return count;
}
 
export function nuMDS(context) {
  const columns = context.orderTuple;
  const n = context.width;
  const d = context.d;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += Math.max(0, diagonalIntersectionSize(columns, i) - d + 1);
  }
  return sum;
}


export function isMonotone(context) {
  const columns = context.columns;
  const n = context.order;

  for (let i = 0; i < n - 1; i++) {
    if (columns[i] > 0 && columns[i] < n && !(columns[i + 1] > columns[i])) return false;
  }
  return true;
}

export function isStrictlyMonotone(context) {
  const columns = context.columns;
  const n = context.width;

  for (let i = 0; i < n - 1; i++) {
    if (columns[i] > 0  && !(columns[i + 1] > columns[i])) return false;
  }
  return true;
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

  if (isPowerOfPrime(diagramOrder(columns),p)) {
    return out;
  }
  return Array(N - out.length + 1)
      .fill(0)
      .concat(out); 
}

/* export function isPMonotone(context) {
  const columns = context.columns;
  const p = context.char;
  const n = context.order;

  const pContractionResult = pContraction(columns, p);
  const pContractionContext = { columns: pContractionResult, order: pContractionResult.length, height: Math.max(...pContractionResult) };

  return isMonotone(pContractionContext);
} */

export function isPMonotone(context) {
  const columns = context.columns;
  const p = context.char;
  const pContractionResult = pContraction(columns, p);
  const pContractionContext = { columns: pContractionResult, order: Math.max(pContractionResult.length, Math.max(...pContractionResult)) };
  return isMonotone(pContractionContext);
}