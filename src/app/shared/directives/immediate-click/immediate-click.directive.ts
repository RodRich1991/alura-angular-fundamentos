import { Directive, OnInit, ElementRef } from '@angular/core';
import { PlatformDetectorService } from '../../../core/plataform-detector/plataform-detector.service';

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {
    
    constructor(
        private element: ElementRef,
        private platformDetectorService: PlatformDetectorService
    ){}
    
    ngOnInit(): void {
        this.platformDetectorService.isPlatformBrowser()
            && this.element.nativeElement.click();
    }
}