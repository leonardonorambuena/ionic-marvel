import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

import {MarvelComicsService} from '../../app/services/marvel/comics.service'

@Component({
  selector: 'page-comic',
  templateUrl: 'comic.html',
  providers : [MarvelComicsService]
})
export class ComicPage {
  protected comics: any;
  protected newComics : any;
  protected searchComicText : string = '';
  protected countComics : number;
  protected totalComics : number;
  protected limit : number;
  protected offset : number;

  protected noRecords : boolean;

  constructor(public navCtrl: NavController, public marvelService: MarvelComicsService, private toastCtrl: ToastController) {
    this.noRecords = false;
  }

  ngOnInit(){
    this.getComics();
    
  }

  getComics(){
    this.marvelService.getComics().then(res => {
      this.comics = res.data.results
      this.countComics = res.data.count
      this.offset = res.data.offset 
      this.totalComics = res.data.total
    });
  }

  searchComics(word:any){
    if(word.keyCode == 13 && this.searchComicText.length > 2){
      this.offset = undefined
      this.totalComics = null
      this.marvelService.searchComics(this.searchComicText)
      .then(res =>{
        this.comics = res.data.results
        this.countComics = res.data.count
        this.offset = res.data.offset 
        this.totalComics = res.data.total
        if(this.totalComics == 0){
          this.message("no se encontraron registros","top");
        }
      })
    }

    if(word.keyCode == 13 && this.searchComicText == ''){
      this.getComics();
    }
  }

  message(message: string, position: string, duration : number = 3000){
    let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position
          });

    toast.present();
    this.searchComicText = '';
    this.getComics();
  }

  doInfinite(infiniteScroll) {
      if(this.searchComicText.length > 2){
          this.offset += this.countComics
          this.marvelService.searchComics(this.searchComicText, this.offset).then(res =>{
            this.countComics = res.data.count;
            this.newComics = res.data.results;
            for(let com of this.newComics){
              this.comics.push(com)
            }
            infiniteScroll.complete();
          })
          
      }else{
            this.offset += this.countComics
            this.marvelService.getComics(this.offset).then(res =>{
              this.countComics = res.data.count;
              this.newComics = res.data.results;
              for(let com of this.newComics){
                this.comics.push(com)
              }
              infiniteScroll.complete();
            })
            
          }


  }

}
