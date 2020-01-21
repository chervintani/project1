import { Validators, FormControl, AbstractControl } from '@angular/forms';

export class Forms {
    email = new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]);
    firstname = new FormControl('', [Validators.required]);
    lastname = new FormControl('', [Validators.required]);
    gender = new FormControl('', [Validators.required]);
    specialization = new FormControl('', [Validators.required]);

    controller(value:any,validators:any[]){
        new FormControl(value, validators);
    }
}