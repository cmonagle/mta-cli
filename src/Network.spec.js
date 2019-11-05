const { expect } = require('chai');
const { getNetwork } = require('./Network');

const resultsFixture = JSON.parse('[{"lineImage":"img/1.png","id":"1"},{"lineImage":"img/2.png","id":"2"},{"lineImage":"img/3.png","id":"3"},{"lineImage":"img/4.png","id":"4"},{"lineImage":"img/5.png","id":"5"},{"lineImage":"img/6.png","id":"6"},{"lineImage":"img/7.png","id":"7"},{"lineImage":"img/A.png","id":"A"},{"lineImage":"img/C.png","id":"C"},{"lineImage":"img/E.png","id":"E"},{"lineImage":"img/G.png","id":"G"},{"lineImage":"img/B.png","id":"B"},{"lineImage":"img/D.png","id":"D"},{"lineImage":"img/F.png","id":"F"},{"lineImage":"img/M.png","id":"M"},{"lineImage":"img/J.png","id":"J"},{"lineImage":"img/Z.png","id":"Z"},{"lineImage":"img/L.png","id":"L"},{"lineImage":"img/S.png","id":"S"},{"lineImage":"img/N.png","id":"N"},{"lineImage":"img/Q.png","id":"Q"},{"lineImage":"img/R.png","id":"R"},{"lineImage":"img/W.png","id":"W"},{"lineImage":"img/SIR.png","id":"SIR"}]');
function mockGet (resolves, expectation) {
  return function (...params) {
    return new Promise(resolve => {
      expectation.result = expectation.test(...params);
      resolve(resolves);
    });
  };
}
describe('Network', function () {
  it('should call the get function with the right param & respond with correct shape', async function () {
    const expectation = {
      test: url => url === 'http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getSubwaylines',
      result: undefined
    };
    const get = mockGet(resultsFixture, expectation);

    const network = await getNetwork(get);
    expect(network.lines.length).to.eq(24);
    expect(expectation.result).to.be.true;
  });
});
