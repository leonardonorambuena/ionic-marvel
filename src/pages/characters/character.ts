import {Component} from '@angular/core'

import {NavController, ToastController} from 'ionic-angular'

import {CharacterService} from '../../app/services/marvel/characters.service'

import {DetailCharacterPage} from '../detailcharacter/detailcharacter'

@Component({
    selector: 'page-character',

    templateUrl: 'character.html',

    providers: [CharacterService]

})

export class CharacterPage{

    protected offset : number;
    protected count : number;
    protected total : number;

    public characteres : any;

    protected searchText : string = '';

    protected newCharacters : any;


    constructor(public navCtrl : NavController, public characterService : CharacterService, private toastCtrl: ToastController){

    }

    ngOnInit(){
        this.getCharacteres();
    }

    getCharacteres(){
        this.characterService.getCharacteres().then(res => {
            this.offset = res.data.offset;
            this.total = res.data.total;
            this.count = res.data.count
            this.characteres = res.data.results
        })
    }

    show(character : any){
        this.navCtrl.push(DetailCharacterPage, {character:character});
    }

    searchCharacteres(event:any){
        if(event.keyCode === 13 && this.searchText == ''){
            this.getCharacteres();
        }

        if(event.keyCode === 13 && this.searchText.length > 0){
            this.characterService.searchCharateres(this.searchText).then(res => {
                this.offset = res.data.offset;
                this.total = res.data.total;
                this.count = res.data.count
                this.characteres = res.data.results
            })
        }
    }


    doInfinite(infiniteScroll) {
      if(this.searchText.length > 2){
          this.offset += this.count
          this.characterService.searchCharateres(this.searchText, this.offset).then(res =>{
            this.count = res.data.count;
            this.newCharacters = res.data.results;
            for(let com of this.newCharacters){
              this.characteres.push(com)
            }
            infiniteScroll.complete();
          })
          
      }else{
            this.offset += this.count
            this.characterService.getCharacteres(this.offset).then(res =>{
              this.count = res.data.count;
              this.newCharacters = res.data.results;
              for(let com of this.newCharacters){
                this.characteres.push(com)
              }
              infiniteScroll.complete();
            })
            
          }


  }
}