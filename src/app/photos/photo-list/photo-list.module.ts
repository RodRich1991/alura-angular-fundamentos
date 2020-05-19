import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PhotoListComponent } from './photo-list.component';
import { FilterByDescriptionPipe } from './filter-by-description.pipe';
import { PhotosComponent } from './photos/photos.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
    declarations: [
        FilterByDescriptionPipe,
        PhotoListComponent,
        PhotosComponent,
        LoadButtonComponent
    ],
    imports: [
        CommonModule,
        PhotoModule
    ]
})
export class PhotoListModule { }