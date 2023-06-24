import { main } from '../src/main.js';

describe('make sure test setup is correctly configured', () => {
  beforeEach(async () => {
    // Setup before assertions
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('delays the greeting by 2 seconds', () => {
    expect(main()).toEqual('Hello World!');
  });
});
