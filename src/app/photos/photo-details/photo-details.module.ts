import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from "./photo-details.component";
import { RouterModule } from '@angular/router';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from "./photo-comments/photo-comments.component";
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PhotoModule,
        ReactiveFormsModule,
        VMessageModule
    ],
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ]
})
export class PhotoDetailsModule {}