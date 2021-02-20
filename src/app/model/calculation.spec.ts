import { Calculation } from './calculation';

describe('Calculation', () => {
  it('should create an instance', () => {
    expect(new Calculation(0,0,"multiply",0, new Date())).toBeTruthy();
  });
});
