import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('hyphenates words that are too long on each line', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, 12, {
      hyphenate: 'always'
    })

    expect(wrappedText).toEqual(`Lorem ipsum
dolor sit a-
met, consec-
tetur adipi-
scing elit`)

    const wrappedText2 = wrapText(largeText, 20, {
      hyphenate: 'always'
    })

    expect(wrappedText2).toEqual(`Lorem ipsum dolor
sit amet, consectet-
ur adipiscing elit`)
  })

  it('hyphenates words only if they are too long for the wrap width', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, 12, {
      hyphenate: 'word'
    })

    expect(wrappedText).toEqual(`Lorem ipsum
dolor sit
amet,
consectetur
adipiscing
elit`)

    const wrappedText2 = wrapText(largeText, 10, {
      hyphenate: 'word'
    })

    expect(wrappedText2).toEqual(`Lorem
ipsum
dolor sit
amet,
consectet-
ur
adipiscing
elit`)

    const wrappedText3 = wrapText('largewordomg', 3, {
      hyphenate: 'word'
    })

    expect(wrappedText3).toEqual(`la-
rg-
ew-
or-
do-
mg`)
  })

  it('does not hyphenate words if align is set to justify', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, 12, {
      hyphenate: 'always',
      align: 'justify'
    })

    expect(wrappedText).toEqual(`Lorem  ipsum
dolor    sit
amet,
consectetur
adipiscing
elit`)
  })

  it('does not hyphenate words if align is set to right', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, 12, {
      hyphenate: 'always',
      align: 'right'
    })

    expect(wrappedText).toEqual(` Lorem ipsum
   dolor sit
       amet,
 consectetur
  adipiscing
        elit`)
  })
})
