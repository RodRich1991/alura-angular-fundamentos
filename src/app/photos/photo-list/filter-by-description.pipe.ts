import { Pipe, PipeTransform } from "@angular/core";
import { Photo } from '../photo/photo';

@Pipe({ name: 'filterByDescription' })
export class FilterByDescriptionPipe implements PipeTransform {
    
    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();

        return descriptionQuery 
            ? photos.filter(photo => 
                photo.description.toLowerCase().includes(descriptionQuery))
            : photos; 
    }

}