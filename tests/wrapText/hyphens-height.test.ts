import { wrapText } from '../../src'

describe(wrapText, (): void => {
  describe('when height truncation', (): void => {
    it('hyphenates words that are too long on each line', async (): Promise<void> => {
      const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

      const wrappedText = wrapText(largeText, { hyphenate: 'always', width: 12, height: 4 })

      expect(wrappedText).toEqual(`Lorem ipsum
dolor sit a-
met, consec-
tetur adi...`)

      const wrappedText2 = wrapText(largeText, { hyphenate: 'always', width: 20, height: 2 })

      expect(wrappedText2).toEqual(`Lorem ipsum dolor
sit amet, consect...`)

      const wrappedText4 = wrapText('short me short you', { hyphenate: 'always', width: 7, height: 1 })

      expect(wrappedText4).toEqual(`shor...`)
    })

    it('hyphenates words only if they are too long for the wrap width', async (): Promise<void> => {
      const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

      const wrappedText = wrapText(largeText, { hyphenate: 'word', width: 12, height: 4 })

      expect(wrappedText).toEqual(`Lorem ipsum
dolor sit
amet,
consectet...`)

      const wrappedText2 = wrapText(largeText, { hyphenate: 'word', width: 10, height: 6 })

      expect(wrappedText2).toEqual(`Lorem
ipsum
dolor sit
amet,
consectet-
ur ...`)

      const wrappedText3 = wrapText('largewordomg', { hyphenate: 'word', width: 3, height: 4 })

      expect(wrappedText3).toEqual(`la-
rg-
ew-
or-`)
    })
  })
})
