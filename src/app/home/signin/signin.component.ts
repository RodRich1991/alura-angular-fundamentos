import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/plataform-detector.service';

@Component({
    templateUrl: './signin.component.html',
    providers: [ AuthService ]
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formbuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formbuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.focusOnUserNameInput();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
        .authenticate(userName, password)
        .subscribe(
            () => this.router.navigate(['user', userName]),
            err => {
                console.error(err);
                this.loginForm.reset();
                this.focusOnUserNameInput();
                alert('Invalid user name or password');
            });
    }

    focusOnUserNameInput() {
        this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
    }
}