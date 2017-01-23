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

    searchComics(word: string, offset ? : number, limit?:boolean){
        if(offset != undefined){
            this.finalUrl = `${this.baseUrl}&titleStartsWith=${word}&offset=${offset}`
        }else if(limit){
            this.finalUrl = `${this.baseUrl}&titleStartsWith=${word}&limit=5`
        }else{
            this.finalUrl = `${this.baseUrl}&titleStartsWith=${word}`
        }

        return this.http.get(this.finalUrl)
                .toPromise().then(res => res.json())
                .catch(this.error);
    }

    findComic(id:number){
        let url = getURL(`comics/${id}`)
        console.log(url)
        return this.http.get(url)
                .toPromise().then(res => res.json())
                .catch(this.error);
    }


    error(error:any){
        return Promise.reject(error.message || error);
    }

}