import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('truncates the last line to ensure height', async (): Promise<void> => {
    const largeText = 'Let me tell you something, LET ME TELL YOU SOMETHING!!!'

    const wrappedText = wrapText(largeText, { width: 10, height: 7 })

    expect(wrappedText).toEqual(`Let me
tell you
something,
LET ME
TELL YOU
SOMETHING!
!!`)

    const wrappedText2 = wrapText(largeText, { width: 10, height: 5 })

    expect(wrappedText2).toEqual(`Let me
tell you
something,
LET ME
TELL YO...`)

    const wrappedText3 = wrapText(largeText, { width: 10, height: 4 })

    expect(wrappedText3).toEqual(`Let me
tell you
something,
LET ME ...`)

    const wrappedText4 = wrapText(largeText, { width: 10, height: 3 })

    expect(wrappedText4).toEqual(`Let me
tell you
somethi...`)

    const wrappedText5 = wrapText(largeText, { width: 10, height: 2 })

    expect(wrappedText5).toEqual(`Let me
tell yo...`)

    const wrappedText6 = wrapText(largeText, { width: 10, height: 1 })

    expect(wrappedText6).toEqual(`Let me ...`)

    const wrappedText7 = wrapText(largeText, { width: 9, height: 1 })

    expect(wrappedText7).toEqual(`Let me...`)

    const wrappedText8 = wrapText(largeText, { width: 9, height: -20 })

    expect(wrappedText8).toEqual(`Let me...`)

    const wrappedText9 = wrapText(largeText, { width: 9, height: 0 })

    expect(wrappedText9).toEqual(`Let me...`)
  })
})
