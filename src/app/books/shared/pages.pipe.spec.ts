import { PagesPipe } from './pages.pipe';

describe('PagesPipe', () => {
  const pipe = new PagesPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return a "S.: 333"', () => {
    expect(pipe.transform('333')).toBe('S.: 333');
  });
});
