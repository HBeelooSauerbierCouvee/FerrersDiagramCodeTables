import mdsConstructibleLowerBound from "./mds-construction.js";


// Collect references cited by Etzion et al. (2016) lower-bound rules.
export const etzionEtAl2016References = {
  etzion_et_al_2016: {
    id: "etzion_et_al_2016",
    label:
      "Etzion, T.; Gorla, E.; Ravagnani, A.; Wachter-Zeh, A.; Optimal Ferrers diagram rank-metric codes, IEEE Trans. Inf. Theory 62 (4) (2016) 1616–1630.",
    url: "https://doi.org/10.1109/TIT.2016.2522971",
  },
};

// Expose the EtzionEtAl2016 lower-bound family registry.
export const etzionEtAl2016Bounds = [
  mdsConstructibleLowerBound,
];
