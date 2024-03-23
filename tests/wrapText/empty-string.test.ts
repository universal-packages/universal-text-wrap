import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('can handle empty strings', async (): Promise<void> => {
    expect(wrapText('')).toEqual('')
    expect(wrapText(undefined)).toEqual('')
    expect(wrapText(null)).toEqual('')
  })
})
