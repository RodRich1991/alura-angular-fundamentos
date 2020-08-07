import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Observable, throwError } from "rxjs";
import { Photo } from "../photo/photo";
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService
            .findById(this.photoId);
        this.photo$.subscribe(() => {}, err => {
            console.error(err);
            this.router.navigate(['not-found']);
        })
    }

    deletePhoto() {
        this.photoService.delete(this.photoId)
            .subscribe(
                () => {
                    this.alertService.success('Foto removida com sucesso', true);
                    this.router.navigate(['/user', this.userService.getUserName()]);
                },
                err => {
                    console.error(err);
                    this.alertService.warning('Erro ao tentar remover foto', true);
                }
            );
    }

    like(photo: Photo) {
        this.photoService
            .like(photo.id)
            .subscribe(liked => this.photo$ = liked 
                ? this.photoService.findById(photo.id) : this.photo$
            )
    }

}