import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Usuario } from './usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private TokenService: TokenService) {
    if(this.TokenService.possuiToken()){
      this.decodificarJwtToken();
    }
  }

  decodificarJwtToken() {
    const token = this.TokenService.retornarToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  retornarUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvarToken(token: string){
    this.TokenService.salvarToken(token);
    this.decodificarJwtToken();
  }

  logout(){
    this.TokenService.excluirToken();
    this.usuarioSubject.next({});
  }

  estaLogado(){
    return this.TokenService.possuiToken();
  }
}
