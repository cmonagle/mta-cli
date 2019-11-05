const {expect} = require('chai');
const {getLines} = require('./Line');

const resultsFixture = JSON.parse(`[{\"borough\":\"BRONX\",\"color\":\"#E31D00\",\"stations\":[{\"name\":\"Van Cortlandt Park - 242 St\",\"id\":\"101\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"238 St\",\"id\":\"103\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"231 St\",\"id\":\"104\",\"type\":\"0\",\"ada\":\"\"}]},{\"borough\":\"MANHATTAN\",\"color\":\"#E31D00\",\"stations\":[{\"name\":\"Marble Hill - 225 St\",\"id\":\"106\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"215 St\",\"id\":\"107\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"207 St\",\"id\":\"108\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Dyckman St\",\"id\":\"109\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"191 St\",\"id\":\"110\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"181 St\",\"id\":\"111\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"168 St\",\"id\":\"112\",\"type\":\"0\",\"ada\":\"\",\"status\":\"-1\"},{\"name\":\"157 St\",\"id\":\"113\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"145 St\",\"id\":\"114\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"137 St - City College\",\"id\":\"115\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"125 St\",\"id\":\"116\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"116 St - Columbia University\",\"id\":\"117\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Cathedral Pkwy (110 St)\",\"id\":\"118\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"103 St\",\"id\":\"119\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"96 St\",\"id\":\"120\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"86 St\",\"id\":\"121\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"79 St\",\"id\":\"122\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"72 St\",\"id\":\"123\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"66 St - Lincoln Center\",\"id\":\"124\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"59 St - Columbus Circle\",\"id\":\"125\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"50 St\",\"id\":\"126\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Times Sq - 42 St\",\"id\":\"127\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"34 St - Penn Station\",\"id\":\"128\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"28 St\",\"id\":\"129\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"23 St\",\"id\":\"130\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"18 St\",\"id\":\"131\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"14 St\",\"id\":\"132\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Christopher St - Sheridan Sq\",\"id\":\"133\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Houston St\",\"id\":\"134\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Canal St\",\"id\":\"135\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Franklin St\",\"id\":\"136\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Chambers St\",\"id\":\"137\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"WTC Cortlandt\",\"id\":\"138\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"Rector St\",\"id\":\"139\",\"type\":\"0\",\"ada\":\"\"},{\"name\":\"South Ferry\",\"id\":\"142\",\"type\":\"0\",\"ada\":\"\"}]}]`);
function mockGet(resolves, expectation) {
    return function(...params) {
        return new Promise(resolve => {
            expectation.result = expectation.test(...params);
            resolve(resolves);
        })
    }
}
describe('Line', function () {
    it('should call the get function with the right params & respond with correct shape', async function () {
        const expectation = {
            test: url => url === 'http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getStationsByLine/1',
            result: undefined
        };
        const get = mockGet(resultsFixture, expectation);

        const line = await getLines('1', get);

        expect(line.name).to.eql('1');
        expect(line.stops.length).to.eql(38);
        expect(line.stops.every(val => typeof val === 'number')).to.be.true;
        expect(expectation.result).to.be.true;
    });
});