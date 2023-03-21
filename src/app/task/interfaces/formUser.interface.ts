import { FormControl } from "@angular/forms";

export interface FormUser{
    nombre: FormControl<string>;
    apellidos: FormControl<string>;
    rol: FormControl<string>;
}