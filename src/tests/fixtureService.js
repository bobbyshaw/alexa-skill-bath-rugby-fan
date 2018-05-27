'use strict';

const assert = require('assert');
const request = require('request-promise');
const sinon = require('sinon');
const FixtureService = require('../lib/fixtureService');
const exampleResponse = require('./fixtureService.json');

describe('The FixtureService component', function () {
    it ('Initialisation', function() {
        var service = new FixtureService('http://www.example.com');
        assert(service.url, 'http://www.example.com');
    });

    it('Get Next Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.fixture('bath rugby')
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'exeter chiefs');
                assert.deepEqual(fixture.awayTeamName, 'Exeter Chiefs');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-03-23T19:45:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });

    it('Get Next Away Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        return service.fixture('bath rugby', [], false, true)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'saracens');
                assert.deepEqual(fixture.homeTeamName, 'Saracens');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-04-15T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Allianz Park');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });

    it('Get Next Home Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        return service.fixture('bath rugby', [], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'exeter chiefs');
                assert.deepEqual(fixture.awayTeamName, 'Exeter Chiefs');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-03-23T19:45:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });

    it('Get Next Home Leicester Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        return service.fixture('bath rugby', ['leicester tigers'], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'leicester tigers');
                assert.deepEqual(fixture.awayTeamName, 'Leicester Tigers');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-04-07T13:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Twickenham Stadium');
                assert.deepEqual(fixture.homeTeamScore, null);
                assert.deepEqual(fixture.awayTeamScore, null);
            });
    });

    it('Get Next Away Leicester Fixture', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        return service.fixture('bath rugby', ['leicester tigers'], false, true)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 0);
            });
    });


    it('Get Last Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby')
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'harlequins');
                assert.deepEqual(fixture.homeTeamName, 'Harlequins');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-03-04T15:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Twickenham Stoop');
                assert.deepEqual(fixture.homeTeamScore, 20);
                assert.deepEqual(fixture.awayTeamScore, 5);
            });
    });

    it('Get Last Home Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', [], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'sale sharks');
                assert.deepEqual(fixture.awayTeamName, 'Sale Sharks');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-02-24T14:30:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 33);
                assert.deepEqual(fixture.awayTeamScore, 32);
            });
    });

    it('Get Last Away Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', [], false, true)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'harlequins');
                assert.deepEqual(fixture.homeTeamName, 'Harlequins');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-03-04T15:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Twickenham Stoop');
                assert.deepEqual(fixture.homeTeamScore, 20);
                assert.deepEqual(fixture.awayTeamScore, 5);
            });
    });


    it('Get Last Home Northampton Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['northampton saints'], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'northampton saints');
                assert.deepEqual(fixture.awayTeamName, 'Northampton Saints');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-02-09T19:45:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 32);
                assert.deepEqual(fixture.awayTeamScore, 9);
            });
    });

    it('Get Last Away Newcastle Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['newcastle falcons'], false, true)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.homeTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-02-16T19:45:00+00:00'));
                assert.deepEqual(fixture.location, 'Kingston Park');
                assert.deepEqual(fixture.homeTeamScore, 29);
                assert.deepEqual(fixture.awayTeamScore, 12);
            });
    });

    it('Get Last Home Newcastle Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['newcastle falcons'], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.awayTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.kickoff, Date.parse('2017-09-23T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 32);
                assert.deepEqual(fixture.awayTeamScore, 33);
            });
    });

    it('Get Last Home Newcastle and Leicester Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['newcastle falcons', 'leicester'], true, false)
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 1);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.awayTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.kickoff, Date.parse('2017-09-23T14:00:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 32);
                assert.deepEqual(fixture.awayTeamScore, 33);
            });
    });

    it('Get Last Northampton and Newcastle Result', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['northampton saints', 'newcastle falcons'])
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 2);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.homeTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-02-16T19:45:00+00:00'));
                assert.deepEqual(fixture.location, 'Kingston Park');
                assert.deepEqual(fixture.homeTeamScore, 29);
                assert.deepEqual(fixture.awayTeamScore, 12);

                fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'northampton saints');
                assert.deepEqual(fixture.awayTeamName, 'Northampton Saints');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-02-09T19:45:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 32);
                assert.deepEqual(fixture.awayTeamScore, 9);
            });
    });

    it('Get Last Newcastle and Northampton Result (reverse date order)', function () {
        var service = new FixtureService('http://www.example.com');

        var requestStub = this.sandbox.stub(request, 'call');
        requestStub.returns(Promise.resolve(exampleResponse));

        /** @type {TablePosition} */
        return service.result('bath rugby', ['newcastle falcons', 'northampton saints'])
            .then(fixtures => {
                assert.deepEqual(fixtures.length, 2);

                var fixture = fixtures.shift();
                assert.deepEqual(fixture.homeTeamId, 'newcastle falcons');
                assert.deepEqual(fixture.homeTeamName, 'Newcastle Falcons');
                assert.deepEqual(fixture.awayTeamId, 'bath rugby');
                assert.deepEqual(fixture.awayTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-02-16T19:45:00+00:00'));
                assert.deepEqual(fixture.location, 'Kingston Park');
                assert.deepEqual(fixture.homeTeamScore, 29);
                assert.deepEqual(fixture.awayTeamScore, 12);

                fixture = fixtures.shift();

                assert.deepEqual(fixture.homeTeamId, 'bath rugby');
                assert.deepEqual(fixture.homeTeamName, 'Bath Rugby');
                assert.deepEqual(fixture.awayTeamId, 'northampton saints');
                assert.deepEqual(fixture.awayTeamName, 'Northampton Saints');
                assert.deepEqual(fixture.kickoff, Date.parse('2018-02-09T19:45:00+00:00'));
                assert.deepEqual(fixture.location, 'Recreation Ground');
                assert.deepEqual(fixture.homeTeamScore, 32);
                assert.deepEqual(fixture.awayTeamScore, 9);
            });
    });
});
