const ACCESS_TOKEN_KEY = "accessToken";

export class AuthStorage {
  static setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  static async setRefreshToken(token: string): Promise<void> {
    try {
      await fetch("/api/auth/set-refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: token }),
      });
    } catch (error) {
      console.error("Erro ao salvar refresh token:", error);
    }
  }

  static clear(): void {
    this.removeAccessToken();
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
