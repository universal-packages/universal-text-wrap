import { wrapText } from '../../src'
import { SHORT_LOREM_IPSUM } from '../__fixtures__/texts'

describe(wrapText, (): void => {
  it('fills the line to the specified width', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        fillBlock: true,
        width: 20
      })
    ).toEqual(`Lorem ipsum dolor   
sit amet,           
consectetur         
adipiscing elit.    `)
  })

  it('works with truncated heights', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        fillBlock: true,
        width: 20,
        height: 3
      })
    ).toEqual(`Lorem ipsum dolor   
sit amet,           
consectetur ...     `)
  })
})
