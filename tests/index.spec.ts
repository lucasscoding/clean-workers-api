import { Test } from '@/domain'
describe('Fisrt Test', () => {
  it('should test Hello World', () => {
    const test = new Test()
    expect(test.test()).toBe(2)
  })
})
