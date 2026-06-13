export const B = "#2F80ED";
export const O = "#FF6D1D";
export const P = "#9B5CFF";
export const G = "#22C55E";

export const BG = "#101827";
export const SURFACE = "#182235";
export const SURFACE2 = "#222F46";
export const NAVY = "#F8FAFC";
export const SLATE = "#CBD5E1";
export const MUTED = "#94A3B8";
export const BORDER = "#334155";
export const BORDER_MID = "#475569";

export const STORE_URL = "https://primelevelliving.com";

export const Store = {
  save: (key, val) => {
    try {
      localStorage.setItem("pll_" + key, JSON.stringify(val));
    } catch (e) {}
  },
  load: (key) => {
    try {
      const v = localStorage.getItem("pll_" + key);
      return v ? JSON.parse(v) : null;
    } catch (e) {
      return null;
    }
  },
  del: (key) => {
    try {
      localStorage.removeItem("pll_" + key);
    } catch (e) {}
  },
};
