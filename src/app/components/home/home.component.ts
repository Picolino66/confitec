import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entities/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios: any = [];
  nEdit: number = -1;
  escolaridades = ['Infantil', 'Fundamental', 'Médio', 'Superior'];

  pipe = new DatePipe('en-US');
  dateNow = new Date();
  maxDate = this.pipe.transform(this.dateNow, 'yyyy-MM-dd');

  constructor(
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.carregaUsuarios();
  }

  private async carregaUsuarios() {
    await this._usuarioService.getAll().subscribe( data => {
      this.usuarios = data;
    });
  }

  async updateUsuario(usuario: Usuario) {
    await this._usuarioService.update(usuario).subscribe(
      () => {
        this.alerta("Usuario editado com sucesso!");
        this.nEdit = -1;
      },
      (err) => {
        this.alerta("Usuario não foi editado!");
        console.log(err);
      }
    );
  }

  async deleteUsuario(id: number) {
    await this._usuarioService.delete(id).subscribe(
      () => this.alerta("Usuario deletado com sucesso!"),
      (err) => {
        this.alerta("Usuario não pode ser deletado!");
        console.log(err);
      }
    );
    const index = this.usuarios.findIndex((user: { id: number; }) => user.id === id);
    this.usuarios.splice(index,1);
  }

  controleEdit(id: number) {
    this.nEdit = id;
  }

  private alerta(texto: string) {
    this._snackBar.open(texto, 'Ok!', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    });
  }

}
