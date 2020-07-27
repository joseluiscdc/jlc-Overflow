import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'deleteCta-dialog',
  templateUrl: '../message/deleteCta.component.html',
})
export class DeleteCtaComponent {
	public deleteCta(){
		alert("Se elimino su cta");
	}
}