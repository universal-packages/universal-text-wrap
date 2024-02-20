import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('wraps text justifying it', async (): Promise<void> => {
    const largeText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

    const wrappedText = wrapText(largeText, { align: 'justify', width: 40 })

    expect(wrappedText).toEqual(`Lorem  ipsum dolor sit amet, consectetur
adipiscing  elit.  Sed do eiusmod tempor
incididunt  ut  labore  et  dolore magna
aliqua.  Ut  enim  ad minim veniam, quis
nostrud   exercitation  ullamco  laboris
nisi ut aliquip ex ea commodo consequat.`)
  })

  it('works with truncated heights', async (): Promise<void> => {
    const largeText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

    const wrappedText = wrapText(largeText, { align: 'justify', width: 40, height: 4 })

    expect(wrappedText).toEqual(`Lorem  ipsum dolor sit amet, consectetur
adipiscing  elit.  Sed do eiusmod tempor
incididunt  ut  labore  et  dolore magna
aliqua. Ut enim ad minim veniam, quis...`)
  })
})
