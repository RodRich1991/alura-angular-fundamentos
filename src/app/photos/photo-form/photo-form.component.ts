import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.photoForm = this.fb.group({
      file: ['', Validators.required],
      allowComments: [true],
      comment: ['', Validators.maxLength(300)]
    });
  }

  upload() {
    console.warn(this.file, this.photoForm.getRawValue());
    this.photoService
      .upload(this.file, this.photoForm.get('comment').value, this.photoForm.get('allowComments').value)
        .subscribe(() => this.router.navigate(['']));
  }

  handleUpload(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = ((event: any) => this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
