import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../auth/user.model';
import { Question } from '../question/question.model';
import { Answer } from './answer.model';
import { QuestionService } from '../question/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-form',
  styleUrls: ['./answer-form.component.css'],
  templateUrl: './answer-form.component.html',
  providers: [QuestionService]
})

export class AnswerFormComponent {
  @Input() public question: Question;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {
  }

  /* tslint:disable:typedef */
  public onSubmit(form: NgForm) {
    const answer = new Answer(
      form.value.description,
      this.question,
      new Date(),
      new User(null, null, 'Perra', 'Becerra', '5f13d0310039ad21f82ca470'),
    );
    this.question.answers.unshift(answer);

    this.questionService.addAnswer(answer)
        .subscribe(
          ({ _id }) => this.router.navigate(['/questions', _id]),
          error => console.log(error)
        );
    form.reset();
  }
}
