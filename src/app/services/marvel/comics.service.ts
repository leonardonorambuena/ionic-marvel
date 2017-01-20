import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {getURL} from './config'
import 'rxjs/Rx';

@Injectable()

export class MarvelComicsService{
    http: any;
    baseUrl : string;
    offsetUrl : string;
    finalUrl : string;
    constructor(http:Http){
        this.http = http;
        this.baseUrl = getURL("comics");

        this.offsetUrl = this.baseUrl +'&offset=' 

    }

    getComics(offset ?: number){
        if(offset != undefined){
            this.finalUrl = this.offsetUrl+offset
        }else{
            this.finalUrl = this.baseUrl
        }
        
        return this.http.get(this.finalUrl)
                .toPromise().then(res => res.json())
                .catch(this.error);
    }

    searchComics(word: string, offset ? : number){
        if(offset != undefined){
            this.finalUrl = `${this.baseUrl}&titleStartsWith=${word}&offset=${offset}`
        }else{
            this.finalUrl = `${this.baseUrl}&titleStartsWith=${word}`
        }

        return this.http.get(this.finalUrl)
                .toPromise().then(res => res.json())
                .catch(this.error);
    }

    error(error:any){
        return Promise.reject(error.message || error);
    }

}