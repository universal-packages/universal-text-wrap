import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('fills the line to the specified width', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, { fillBlock: true, width: 20 })

    expect(wrappedText).toEqual(`Lorem ipsum dolor   
sit amet,           
consectetur         
adipiscing elit     `)
  })

  it('works with truncated heights', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, { fillBlock: true, width: 20, height: 3 })

    expect(wrappedText).toEqual(`Lorem ipsum dolor   
sit amet,           
consectetur ...     `)
  })
})
