import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from '../entities/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  create(usuario: Usuario) {
    return this.http
      .post(
        this.url + '/Usuario',
        JSON.stringify(usuario),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  update(usuario: Usuario){
    return this.http
      .put(
        this.url + '/Usuario',
        JSON.stringify(usuario),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  delete(id: number) {
    return this.http
      .delete(this.url + '/Usuario/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getAll(): Observable<Usuario> {
    return this.http
      .get<Usuario>(this.url + '/Usuario')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getById(id: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(this.url + '/Usuario/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });

  }
}
