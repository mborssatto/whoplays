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



/* Attempt to review this into mongoose schemas:


const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate');
const event = require('../src/models/event');

const Event = require('../src/models/event')

describe('Event model', () => {
    test('creates an event with the required properties', async () => {
        // call the Create method to create a new event in the database
        const eventInstance = await Event.create({
            date: '2023-05-01',
            artist: ['Maria Bethânia'],
            city: 'Berlin'
        });
        expect(eventInstance.date).toBe('2023-05-01');
        expect(eventInstance.artist).toEqual(['Maria Bethânia']);
        expect(eventInstance.city).toBe('Berlin');
    });

    test('creates an event with more than one artist', async () => {
        const eventInstance = await eventInstance.Create('2023-05-01', ['Maria Bethânia', 'Caetano Veloso'], 'Berlin');
        expect(eventInstance.date).toBe('2023-05-01');
        expect(eventInstance.artists).toEqual(['Maria Bethânia', 'Caetano Veloso']);
        expect(eventInstance.city).toBe('Berlin');
    });


    test('can update the venue property', async () => {
        const eventInstance = await eventInstance.Create('2023-05-01', 'Maria Bethânia', 'Berlin');
        eventInstance.venue = 'HKW';
        expect(eventInstance.venue).toBe('HKW');
    });

    test('can update the name property', async () => {
        const eventInstance = await eventInstance.Create('2023-05-01', 'Maria Bethânia', 'Berlin');
        eventInstance.name = 'Live in Berlin';
        expect(eventInstance.name).toBe('Live in Berlin');
    });

    test('can add users to the favoritedBy property', async () => {
        const eventInstance = await eventInstance.Create('2023-05-01', 'Maria Bethânia', 'Berlin');
        eventInstance.favoritedBy.push('Peter');
        eventInstance.favoritedBy.push('Laura');
        expect(eventInstance.favoritedBy).toEqual(['Peter', 'Laura']);
    });
});

*/