import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Observable } from "rxjs";
import { Photo } from "../photo/photo";

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;

    constructor(
        private router: ActivatedRoute,
        private photoService: PhotoService
    ) {}

    ngOnInit(): void {
        this.photo$ = this.photoService
            .findById(this.router.snapshot.params.photoId);
    }

}