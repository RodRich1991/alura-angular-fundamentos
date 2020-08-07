import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

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

    findById(photoId: number) {
        return this.http.get<Photo>(`${API}/photos/${photoId}`);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(`${API}/photos/${photoId}/comments`);
    }

    addComment(photoId: number, commentText: string) {
        return this.http.post(
            `${API}/photos/${photoId}/comments`,
            { commentText }
        );
    }

    delete(photoId: number) {
        return this.http.delete(`${API}/photos/${photoId}`);
    }

    like(photoId: number) {
        return this.http.post(
            `${API}/photos/${photoId}/like`, {}, { observe: 'response' }
        )
        .pipe(map(() => true))
        .pipe(catchError(err => err.status == '304' ? of(false) : throwError(err)));
    }
}