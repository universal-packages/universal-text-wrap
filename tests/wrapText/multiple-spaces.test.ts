import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('respects multiple spaces between words', async (): Promise<void> => {
    const largeText = '  Hello    World!'

    const wrappedText = wrapText(largeText, { width: 10 })

    expect(wrappedText).toEqual(`  Hello   
World!`)

    const wrappedText2 = wrapText(largeText, { width: -10 })

    expect(wrappedText2).toEqual(`

Hello



World!`)
  })
})
