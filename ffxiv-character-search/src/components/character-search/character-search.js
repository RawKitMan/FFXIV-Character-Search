export class CharacterSearch {
    imageSrc = '';
    characterJob = ''
    invalid = false;
    get showImg() {
      return this.imageSrc !== '';
    }
    get invalidSearch() {
      return this.invalid;
    }

    getCharacterInfoById(id) {
        let xhttp = new XMLHttpRequest();
        const instance = this;
        xhttp.open('GET', `https://xivapi.com/character/${id}`);
        xhttp.onload = function () {
            console.log('response', this.response);
            const charResults = JSON.parse(this.response).Character;
            instance.imageSrc = charResults.Portrait;
            instance.characterJob = charResults.ActiveClassJob.UnlockedState.Name;
        }
        xhttp.onerror = function () {
          this.showErrorMessage();
        }
        xhttp.send();
    }

    getCharacterInfo() {
      this.invalid = false;
      this.imageSrc = '';
      const searchCharacterEl = document.getElementById('searchCharacter');
      const searchServerEl = document.getElementById('searchServer');
      const searchName = searchCharacterEl.value.split(' ').join('+');
      const searchServer = searchServerEl.value;

      if (searchName === null || searchName === ''  || searchServerEl === null || searchServer === '') {
        this.showErrorMessage();
        return;
      }
      
      let xhttp = new XMLHttpRequest();
        const instance = this;
        xhttp.open('GET', `https://xivapi.com/character/search?name=${searchName}&server=${searchServer}`);
        xhttp.onload = function () {
            const response = JSON.parse(this.response);
            if (response.Results.length === 0) {
              instance.showErrorMessage();
              return;
            }
            const charResults = response.Results[0];
            instance.getCharacterInfoById(charResults.ID);
        }
        xhttp.onerror = function () {
          this.showErrorMessage();
        }
        xhttp.send();
    }

    showErrorMessage() {
      this.invalid = true;
    }
}
