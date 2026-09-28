import {
  isPMonotone,
  pContraction,
  pHeight,
} from "./shared.js";


// Build the attained lower bound for p-monotone diagrams.
export function evaluatePMonotoneLowerBound(context) {
  return {
    id: "neri_2024_p_monotone",
    value: context.nuMin,
    ref: "neri_stanojkovski_2024",
    construction: {
      attained: true,
      label: "Explicit diagonal construction",
      family: "p-monotone",
    },
  };
}

// Explain whether the p-monotone family applies to this input.
export function describePMonotoneApplicability(context, evaluation) {
  const columns = context.columns;
  const p = context.char;

  if (!evaluation) {
    return [
      `Not applicable because...`,
    ];
  }

  return [
    `Applicable because p=${p}, columns=${columns}, p-contraction=${pContraction(columns, p)}`,
  ];
}

// Register the p-monotone lower-bound rule.
const pMonotoneLowerBound = {
  id: "neri_2024_p_monotone",
  label: "p-monotone lower bound",
  referenceId: "neri_stanojkovski_2024",
  appliesTo: isPMonotone,
  describeApplicability: describePMonotoneApplicability,
  evaluate: evaluatePMonotoneLowerBound,
};

// Export the default lower-bound registration.
export default pMonotoneLowerBound;
