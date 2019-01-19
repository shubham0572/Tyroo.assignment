import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } 				from '@angular/core';

import { Globals }                                                  					from './_helpers';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  	title = 'ams-angular';

  	@HostListener('document:click', ['$event'])
	clickout(event) {
	    
	}

	constructor(
		private eRef: ElementRef,
        private globals: Globals,
    ) {}

	ngOnInit() {
        
  	}
  	/* status modal close */
	
}
