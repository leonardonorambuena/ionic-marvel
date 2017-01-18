import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {getURL} from './config'
import 'rxjs/Rx';

@Injectable()

export class MarvelComicsService{
    http: any;
    baseUrl : string;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = getURL("comics");
    }

    getComics(limit : number = 20){
        return this.http.get(this.baseUrl)
                .map(res => res.json());
    }

}