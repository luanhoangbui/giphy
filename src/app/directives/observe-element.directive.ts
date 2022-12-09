import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[appObserveElement]',
  exportAs: 'intersection'
})

/** Implement directive which emit event when in-use element is visibled */
export class ObserveElementDirective implements AfterViewInit, OnDestroy {

  @Output() public appObserveElement: EventEmitter<any> = new EventEmitter();

  private _intersectionObserver?: IntersectionObserver;

  constructor(private _element: ElementRef) { }

  ngAfterViewInit() {
    this._intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries)
    }, {});
    this._intersectionObserver.observe(<Element>this._element.nativeElement);
  }

  ngOnDestroy() {
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const isIntersecting = entry.isIntersecting && entry.target === this._element.nativeElement;
      if (isIntersecting) {
        this.appObserveElement.emit(); // emit event
      }
    });
  };
}