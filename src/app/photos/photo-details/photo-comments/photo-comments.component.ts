import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from '../../photo/photo.service';
import { Observable } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input()
    photoId: number;
    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private fb: FormBuilder
    ){}

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.fb.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

}