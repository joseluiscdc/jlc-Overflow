import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import icons from './icons';
import { Question } from './question.model';

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
})
export class QuestionFormComponent implements OnInit {
  /* tslint:disable:ban-types */
  public icons: Object[] = icons;
  public selectedIcon: 'none';

  constructor() { }

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
    console.log(q);
  }

}
