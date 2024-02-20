import { wrapText } from '../../src'
import { SHORT_LOREM_IPSUM } from '../__fixtures__/texts'

describe(wrapText, (): void => {
  describe('when height truncation', (): void => {
    it('hyphenates words that are too long on each line', async (): Promise<void> => {
      expect(
        wrapText(SHORT_LOREM_IPSUM, {
          hyphenate: 'always',
          width: 12,
          height: 4
        })
      ).toEqual(`Lorem ipsum
dolor sit a-
met, consec-
tetur adi...`)

      expect(
        wrapText(SHORT_LOREM_IPSUM, {
          hyphenate: 'always',
          width: 20,
          height: 2
        })
      ).toEqual(`Lorem ipsum dolor
sit amet, consect...`)

      expect(
        wrapText('short me short you', {
          hyphenate: 'always',
          width: 7,
          height: 1
        })
      ).toEqual(`shor...`)
    })

    it('hyphenates words only if they are too long for the wrap width', async (): Promise<void> => {
      expect(
        wrapText(SHORT_LOREM_IPSUM, {
          hyphenate: 'word',
          width: 12,
          height: 4
        })
      ).toEqual(`Lorem ipsum
dolor sit
amet,
consectet...`)

      expect(
        wrapText(SHORT_LOREM_IPSUM, {
          hyphenate: 'word',
          width: 10,
          height: 6
        })
      ).toEqual(`Lorem
ipsum
dolor sit
amet,
consectet-
ur ...`)

      expect(
        wrapText('largewordomg', {
          hyphenate: 'word',
          width: 3,
          height: 4
        })
      ).toEqual(`la-
rg-
ew-
or-`)
    })
  })
})
