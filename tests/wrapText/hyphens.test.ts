import { wrapText } from '../../src'
import { SHORT_LOREM_IPSUM } from '../__fixtures__/texts'

describe(wrapText, (): void => {
  it('hyphenates words that are too long on each line', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        hyphenate: 'always',
        width: 12
      })
    ).toEqual(`Lorem ipsum
dolor sit a-
met, consec-
tetur adipi-
scing elit.`)

    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        hyphenate: 'always',
        width: 20
      })
    ).toEqual(`Lorem ipsum dolor
sit amet, consectet-
ur adipiscing elit.`)
  })

  it('hyphenates words only if they are too long for the wrap width', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        hyphenate: 'word',
        width: 12
      })
    ).toEqual(`Lorem ipsum
dolor sit
amet,
consectetur
adipiscing
elit.`)

    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        hyphenate: 'word',
        width: 10
      })
    ).toEqual(`Lorem
ipsum
dolor sit
amet,
consectet-
ur
adipiscing
elit.`)

    expect(
      wrapText('largewordomg', {
        hyphenate: 'word',
        width: 3
      })
    ).toEqual(`la-
rg-
ew-
or-
do-
mg`)
  })

  it('does not hyphenate words if align is set to justify', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        align: 'justify',
        hyphenate: 'always',
        width: 12
      })
    ).toEqual(`Lorem  ipsum
dolor    sit
amet,
consectetur
adipiscing
elit.`)
  })

  it('does not hyphenate words if align is set to right', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        align: 'right',
        hyphenate: 'always',
        width: 12
      })
    ).toEqual(` Lorem ipsum
   dolor sit
       amet,
 consectetur
  adipiscing
       elit.`)
  })
})
