import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDirective1]'
})
export class Directive1Directive {

  constructor(el: ElementRef) {
    console.log("directive 1 loaded "+el.nativeElement);
  }

  @HostListener('click', ['$event.target'])
  onClick(): void {
    alert("directive1 alert click ");
 }

}
