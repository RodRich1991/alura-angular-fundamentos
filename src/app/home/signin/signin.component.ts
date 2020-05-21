import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formbuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.formbuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}