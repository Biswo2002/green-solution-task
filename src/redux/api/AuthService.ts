let token: string | null = null;
let refresh: string | null = null;

export const AuthService = {
  getToken: () => token,
  setToken: (next: string | null) => {
    token = next;
  },
  getRefreshToken: () => refresh,
  setRefreshToken: (next: string | null) => {
    refresh = next;
  },
  refreshToken: async () => {
    if (!token) {
      throw new Error('Not authenticated');
    }
    return token;
  },
  logout: () => {
    token = null;
    refresh = null;
  },
};
