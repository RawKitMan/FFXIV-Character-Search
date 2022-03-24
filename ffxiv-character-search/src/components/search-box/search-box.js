import axios from 'axios';
import {bindable} from 'aurelia-framework';

export class SearchBox {
  invalid = false;
  @bindable searchCharacterVal = '';
  @bindable searchServerVal = '';
  @bindable imageSrc;
  @bindable characterName;
  @bindable characterJob;

  async getCharacterInfo() {
    // reset
    this.invalid = false;
    this.imageSrc = '';

    if (this.searchCharacterVal === '' || this.searchServerVal === '') {
      this.showErrorMessage();
      return;
    }

    const searchName = this.searchCharacterVal.split(' ').join('+');

    await axios.get(`https://xivapi.com/character/search?name=${searchName}&server=${this.searchServerVal}`)
      .then((response) => {
        const results = response.data.Results;
        if (results.length === 0) {
          console.log(response);
          this.showErrorMessage();
          return;
        }
        this.characterId = results[0].ID;

      })
      .catch((error) => console.log(error));
      
    this.getCharacterInfoById(this.characterId);
  }
  
  getCharacterInfoById(characterId) {
    this.characterId = characterId;
    axios.get(`https://xivapi.com/character/${characterId}`)
      .then((response) => {
        const characterData = response.data.Character;
        this.imageSrc = characterData.Portrait;
        this.characterName = characterData.Name;
        this.characterJob = characterData.ActiveClassJob.UnlockedState.Name;
      })
      .catch((error) => console.log(error));
  }

  showErrorMessage() {
    this.invalid = true;
  }
}
