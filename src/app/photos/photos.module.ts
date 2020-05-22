import { NgModule } from '@angular/core';

import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoService } from './photo/photo.service';

@NgModule({
    imports : [ 
        PhotoModule,
        PhotoFormModule,
        PhotoListModule
    ],
    providers: [
        PhotoService
    ]
})
export class PhotosModule {}