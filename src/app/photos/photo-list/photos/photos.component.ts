import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
}) 
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.photos)
      this.rows = this.convertToMatrix(this.photos);
  }

  convertToMatrix(array: any[]) {
    const rows = [];

    for (let index = 0; index < array.length; index += 3) {
      rows.push(array.slice(index, index + 3));
    }
    return rows;
  }

}
