import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
@Directive({ selector: '[ele-ref]' })
export class ElementRefDirective implements AfterViewInit {
    
	constructor(public el: ElementRef) {}
	@Input() delay:number = 0;
	ngAfterViewInit(){
		//emit a reference to the host element
		if(this.delay == 0){
			this.el.nativeElement.focus();
		}
		else{
			setTimeout(() =>{
				this.el.nativeElement.focus();
			}, this.delay);
		}
	}
}