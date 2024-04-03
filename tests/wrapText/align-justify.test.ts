import { wrapText } from '../../src'
import { LOREM_IPSUM } from '../__fixtures__/texts'

describe(wrapText, (): void => {
  it('wraps text justifying it', async (): Promise<void> => {
    expect(
      wrapText(LOREM_IPSUM, {
        align: 'justify',
        width: 40
      })
    ).toEqual(`Lorem  ipsum dolor sit amet, consectetur
adipiscing  elit.  Sed do eiusmod tempor
incididunt  ut  labore  et  dolore magna
aliqua.  Ut  enim  ad minim veniam, quis
nostrud   exercitation  ullamco  laboris
nisi ut aliquip ex ea commodo consequat.`)
  })

  it('works with truncated heights', async (): Promise<void> => {
    expect(
      wrapText(LOREM_IPSUM, {
        align: 'justify',
        width: 40,
        height: 4
      })
    ).toEqual(`Lorem  ipsum dolor sit amet, consectetur
adipiscing  elit.  Sed do eiusmod tempor
incididunt  ut  labore  et  dolore magna
aliqua. Ut enim ad minim veniam, quis...`)
  })

  it('does not justify short lines', async (): Promise<void> => {
    expect(
      wrapText(LOREM_IPSUM.substring(0, LOREM_IPSUM.length - 19), {
        align: 'justify',
        width: 40
      })
    ).toEqual(`Lorem  ipsum dolor sit amet, consectetur
adipiscing  elit.  Sed do eiusmod tempor
incididunt  ut  labore  et  dolore magna
aliqua.  Ut  enim  ad minim veniam, quis
nostrud   exercitation  ullamco  laboris
nisi ut aliquip ex ea`)
  })
})
