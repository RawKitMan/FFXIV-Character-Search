import axios from 'axios';

export class CharacterSearch {
    imageSrc = '';
    characterJob = '';
    characterName = '';
    searchCharacterVal = '';
    searchServerVal = '';
    invalid = false;

    get showImg() {
      return this.imageSrc !== '';
    }

    getCharacterInfoById(id) {
        axios.get(`https://xivapi.com/character/${id}`)
          .then((response) => {
            const characterData = response.data.Character;
            this.imageSrc = characterData.Portrait;
            this.characterName = characterData.Name;
            this.characterJob = characterData.ActiveClassJob.UnlockedState.Name;
          })
          .catch((error) => console.log(error));
    }

    async getCharacterInfo() {
      // reset
      this.invalid = false;
      this.imageSrc = '';

      if (this.searchCharacterVal === '' || this.searchServerVal === '') {
        this.showErrorMessage();
        return;
      }

      const searchName = this.searchCharacterVal.split(' ').join('+');
      let charId = 0;

      await axios.get(`https://xivapi.com/character/search?name=${searchName}&server=${this.searchServerVal}`)
        .then((response) => {
          const results = response.data.Results;
          if (results.length === 0) {
            console.log(response);
            this.showErrorMessage();
            return;
          }
          charId = results[0].ID;
        })
        .catch((error) => console.log(error));
        
      this.getCharacterInfoById(charId);
    }

    showErrorMessage() {
      this.invalid = true;
    }
}
