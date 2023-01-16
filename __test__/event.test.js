const Event = require('../event') // import the Event class

describe('Event class', () => {
    test('creates an event with the required properties', () => {
        const event = new Event('2023-05-01', 'Maria Bethânia', 'Berlin');
        expect(event.date).toBe('2023-05-01');
        expect(event.artists).toEqual('Maria Bethânia');
        expect(event.city).toBe('Berlin');
    });

    test('creates an event with more than one artist', () => {
        const event = new Event('2023-05-01', ['Maria Bethânia', 'Caetano Veloso'], 'Berlin');
        expect(event.date).toBe('2023-05-01');
        expect(event.artists).toEqual(['Maria Bethânia', 'Caetano Veloso']);
        expect(event.city).toBe('Berlin');
    });


    test('can update the venue property', () => {
        const event = new Event('2023-05-01', 'Maria Bethânia', 'Berlin');
        event.venue = 'HKW';
        expect(event.venue).toBe('HKW');
    });

    test('can update the name property', () => {
        const event = new Event('2023-05-01', 'Maria Bethânia', 'Berlin');
        event.name = 'Live in Berlin';
        expect(event.name).toBe('Live in Berlin');
    });

    test('can add users to the favoritedBy property', () => {
        const event = new Event('2023-05-01', 'Maria Bethânia', 'Berlin');
        event.favoritedBy.push('Peter');
        event.favoritedBy.push('Laura');
        expect(event.favoritedBy).toEqual(['Peter', 'Laura']);
    });
});
