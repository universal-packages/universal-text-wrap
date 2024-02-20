import { wrapText } from '../../src'
import { LOREM_IPSUM } from '../__fixtures__/texts'

describe(wrapText, (): void => {
  it('wraps text left by default', async (): Promise<void> => {
    expect(
      wrapText(LOREM_IPSUM, {
        width: 40
      })
    ).toEqual(`Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`)

    expect(
      wrapText(LOREM_IPSUM, {
        align: 'left',
        width: 40
      })
    ).toEqual(`Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`)
  })

  it('works with truncated heights', async (): Promise<void> => {
    expect(
      wrapText(LOREM_IPSUM, {
        width: 40,
        height: 4
      })
    ).toEqual(`Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis...`)
  })
})
