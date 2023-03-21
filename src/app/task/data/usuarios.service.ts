import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { delay, Observable } from 'rxjs';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.api}/users`)
  }


  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${environment.api}/users`,user)
  }

  deleteUser(id: number): Observable<User>{
    return this.http.delete<User>(`${environment.api}/users/${id}`)
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${environment.api}/users/${user.id}`,user)
  }
}
