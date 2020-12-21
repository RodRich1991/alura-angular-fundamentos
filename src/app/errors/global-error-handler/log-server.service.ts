import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ILog } from "./log.model";


const API = environment.LOG_SERVER_URL;

@Injectable({ providedIn: 'root' })
export class LogServerService {

    constructor(private http: HttpClient) {}

    log(log: ILog) {
        return this.http.post(`${API}/infra/log`, log);
    }
}