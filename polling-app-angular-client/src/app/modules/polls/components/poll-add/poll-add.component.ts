import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { PollFacade } from '../../state/poll-facade';

@Component({
  selector: 'app-poll-add',
  templateUrl: './poll-add.component.html',
  styleUrls: ['./poll-add.component.scss'],
})
export class PollAddComponent implements OnInit {
  pollForm: FormGroup;
  // choices: [{ text: ''}, {text: ''}];
  pollLength: { days: 1; hours: 0 };
  days = Array.from(Array(8).keys());
  hours = Array.from(Array(24).keys());
  defaultDayOption = '1';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pollFacade: PollFacade
  ) {}

  ngOnInit() {
    this.pollForm = this.formBuilder.group({
      question: ['', [Validators.required, Validators.maxLength(140)]],
      choices: this.formBuilder.array([
        this.formBuilder.group({ text: '' }),
        this.formBuilder.group({ text: '' }),
      ]),
      days: [null],
      hours: [null],
    });
    this.f.days.setValue(1, { onlySelf: true });
    this.f.hours.setValue(0, { onlySelf: true });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.pollForm.controls;
  }

  get choices() {
    return this.pollForm.get('choices') as FormArray;
  }

  onFormSubmit() {
    // stop here if form is invalid
    if (this.pollForm.invalid) {
      return;
    }

    this.pollFacade
      .createPoll(this.pollForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/']);
        },
        (error) => {
          // this.toastr.error(
          //   error.message || 'Sorry! Something went wrong. Please try again!',
          //   'Polling App'
          // );
        }
      );
  }

  addChoice() {
    let choices = this.f.choices as FormArray;
    choices.push(this.formBuilder.group({ text: '' }));
  }

  removeChoice(choiceNumber) {
    let choices = this.f.choices as FormArray;
    choices.removeAt(choiceNumber);
  }
}
