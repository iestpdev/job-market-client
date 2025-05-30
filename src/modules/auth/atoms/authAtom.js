import { atom } from 'jotai';

export const authAtom = atom({
  isAuthenticated: false,
  token: null,
  user: null
});
