import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './../../home/novo-usuario/novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExisteService: UsuarioExisteService,
    private router: Router
  ) {}

  signUp(): void {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group(
      {
        userName: [
          '',
          [this.minusculoValidator],
          [this.usuarioExisteService.usuarioJaExiste()],
        ],
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: [usuarioSenhaIguaisValidator] }
    );
  }

  minusculoValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const valor = control.value as string;
    if (valor !== valor.toLowerCase()) {
      return { minusculo: true };
    }
    return null;
  }

  get userName() {
    return this.novoUsuarioForm.get('userName');
  }
  get email() {
    return this.novoUsuarioForm.get('email');
  }
  get fullName() {
    return this.novoUsuarioForm.get('fullName');
  }
  get password() {
    return this.novoUsuarioForm.get('password');
  }
}
