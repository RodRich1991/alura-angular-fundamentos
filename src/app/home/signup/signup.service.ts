import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { NewUser } from './new-user';
import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;

@Injectable()
export class SignUpService { 

    constructor(private http: HttpClient) {}

    userNameIsTaken(userName: string) {
        return this.http.get(API_URL + '/user/exists/' + userName);
    }

    signUp(newUser: NewUser) {
        return this.http.post(API_URL + '/user/signup', newUser);
    }
}