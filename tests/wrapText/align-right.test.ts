import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('wraps text to the right', async (): Promise<void> => {
    const largeText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

    const wrappedText = wrapText(largeText, 40, { align: 'right' })

    expect(wrappedText).toEqual(` Lorem ipsum dolor sit amet, consectetur
  adipiscing elit. Sed do eiusmod tempor
    incididunt ut labore et dolore magna
   aliqua. Ut enim ad minim veniam, quis
    nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`)
  })
})
