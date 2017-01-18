import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {MarvelComicsService} from '../../app/services/marvel/comics.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  protected comics: any;
  constructor(public navCtrl: NavController, public marvelService: MarvelComicsService) {

  }

  ngOnInit(){
    this.getComics();
  }

  getComics(){
    this.marvelService.getComics().subscribe(res => {
      this.comics = res.data.results
      console.log(this.comics);
    });
  }

}
