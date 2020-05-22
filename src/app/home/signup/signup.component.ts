import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { lowerCaseValidator } from '../../shared/validators/lowercase.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/plataform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') private emailForm: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder, 
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', 
                [ 
                    Validators.required, 
                    Validators.email 
                ]
            ],
            fullName: ['', 
                [
                    Validators.required,
                    Validators.minLength(2), 
                    Validators.maxLength(40) 
                ]
            ],
            userName: ['', 
                [
                    Validators.required, 
                    lowerCaseValidator,
                    Validators.minLength(2), 
                    Validators.maxLength(30) 
                ],
                this.userNotTakenValidatorService.userNotTakenValidator()
            ],
            password: ['', 
                [
                    Validators.required, 
                    Validators.minLength(8), 
                    Validators.maxLength(14) 
                ]
            ]
        });
        this.focusOnEmailInput();
    }

    signUp() {
        const newUser: NewUser = this.signupForm.getRawValue();
        this.signUpService
        .signUp(newUser)
        .subscribe(
            () => this.router.navigate(['']),
            error => console.error(error)
        );
    }
    
    focusOnEmailInput() {
        this.platformDetectorService.isPlatformBrowser() &&
            this.emailForm.nativeElement.focus();
    }
}