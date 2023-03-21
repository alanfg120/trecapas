import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsuariosService } from '../data/usuarios.service';
import { User } from '../model/user.interface';

import { UserProviderService } from './user-provider.service';

const mockUser: User = {
  id: 0,
  nombre: 'test',
  apellidos: 'Unit',
  rol: 'administrador',
};

let service: UserProviderService;
let spyUserService: jasmine.SpyObj<UsuariosService>;

describe('UserProviderService', () => {
  let service: UserProviderService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UsuariosService', ['getUsers','createUser','deleteUser','updateUser']);
    TestBed.configureTestingModule({
      providers: [{ provide: UsuariosService, useValue: spy }],
    });
    service = TestBed.inject(UserProviderService);
    spyUserService = TestBed.inject(
      UsuariosService
    ) as jasmine.SpyObj<UsuariosService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get Users', (done: DoneFn) => {
    spyUserService.getUsers.and.returnValue(of([mockUser]));
    service.getUsers();
    service.select(state => state.users).subscribe(usuarios => {
      expect(usuarios.length).toEqual(1)
      done()
    })
    expect(spyUserService.getUsers).toHaveBeenCalledTimes(1);
  });

  it('Create Users', (done: DoneFn) => {
    spyUserService.getUsers.and.returnValue(of([mockUser]));
    spyUserService.createUser.and.returnValue(of(mockUser));
    service.getUsers();
    service.createUser(mockUser);
    service.select(state => state.users).subscribe(usuarios => {
      expect(usuarios.length).toEqual(2)
      done()
    })
    expect(spyUserService.createUser).toHaveBeenCalledTimes(1);
  });

  it('Delete Users', (done: DoneFn) => {
    spyUserService.getUsers.and.returnValue(of([mockUser]));
    spyUserService.deleteUser.and.returnValue(of(mockUser));
    service.getUsers();
    service.deleteUser(mockUser.id!);
    service.select(state => state.users).subscribe(usuarios => {
      expect(usuarios.length).toEqual(0)
      done()
    })
    expect(spyUserService.deleteUser).toHaveBeenCalledTimes(1);
  });

  it('Update Users', (done: DoneFn) => {
    spyUserService.getUsers.and.returnValue(of([mockUser]));
    spyUserService.updateUser.and.returnValue(of(mockUser));
    service.getUsers();
    service.updateUser(mockUser);
    service.select(state => state.users).subscribe(usuarios => {
      expect(usuarios.length).toEqual(1)
      done()
    })
    expect(spyUserService.updateUser).toHaveBeenCalledTimes(1);
  });
});
