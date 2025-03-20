let logoutFn: (() => void) | null = null;

export const setLogoutFunction = (fn: () => void) => {
  logoutFn = fn;
};

export const logout = () => {
  if (logoutFn) logoutFn();
};
