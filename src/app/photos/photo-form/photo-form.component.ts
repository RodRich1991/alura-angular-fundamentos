import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.photoForm = this.fb.group({
      file: ['', Validators.required],
      allowComments: [true],
      comment: ['', Validators.maxLength(300)]
    });
  }

}
