/// <reference path="../../../../typings/modules/crypto-js/index.d.ts" />
import  CryptoJS from  'crypto-js';

const URL:string = "http://gateway.marvel.com:80/v1/public";
const publicKey:string = "8a134a1f518fe068b126c7dab821d79e";
const privateKey:string = "7ee04a2485d7355f98181b60e9d2d434c20931ce";
const TS:number = 1;
let hash = CryptoJS.MD5(TS + privateKey + publicKey);


export function getURL(action:string){
    return `${URL}/${action}?ts=1&apikey=${publicKey}&hash=${hash}`
}

 



