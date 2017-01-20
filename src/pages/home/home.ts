import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ComicPage} from '../comics/comic'

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



}
