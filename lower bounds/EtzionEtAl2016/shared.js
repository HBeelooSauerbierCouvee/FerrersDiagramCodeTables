

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

