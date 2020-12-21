import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from "@angular/common";

import { UserService } from '../../core/user/user.service';
import { LogServerService } from "./log-server.service";
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        private injector: Injector,
        private logService: LogServerService
    ) {}
    
    handleError(error: any): void {        
        const message = error.message
            ? error.message
            : error.toString();
        
        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy
            ? location.path()
            : '';
        
        const userService = this.injector.get(UserService);

        if (environment.production) {
            const router = this.injector.get(Router);
            router.navigate(['/error']);
        }
        
        StackTrace
            .fromError(error)
            .then(stackArray => {
                const stackString = stackArray
                    .map(e => e.toString())
                    .join('\n');

                console.log(message);
                console.log(stackString);

                this.logService
                    .log({ message, stack: stackString, url, userName: userService.getUserName() })
                    .subscribe(
                        () => console.log('LOG saved on server successfully'),
                        err => {
                            console.log('Failed to save log on server');
                            console.log(err);
                        }
                    );
            })

    }

}