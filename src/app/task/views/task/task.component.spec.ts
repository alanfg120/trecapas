import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UsuariosService } from '../../data/usuarios.service';
import { User } from '../../model/user.interface';
import { UserProviderService } from '../../state/user-provider.service';

import { TaskComponent } from './task.component';

const mockUser: User = {
  id: 0,
  nombre: 'test',
  apellidos: 'Unit',
  rol: 'administrador',
};

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let userState: UserProviderService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    userState = TestBed.inject(UserProviderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //integration test
  it('Get Users', (done: DoneFn) => {
    const spyUserServiceGetUser = spyOn(UsuariosService.prototype, 'getUsers');
    spyUserServiceGetUser.and.returnValue(of([mockUser]));
    component.ngOnInit();
    fixture.detectChanges();
    component.users$.subscribe((users) => {
      expect(users.length).toEqual(1);
      done();
    });
  });


  it('Create Users', () => {
    const spyUserCreateUser = spyOn(userState, 'createUser');
    const form = component.form;
    form.controls.nombre.setValue('alan');
    form.controls.apellidos.setValue('herrera');
    form.controls.rol.setValue('admin');
    component.onSubmit();
    fixture.detectChanges();
    expect(spyUserCreateUser).toHaveBeenCalled()
  });

  it('delete Users', () => {
    const spyUserDeleteUser = spyOn(userState, 'deleteUser');
    component.deleteUser(0);
    fixture.detectChanges();
    expect(spyUserDeleteUser).toHaveBeenCalledOnceWith(0)
  });
  it('update Users', () => {
    const spyUserUpdateUser = spyOn(userState, 'updateUser');
    component.update = true;
    component.onSubmit();
    fixture.detectChanges();
    expect(spyUserUpdateUser).toHaveBeenCalled()
  });
});
