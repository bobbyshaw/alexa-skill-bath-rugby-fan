'use strict';

const assert = require('assert');
const request = require('request-promise');
const sinon = require('sinon');
const TableService = require('../lib/tableService');
const exampleResponse = require('./tableService.json');

describe('The TableService component', function () {
    it ('Initialisation', function() {
        var service = new TableService('http://www.example.com');
        assert(service.url, 'http://www.example.com');
    });

    it('Get Specific Team Positions', function () {
        var service = new TableService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        var answers = {
            'Bath Rugby': {
                'position': 6,
                'teamName': 'Bath Rugby',
                'played': 22,
                'won': 11,
                'drawn': 0,
                'lost': 11,
                'pointsFor': 572,
                'pointsAgainst': 531,
                'bonusPoints': 12,
                'points': 56
            },
            'Gloucester': {
                'position': 7,
                'teamName': 'Gloucester',
                'played': 22,
                'won': 11,
                'drawn': 1,
                'lost': 10,
                'pointsFor': 490,
                'pointsAgainst': 597,
                'bonusPoints': 10,
                'points': 56
            }
        };

        /** @type {TablePosition} */
        return service.getPositions(['bath rugby', 'Gloucester'])
            .then(positions => {
                for (let position of positions) {
                    if (position.teamName in answers) {
                        let team = answers[position.teamName];
                        assert.deepEqual(position.position, team.position);
                        assert.deepEqual(position.teamName, team.teamName);
                        assert.deepEqual(position.played, team.played);
                        assert.deepEqual(position.won, team.won);
                        assert.deepEqual(position.drawn, team.drawn);
                        assert.deepEqual(position.lost, team.lost);
                        assert.deepEqual(position.pointsFor, team.pointsFor);
                        assert.deepEqual(position.pointsAgainst, team.pointsAgainst);
                        assert.deepEqual(position.bonusPoints, team.bonusPoints);
                        assert.deepEqual(position.points, team.points);
                    } else {
                        throw Error(position.teamName + ' should not have been returned');
                    }
                }

                if (positions.length !== Object.keys(answers).length) {
                    throw Error('Incorrect number of team positions returned');
                }
            });
    });
});
