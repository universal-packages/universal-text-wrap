import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('wraps text centering it', async (): Promise<void> => {
    const largeText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

    const wrappedText = wrapText(largeText, { align: 'center', width: 40 })

    expect(wrappedText).toEqual(`Lorem ipsum dolor sit amet, consectetur
 adipiscing elit. Sed do eiusmod tempor
  incididunt ut labore et dolore magna
 aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`)

    const wrappedText2 = wrapText(largeText, { align: 'center', fillBlock: true, width: 40 })

    expect(wrappedText2).toEqual(`Lorem ipsum dolor sit amet, consectetur 
 adipiscing elit. Sed do eiusmod tempor 
  incididunt ut labore et dolore magna  
 aliqua. Ut enim ad minim veniam, quis  
  nostrud exercitation ullamco laboris  
nisi ut aliquip ex ea commodo consequat.`)
  })

  it('works with truncated heights', async (): Promise<void> => {
    const largeText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

    const wrappedText = wrapText(largeText, { align: 'center', width: 40, height: 5 })

    expect(wrappedText).toEqual(`Lorem ipsum dolor sit amet, consectetur
 adipiscing elit. Sed do eiusmod tempor
  incididunt ut labore et dolore magna
 aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris ...`)

    const wrappedText2 = wrapText(largeText, { align: 'center', fillBlock: true, width: 40, height: 5 })

    expect(wrappedText2).toEqual(`Lorem ipsum dolor sit amet, consectetur 
 adipiscing elit. Sed do eiusmod tempor 
  incididunt ut labore et dolore magna  
 aliqua. Ut enim ad minim veniam, quis  
nostrud exercitation ullamco laboris ...`)
  })
})
