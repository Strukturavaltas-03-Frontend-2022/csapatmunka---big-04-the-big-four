import { HasCorrectKeyPipe } from './has-correct-key.pipe';

describe('HasCorrectKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new HasCorrectKeyPipe();
    expect(pipe).toBeTruthy();
  });
});
