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
  protected results : any;
  protected showResults : boolean;

  constructor(public navCtrl: NavController, public marvelService: MarvelComicsService, private toastCtrl: ToastController) {
    this.noRecords = false;
    this.showResults = false;
  }

  ngOnInit(){
    this.getComics();
    
  }

  getComics(){
    this.marvelService.getComics().then(res => {
      this.setValues(res)
    });
  }

  setValues(res:any){
    this.comics = res.data.results
    this.countComics = res.data.count
    this.offset = res.data.offset 
    this.totalComics = res.data.total
    if(this.totalComics == 0){
      this.message("no se encontraron registros","top");
    }
  }

  listTitles(event:any){
    let word = event.target.value;
    if(event.keyCode === 13){
      this.showResults = false;
    }else if(word.length > 0){
      this.marvelService.searchComics(word,undefined,true)
      .then(res => {
        if(res.data.total > 0){
          this.showResults = true;
          this.results = res.data.results;
        }else{
          this.showResults = false;
        }
          
      })
    }
    
  }

  searchInService(comic:string){
    this.offset = undefined
    this.totalComics = null
    this.marvelService.searchComics(this.searchComicText)
    .then(res =>{
      this.setValues(res);
    })
  }
  searchComics(word:any){
    if(word.keyCode == 13 && this.searchComicText.length > 2){
      this.searchInService(this.searchComicText)
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

  copyResult(id:number, comic:string){
    this.showResults = false;
    this.searchComicText = comic
    this.marvelService.findComic(id).then(res => {
      this.setValues(res)
    });
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
