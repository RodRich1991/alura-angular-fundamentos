import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from './photo';

const API = 'http://localhost:3000';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });
    }

    upload(file: File, description: string, allowComments: boolean) {
        const form = new FormData();
        form.append('description', description);
        form.append('allowComments', allowComments.toString());
        form.append('imageFile', file);
        
        return this.http.post(API + '/photos/upload', form);
    }
}