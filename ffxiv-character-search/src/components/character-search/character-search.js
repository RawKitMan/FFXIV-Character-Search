import {bindable} from 'aurelia-framework';

export class CharacterSearch {
    @bindable imageSrc = '';
    @bindable characterJob = '';
    @bindable characterName = '';
    
    get showImg() {
      return this.imageSrc !== '';
    }

    // async getCharacterInfo() {
    //   // reset
    //   this.invalid = false;
    //   this.imageSrc = '';

    //   if (this.searchCharacterVal === '' || this.searchServerVal === '') {
    //     this.showErrorMessage();
    //     return;
    //   }

    //   const searchName = this.searchCharacterVal.split(' ').join('+');
    //   let charId = 0;

    //   await axios.get(`https://xivapi.com/character/search?name=${searchName}&server=${this.searchServerVal}`)
    //     .then((response) => {
    //       const results = response.data.Results;
    //       if (results.length === 0) {
    //         console.log(response);
    //         this.showErrorMessage();
    //         return;
    //       }
    //       charId = results[0].ID;
    //     })
    //     .catch((error) => console.log(error));
        
    //   this.getCharacterInfoById(charId);
    // }

    // showErrorMessage() {
    //   this.invalid = true;
    // }
}
