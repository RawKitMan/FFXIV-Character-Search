import 'regenerator-runtime/runtime';
import { PLATFORM } from 'aurelia-framework';

export class App {
  configureRouter(config, router) {
    config.title = 'FFXIV Character Search';
    config.options.root ='/';
    config.map([
      { 
        route: '/',
        redirect: 'search',
      },
      {
        route: '/search',
        name: 'characterSearch',
        moduleId: PLATFORM.moduleName('./components/character-search/character-search'),
        title: 'Search',
        nav: true,
      },
      {
        route: '/second',
        name: 'secondPage',
        moduleId: PLATFORM.moduleName('./components/second-page/second-page'),
        title: 'Second Page',
        nav: true,
      }
    ]);
    this.router = router;
    console.log(this.router);
  }
}

