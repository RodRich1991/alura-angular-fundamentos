import { NgModule } from "@angular/core";
import { SignInComponent } from './signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../app.routing.module';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule,
    ],
    declarations: [ 
        SignInComponent,
        SignUpComponent,
        HomeComponent
    ]
})
export class HomeModule {}