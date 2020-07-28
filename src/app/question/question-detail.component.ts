import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  styleUrls: ['./question-detail.component.css'],
  templateUrl: './question-detail.component.html',
  providers:[QuestionService, AuthService]
})

export class QuestionDetailComponent implements OnInit, OnDestroy {
  question?: Question;
  loading = true;
  sub: any;
  public owner: any;

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private authService: AuthService){}

  ngOnInit() {

      this.sub = this.route.params.subscribe((params) => {
          this.questionService
              .getQuestion(params.id)
              .subscribe((question) => {
                  this.owner = this.authService.isOwner(question)
                  this.question = question;
                  this.loading = false;
              });
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
