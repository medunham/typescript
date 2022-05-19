// Note: this file is just a module smoke test
import { HELLO_WORLD } from './index';

describe('module', () => {
  it('exports constants', () => {
    expect(HELLO_WORLD).toEqual('Hello World');
  });
});
