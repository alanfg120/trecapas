import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { User } from '../model/user.interface';
import { UsuariosService } from './usuarios.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

const mockUser: User = {
   id: 0,
   nombre: "test",
   apellidos: "Unit",
   rol: "administrador"
};

let service: UsuariosService;
let httpClient: HttpClient
let httpTestingController: HttpTestingController

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UsuariosService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Get Users', () => {
    service.getUsers().subscribe({
      next : (resp) =>{
         expect(resp.length).toEqual(1)
      }
    })
    const request = httpTestingController.expectOne(`${environment.api}/users`)
    expect(request.request.method).toEqual('GET');
    request.flush([mockUser])
  });
  it('Create User', () => {
    service.createUser(mockUser).subscribe({
      next : (resp) =>{
         expect(resp).toEqual(mockUser)
      }
    })
    const request = httpTestingController.expectOne(`${environment.api}/users`)
    expect(request.request.method).toEqual('POST');
    request.flush(mockUser)
  });
  it('Delete User', () => {
    service.deleteUser(0).subscribe({
      next : (resp) =>{
         expect(resp).toEqual(mockUser)
      }
    })
    const request = httpTestingController.expectOne(`${environment.api}/users/${0}`)
    expect(request.request.method).toEqual('DELETE');
    request.flush(mockUser)
  });
  it('Update User', () => {
    service.updateUser(mockUser).subscribe({
      next : (resp) =>{
         expect(resp).toEqual(mockUser)
      }
    })
    const request = httpTestingController.expectOne(`${environment.api}/users/${0}`)
    expect(request.request.method).toEqual('PUT');
    request.flush(mockUser)
  });
});
