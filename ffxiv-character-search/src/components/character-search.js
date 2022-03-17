export class CharacterSearch {
    imageSrc = '';
    characterJob = ''
    get showImg() {
        return this.imageSrc !== '';
    }

    created() {
        this.getCharacterInfo();
    }

    getCharacterInfoById(id) {
        let xhttp = new XMLHttpRequest();
        const instance = this;
        xhttp.open('GET', `https://xivapi.com/character/${id}`);
        xhttp.onload = function () {
            const charResults = JSON.parse(this.response).Character;
            instance.imageSrc = charResults.Portrait;
            instance.characterJob = charResults.ActiveClassJob.UnlockedState.Name;
        }
        xhttp.send();
    }

    getCharacterInfo() {
        let xhttp = new XMLHttpRequest();
        const instance = this;
        xhttp.open('GET', `https://xivapi.com/character/search?name=Cenne+Hyskaris&server=Lamia`);
        xhttp.onload = function () {
            const charResults = JSON.parse(this.response).Results[0];
            instance.getCharacterInfoById(charResults.ID);
        }
        xhttp.send();
    }
}