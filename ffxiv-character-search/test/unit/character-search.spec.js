import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { PLATFORM } from 'aurelia-pal';
import { findAll } from '../../node_modules/domutils/lib/querying';

describe('CharacterSearch', () => {
    let component;

    beforeEach(() => {
        component = StageComponent
            .withResources(PLATFORM.moduleName('../../src/components/character-search/character-search'))
            .inView('<character-search></character-search>');
    });

    it('should render headerElement', done => {
        component.create(bootstrap).then(() => {
            const headerElement = document.querySelector('#header');
            expect(headerElement.innerHTML).toBe('FFXIV Character Search');
            done();
        })
    });

    afterEach(() => {
        if (component) {
            component.dispose();
            component = null;
        }
    })
});
