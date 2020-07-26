import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styles: [`
    .add-question {
      position: fixed;
      bottom: 30px;
      right: 30px;
      font-size: 24px;
    }
  `],
  providers: [AuthService]
})
export class QuestionScreenComponent implements OnInit{
  public hideTabQuestionUser = false;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.hideTabQuestionUser = true;
    }
  }
}