import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from "./photo-details.component";
import { RouterModule } from '@angular/router';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PhotoModule
    ],
    declarations: [
        PhotoDetailsComponent
    ]
})
export class PhotoDetailsModule {}