import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'jlc-overflow';

  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  fullName() {
    return this.authService.currentUser.fullName();
  }

  logout() {
    this.authService.logout();
  }

  perfil() {
    alert('Holi '+this.authService.currentUser.fullName());
  }

}
