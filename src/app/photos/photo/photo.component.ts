import { Component, Input } from "@angular/core";
import { environment } from '../../../environments/environment';

const cloud = environment.API_URL + '/imgs/';

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {

    private _url = '';

    @Input() description='';

    @Input() set url(url: string) {
        this._url = url;
    }

    get url() {
        return ( this._url.startsWith('data') ? '' : cloud )
            + this._url;
    }
}