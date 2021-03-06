import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import { PhotoService } from '../photo/photo.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  uploadPercentage = 0;

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
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
        .pipe(
          finalize(() => this.router.navigate(['/user', this.userService.getUserName() ]))
        )
        .subscribe((event: HttpEvent<any>) => {
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadPercentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.alertService.success('Upload realizado com sucesso', true);
            }
          },
          err => {
            console.error(err);
            this.alertService.success('Erro ao realizar upload', true);
          }
        );
  }

  handleUpload(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = ((event: any) => this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
