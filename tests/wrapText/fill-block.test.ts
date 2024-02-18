import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('fills the line to the specified width', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, 20, {
      fillBlock: true
    })

    expect(wrappedText).toEqual(`Lorem ipsum dolor   
sit amet,           
consectetur         
adipiscing elit     `)
  })
})
