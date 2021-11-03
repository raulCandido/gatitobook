import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovoUsuario } from './novo-usuario';

@Injectable({
  providedIn: 'root',
})
export class NovoUsuarioService {
  constructor(private httpClient: HttpClient) {}

  cadastraNovoUsuario(usuario: NovoUsuario) {
    return this.httpClient.post('http://localhost:8800/v1/user/new', usuario);
  }

  buscarUsuario(nomeUsuario: String) {
    return this.httpClient.get(`http://localhost:8800/v1/user/${nomeUsuario}`);
  }
}
