import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AlertService {
    
    private alertSubject = new Subject<Alert>();
    private keepAlertAfterNavigate = false;

    constructor(router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAlertAfterNavigate) {
                    this.keepAlertAfterNavigate = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    getAlert() {
        return this.alertSubject.asObservable();
    }

    danger(message: string, keepAlertAfterNavigate = false) {
        return this.alert(AlertType.DANGER, message, keepAlertAfterNavigate);
    }

    info(message: string, keepAlertAfterNavigate = false) {
        return this.alert(AlertType.INFO, message, keepAlertAfterNavigate);
    }

    success(message: string, keepAlertAfterNavigate = false) {
        return this.alert(AlertType.SUCCESS, message, keepAlertAfterNavigate);
    }

    warning(message: string, keepAlertAfterNavigate = false) {
        return this.alert(AlertType.WARNING, message, keepAlertAfterNavigate);
    }
    
    private alert(alertType: AlertType, message: string, keepAlertAfterNavigate: boolean) {
        this.keepAlertAfterNavigate = keepAlertAfterNavigate;
        this.alertSubject.next(new Alert(alertType, message));
    }

    private clear() {
        this.alertSubject.next(null);
    }
}