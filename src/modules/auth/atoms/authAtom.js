import { atomWithStorage } from 'jotai/utils';

export const authAtom = atomWithStorage('auth',{
  isAuthenticated: false,
  token: null,
  user: null
});
