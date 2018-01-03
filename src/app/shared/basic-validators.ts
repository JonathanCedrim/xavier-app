import { FormControl } from '@angular/forms';

export class BasicValidators 
{
  static email (control: FormControl)
  {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!EMAIL_REGEXP.test(control.value) && control.value !="" && control.value != undefined)
    {
    return {
              validateEmail: 
              {
                valid: false
              }
            };
    }
    else
    {
      return null;
    }
  }
}
