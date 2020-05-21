import { NgModule } from "@angular/core";
import { SignInComponent } from './signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        VMessageModule,
        RouterModule
    ],
    declarations: [ 
        SignInComponent,
        SignUpComponent
    ]
})
export class HomeModule {}