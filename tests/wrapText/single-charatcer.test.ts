import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('default to the same string if is just one character', async (): Promise<void> => {
    expect(
      wrapText(' ', {
        fillBlock: true
      })
    ).toEqual(' ')
  })

  it('works with truncated heights', async (): Promise<void> => {
    expect(
      wrapText(' ', {
        fillBlock: true,
        height: 3
      })
    ).toEqual(' \n \n ')
  })
})
