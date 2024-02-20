import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('respects multiple spaces between words', async (): Promise<void> => {
    const largeText = '  Hello    World!'

    const wrappedText = wrapText(largeText, { width: 10 })

    expect(wrappedText).toEqual(`  Hello   
World!`)

    const wrappedText2 = wrapText(largeText, { width: -10 })

    expect(wrappedText2).toEqual(`

H
e
l
l
o



W
o
r
l
d
!`)
  })

  it('works with truncated heights', async (): Promise<void> => {
    const largeText = '  Hello    World!'

    const wrappedText = wrapText(largeText, { width: 10, height: 1 })

    expect(wrappedText).toEqual(`  Hello...`)

    const wrappedText2 = wrapText(largeText, { width: -10, height: 4 })

    expect(wrappedText2).toEqual(`

H
e`)

    const wrappedText3 = wrapText(largeText, { fillBlock: true, width: 1, height: 9 })

    expect(wrappedText3).toEqual(` 
 
H
e
l
l
o
 
 `)

    const wrappedText4 = wrapText(largeText, { fillBlock: true, width: 1, height: 1 })

    expect(wrappedText4).toEqual(` `)

    const wrappedText5 = wrapText(largeText, { fillBlock: true, width: 2, height: 4 })

    expect(wrappedText5).toEqual(`  
He
ll
o `)
  })
})
