import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entities/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-insert-usuario',
  templateUrl: './insert-usuario.component.html',
  styleUrls: ['./insert-usuario.component.css']
})
export class InsertUsuarioComponent implements OnInit {

  usuario = {} as Usuario;
  escolaridades = ['Infantil', 'Fundamental', 'Médio', 'Superior'];
  escolaridade: number = 0;

  pipe = new DatePipe('en-US');
  dateNow = new Date();
  maxDate = this.pipe.transform(this.dateNow, 'yyyy-MM-dd');

  constructor(
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  async salvar() {
    this.usuario.escolaridade = this.escolaridade;
    await this._usuarioService.create(this.usuario).subscribe(
      () => {
        this.alerta("Usuario salvo com sucesso!");
        this.usuario = {} as Usuario;
      },
      (err) => {
        this.alerta("Usuario não pode ser salvo!");
        console.log(err);
      }
    );
  }

  private alerta(texto: string) {
    this._snackBar.open(texto, 'Ok!', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    });
  }

}
