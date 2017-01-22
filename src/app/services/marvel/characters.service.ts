import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {getURL} from './config'
import 'rxjs/Rx';

@Injectable()

export class CharacterService {
    http: any;
    baseUrl : string;
    offsetUrl : string;
    finalUrl : string;
    constructor(http:Http){
        this.http = http;
        this.baseUrl = getURL("characters");
        this.offsetUrl = this.baseUrl +'&offset=' 
    }

    getCharacteres(offset?:number){
        if(offset != undefined){
            this.finalUrl = this.offsetUrl+offset
        }else{
            this.finalUrl = this.baseUrl
        }

        return this.http.get(this.finalUrl)
        .toPromise()
        .then(res => res.json())
        .catch(this.error)
    }

     searchCharateres(character : string, offset?:number){
         if(offset != undefined){
            this.finalUrl = `${this.baseUrl}&nameStartsWith=${character}&offset=${offset}`
        }else{
            this.finalUrl = `${this.baseUrl}&nameStartsWith=${character}`
        }

        return this.http.get(this.finalUrl)
        .toPromise()
        .then(res => res.json())
        .catch(this.error)
    }

    error(error){
        return Promise.reject(error.message || error);
    }

}