import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDirective2]'
})
export class Directive2Directive {

  constructor() {
    console.log("directive 2 loaded")
  }

   @HostBinding('class')
    elementClass = 'newDirectiveClass';

}
