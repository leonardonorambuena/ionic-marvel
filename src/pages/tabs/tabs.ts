import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import {MarvelComicsService} from '../../app/services/marvel/comics.service'
import { ComicPage } from '../comics/comic';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  //tab3Root: any = ComicPage;

  constructor() {

  }
}
