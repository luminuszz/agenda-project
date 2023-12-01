import { atomWithStorage } from "jotai/utils";
import { atom, useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";

export const authTokenKey = "agenda-project@token";

export const authTokenAtom = atomWithStorage(
  authTokenKey,
  localStorage.getItem(authTokenKey) || "",
);

export const isAuthenticatedAtom = atom((get) => !!get(authTokenAtom));

export const useSession = () => {
  const [token, setToken] = useAtom(authTokenAtom);

  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  const logout = useCallback(() => setToken(""), [setToken]);

  const saveSession = useCallback(
    (token: string) => setToken(token),
    [setToken],
  );

  return {
    isAuthenticated,
    token,
    logout,
    saveSession,
  };
};
