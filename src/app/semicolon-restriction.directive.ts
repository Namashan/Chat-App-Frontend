import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSemicolonRestriction]'
})
export class SemicolonRestrictionDirective {

  constructor(private el: ElementRef) {}

  // Tiltja a ';' karakter beirásást
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === ';') {
      event.preventDefault();
    }
  }
  // Tiltja a ';' karakter beillesztését
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    if (pastedText.includes(';')) {
      event.preventDefault();
    }
  }
}
