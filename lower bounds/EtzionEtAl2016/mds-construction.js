import { nuMDS } from "./shared.js";

// Detect when the diagonal construction meets the best upper bound.
export function isMdsConstructibleFamily(context) {
  return (
    context.q >= context.order - 1
  );
}

// Build the attained lower bound for MDS-constructible diagrams.
export function evaluateMdsConstructibleLowerBound(context) {
  return {
    id: "etzion_2016_mds_constructible",
    value: nuMDS(context),
    ref: "etzion_et_al_2016",
    construction: {
      attained: true,
      label: "MDS-constructible diagonal construction",
      family: "MDS-constructible",
    },
  };
}

// Explain whether the MDS-constructible family applies to this input.
export function describeMdsConstructibleApplicability(context, evaluation) {
  

  if (!evaluation) {
    return [
      `Not applicable because q < ${context.order - 1} (= order - 1).`,
    ];
  }

  return [
    `Applicable because q >= ${context.order - 1} (= order - 1).`,
  ];
}

// Register the MDS-constructible lower-bound rule.
const mdsConstructibleLowerBound = {
  id: "etzion_2016_mds_constructible",
  label: "MDS-diagonal construction",
  referenceId: "etzion_et_al_2016",
  appliesTo: isMdsConstructibleFamily,
  describeApplicability: describeMdsConstructibleApplicability,
  evaluate: evaluateMdsConstructibleLowerBound,
};

// Export the default lower-bound registration.
export default mdsConstructibleLowerBound;
