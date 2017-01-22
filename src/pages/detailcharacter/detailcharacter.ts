import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector : 'page-detailcharacter',
    templateUrl : 'detailcharacter.html'
})

export class DetailCharacterPage {
    character : any;

    constructor(public navCtrl: NavController, private params : NavParams){
        this.character = this.params.get("character");
    }

}