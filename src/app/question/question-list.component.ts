import { Component, OnInit, Input } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-question-list',
  styleUrls: ['./question-list.component.css'],
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
