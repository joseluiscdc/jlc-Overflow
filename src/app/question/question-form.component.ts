import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import icons from './icons';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  styles: [`
    i {
      font-size: 54px;
    }
    small {
      display: block;
    }
  `],
  templateUrl: './question-form.component.html',
  providers: [QuestionService]
})
export class QuestionFormComponent implements OnInit {
  constructor(private questionService: QuestionService,
              private router: Router) {}

  /* tslint:disable:ban-types */
  public icons: Object[] = icons;
  public selectedIcon: 'none';

  public ngOnInit(): void {
  }

  /* tslint:disable:typedef */
  public onClick(icon: any) {
    this.selectedIcon = icon;
  }

  /* tslint:disable:typedef */
  public getIconVersion(icon: any) {
    let version: any;
    if (icon.versions.font.includes('plain-wordmark')) {
      version = 'plain-wordmark';
    } else {
      version = icon.versions.font[0];
    }
    return version;
  }

  /* tslint:disable:typedef */
  public onSubmit(form: NgForm) {
     const q = new Question(
        form.value.title,
        form.value.description,
        new Date(),
        this.selectedIcon,
      );
     this.questionService.addQuestion(q)
      .subscribe(
        ({ _id }) => this.router.navigate(['/questions', _id]),
        error => console.log(error)
      );
    form.resetForm();
  }

}
