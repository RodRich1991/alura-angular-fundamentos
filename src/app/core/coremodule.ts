import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComonent } from "./footer/footer.component";
import { AlertModule } from "../shared/components/alert/alert.module";
import { LoadingModule } from "../shared/components/loading/loading.module";

@NgModule({
    imports: [ 
        CommonModule,
        RouterModule,
        AlertModule,
        LoadingModule
    ],
    declarations: [ 
        HeaderComponent,
        FooterComonent
    ],
    exports: [ 
        HeaderComponent,
        FooterComonent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
    ]
})
export class CoreModule { }