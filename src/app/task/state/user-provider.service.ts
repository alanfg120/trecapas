import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { State } from 'src/app/state';
import { UsuariosService } from '../data/usuarios.service';
import { User } from '../model/user.interface';

interface UserState {
  users: User[];
  error?: HttpErrorResponse;
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading : false
};


@Injectable({
  providedIn: 'root',
})
export class UserProviderService extends State<UserState> {
  constructor(private service: UsuariosService) {
    super(initialState);
  }

  getUsers() {
    this.setState({loading: true})
    this.service.getUsers().pipe(delay(2000)).subscribe({
      next: (users) => this.setState({ users , loading: false}),
      error: (error) => this.setState({ error }),
    });
  }

  createUser(user: User) {
    this.service.createUser(user).subscribe({
      next: (user) =>
        this.setState({ users: [user, ...this.currentState.users] }),
      error: (error) => this.setState({ error }),
    });
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe({
      next: (_) =>
        this.setState({
          users: this.currentState.users.filter((user) => user.id != id),
        }),
      error: (error) => this.setState({ error }),
    });
  }

  updateUser(userUpdate: User) {
    this.service.updateUser(userUpdate).subscribe({
      next: (_) =>
        this.setState({
          users: this.currentState.users.map((user) => {
            if(userUpdate.id == user.id){
              return userUpdate
            }
            return user
          }),
        }),
      error: (error) => this.setState({ error }),
    });
  }
}
