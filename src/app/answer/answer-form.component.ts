import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../auth/user.model';
import { Question } from '../question/question.model';
import { Answer } from './answer.model';

@Component({
  selector: 'app-answer-form',
  styleUrls: ['./answer-form.component.css'],
  templateUrl: './answer-form.component.html',
})

export class AnswerFormComponent {
  @Input() public question: Question;

  /* tslint:disable:typedef */
  public onSubmit(form: NgForm) {
    console.log(NgForm);
    const answer = new Answer(
      form.value.description,
      this.question,
      new Date(),
      new User(null, null, 'Perra', 'Becerra'),
    );
    this.question.answers.unshift(answer);
    form.reset();
  }
}
