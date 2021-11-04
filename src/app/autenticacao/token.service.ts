import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  retornarToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  salvarToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  excluirToken() {
    localStorage.removeItem(KEY);
  }

  possuiToken() {
    return !!this.retornarToken();
  }
}
