import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ComicPage} from '../comics/comic'
import {CharacterPage} from '../characters/character'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  protected comics: any;
  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
  }

  showComics(){
    this.navCtrl.push(ComicPage);
  }

  showCharacteres(){
    this.navCtrl.push(CharacterPage);
  }


}
