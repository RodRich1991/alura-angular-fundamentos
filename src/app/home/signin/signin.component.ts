import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/plataform-detector.service';

@Component({
    templateUrl: './signin.component.html',
    providers: [ AuthService ]
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;
    fromUrl: string;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formbuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute
            .queryParams
            .subscribe(params => this.fromUrl = params.fromUrl);
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
            () => this.fromUrl
                ? this.router.navigateByUrl(this.fromUrl)
                : this.router.navigate(['user', userName]),
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