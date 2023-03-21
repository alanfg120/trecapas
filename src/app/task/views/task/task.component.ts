import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormUser } from '../../interfaces/formUser.interface';
import { User } from '../../model/user.interface';
import { UserProviderService } from '../../state/user-provider.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  users$ = this.userProvider.select((state) => state.users);
  loading$ = this.userProvider.select(state=> state.loading);
  
  form!: FormGroup<FormUser>
  update = false;
  idSelect!: number | undefined;

  constructor(
    private userProvider: UserProviderService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userProvider.getUsers();
    this.loadForm()
  }

  onSubmit(){
   const userForm = this.form.getRawValue();
   if(!this.update){
    this.userProvider.createUser({...userForm,id: Date.now()})
    return;
   }
   this.userProvider.updateUser({...userForm,id: this.idSelect!})
  }

  deleteUser(id: number){
    this.userProvider.deleteUser(id)
  }
  
  updateUser(user: User){
    this.update = true;
    this.idSelect = user.id;
    this.form.patchValue(user)
  }
  private loadForm() {
    this.form = this.fb.nonNullable.group({
      nombre : [''],
      apellidos: [''],
      rol: ['']
    })
  }
}
