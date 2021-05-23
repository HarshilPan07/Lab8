/**
 * @jest-environment jsdom
 */

import {pushToHistory} from '../scripts/router.js';

describe('top state is ', () => {
    test('settings', () => {
        let hist = pushToHistory('settings');
        
        expect(hist.state).toEqual({page: 'settings'});
        expect(hist.length).toEqual(2);
    });

    test('entry', () => {
        let hist = pushToHistory('entry', 5);
        
        expect(hist.state).toEqual({page: 'entry5'});
        expect(hist.length).toEqual(3);
    });
    
    test('other', () => {
        let hist = pushToHistory('');
        
        expect(hist.state).toEqual({});
        expect(hist.length).toEqual(4);
    });
});
