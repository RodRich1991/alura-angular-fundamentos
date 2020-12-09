import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';
import { UserService } from '../../../core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private elementRef: ElementRef,
        private rederer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        let originalDisplay = getComputedStyle(this.elementRef.nativeElement).display;
        this.userService.getUser()
            .subscribe(user => {
                if (user) {
                    this.rederer.setElementStyle(this.elementRef.nativeElement, 'display', originalDisplay);
                } else {
                    originalDisplay = getComputedStyle(this.elementRef.nativeElement).display;
                    this.rederer.setElementStyle(this.elementRef.nativeElement, 'display', 'none');
                }
            });
    }

}