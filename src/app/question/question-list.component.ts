import { Component, OnInit, Input } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-question-list',
  styles: [`
    i {
      font-size: 48px;
    }
    i.help {
      width: 48px !important;
      height: 48px !important;
      padding: 0 !important;
      font-size: 48px !important;
    }
    mat-spinner {
        position: absolute;
        bottom: 45%;
        left: 35%;
    }
    .add-question {
      position: fixed
      bottom: 30px;
      right: 30px;
      font-size: 24px;
    }
  `],
  templateUrl: './question-list.component.html',
  providers: [QuestionService, AuthService]
})

export class QuestionListComponent implements OnInit {
    constructor(private questionService: QuestionService,
                private authService: AuthService) {}

    @Input() sort;
    @Input() userFilter = 'false';

    questions: Question[];
    loading = true;
    userId = '';

    ngOnInit() {
      if(this.authService.isLoggedIn()) {
        let { userId } = JSON.parse(this.authService.getUser());
         this.userId = userId;
        if(this.userFilter === 'false') {
          this.userId = '';
        }
      }

      this.questionService
          .getQuestions(this.sort, this.userFilter, this.userId)
          .subscribe(resQuestions => {
              this.questions = resQuestions;
              this.loading = false;
           });
    }
}
