import { NgModule } from "@angular/core";
import { SignInComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        VMessageModule,
        RouterModule
    ],
    declarations: [ SignInComponent ]
})
export class HomeModule {}