import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  styleUrls: ['./question-detail.component.css'],
  templateUrl: './question-detail.component.html',
  providers:[QuestionService]
})

export class QuestionDetailComponent implements OnInit, OnDestroy {
  question?: Question;
  loading = true;
  sub: any;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
      this.sub = this.route.params.subscribe((params) => {
          this.questionService
              .getQuestion(params.id)
              .subscribe((question) => {
                  this.question = question;
                  this.loading = false;
              });
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
