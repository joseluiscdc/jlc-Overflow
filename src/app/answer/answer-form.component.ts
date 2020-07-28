import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../auth/user.model';
import { Question } from '../question/question.model';
import { Answer } from './answer.model';
import { QuestionService } from '../question/question.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import SweetScroll from 'sweet-scroll';

@Component({
  selector: 'app-answer-form',
  styleUrls: ['./answer-form.component.css'],
  templateUrl: './answer-form.component.html',
  providers: [QuestionService, AuthService]
})

export class AnswerFormComponent implements OnInit{
  @Input() public question: Question;
  sweetScroll: SweetScroll;
  public owner: any;
  public answerForm: FormGroup;

  constructor(private questionService: QuestionService,
              private authService: AuthService,
              private router: Router) {
    this.sweetScroll = new SweetScroll();
  }

  public ngOnInit() {
    this.owner = this.authService.isOwner(this.question)
    this.answerForm = new FormGroup({
      description: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  public updateStatus(status){
    this.question.status = status;
    this.questionService.updateQuestion(this.question)
                        .subscribe(
                            a => {
                                this.router.navigateByUrl('/')
                            },
                            error => this.router.navigateByUrl('/signin')
                        );
  }

  /* tslint:disable:typedef */
  public onSubmit() {
    const answer = new Answer(
      this.answerForm.value.description,
      this.question,
      new Date(),
    );
    if (this.answerForm.valid) {
      this.questionService
          .addAnswer(answer)
          .subscribe(
              a => {
                  this.question.answers.unshift(a);
                  this.answerForm.reset();
                  this.sweetScroll.to('#title');
              },
              error => this.router.navigateByUrl('/signin')
          );
    }
  }
}
