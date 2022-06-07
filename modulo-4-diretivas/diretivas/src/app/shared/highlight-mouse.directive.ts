import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver() {
    /* this._renderer.setStyle(
      this._elementRef.nativeElement,
      'background-color',
      'purple'
    ) */
    this.backgroundColor = 'purple';
  }

  @HostListener('mouseleave') onMouseLeave() {
    /* this._renderer.setStyle(
      this._elementRef.nativeElement,
      'background-color',
      'white'
    ) */
    this.backgroundColor = 'white'
  }

  @HostBinding('style.backgroundColor') get setColor() {
    // colocar toda a lógica antes de setar o valor do atributo
    return this.backgroundColor;
  };

  private backgroundColor: string = '';

  constructor(
    /* private _elementRef: ElementRef,
    private _renderer: Renderer2 */
  ) { }

}
