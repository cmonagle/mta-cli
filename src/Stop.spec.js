const { expect } = require('chai');
const { getStops } = require('./Stop');

/**
 * @TODO the fileStreamer should really be mocked so we're not testing
 * the node stdlib, but it's a bit involved so I'm gonna let it read the file
 */
describe('Stop', function () {
  it('should call the get function with the right param & respond with correct shape', async function () {
    const lineFixture = JSON.parse('{"name":"1","stops":["101","103","104","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","142"]}');
    const stops = await getStops(lineFixture);
    const allValid = stops.every(stop => {
        return stop.id
            && stop.name
            && stop.coordinates.length === 2
            && stop.furthestStop
            && stop.furthestStop.name
            && stop.furthestStop.distance
    });

    expect(allValid).to.be.true;
    expect(stops.length).to.eq(38);
    expect(stops[0]).to.eqls({
        name: 'Van Cortlandt Park - 242 St',
        id: '101',
        coordinates: [ 40.889248, -73.898583 ],
        furthestStop: { name: 'South Ferry', distance: 0.21972707835176503 }
    });
  });
});
