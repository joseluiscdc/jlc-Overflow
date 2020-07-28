import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'deleteCta-dialog',
  templateUrl: '../message/deleteCta.component.html',
})

export class DeleteCtaComponent {
	constructor(private authService: AuthService,
				private router: Router) {}

	public deleteCta(){
	    let user = JSON.parse(this.authService.getUser());
        this.authService.closeCta(user).subscribe((res) => { this.authService.logout() })
	}
}
