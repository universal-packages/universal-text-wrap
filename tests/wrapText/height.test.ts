import { wrapText } from '../../src'
import { LET_ME } from '../__fixtures__/texts'

describe(wrapText, (): void => {
  it('truncates the last line to ensure height', async (): Promise<void> => {
    expect(
      wrapText(LET_ME, {
        width: 10,
        height: 7
      })
    ).toEqual(`Let me
tell you
something,
LET ME
TELL YOU
SOMETHING!
!!`)

    expect(
      wrapText(LET_ME, {
        width: 10,
        height: 5
      })
    ).toEqual(`Let me
tell you
something,
LET ME
TELL YO...`)

    expect(
      wrapText(LET_ME, {
        width: 10,
        height: 4
      })
    ).toEqual(`Let me
tell you
something,
LET ME ...`)

    expect(
      wrapText(LET_ME, {
        width: 10,
        height: 3
      })
    ).toEqual(`Let me
tell you
somethi...`)

    expect(
      wrapText(LET_ME, {
        width: 10,
        height: 2
      })
    ).toEqual(`Let me
tell yo...`)

    expect(
      wrapText(LET_ME, {
        width: 10,
        height: 1
      })
    ).toEqual(`Let me ...`)

    expect(
      wrapText(LET_ME, {
        width: 9,
        height: 1
      })
    ).toEqual(`Let me...`)

    expect(
      wrapText(LET_ME, {
        width: 9,
        height: -20
      })
    ).toEqual(`Let me...`)

    expect(
      wrapText(LET_ME, {
        width: 9,
        height: 0
      })
    ).toEqual(`Let me...`)
  })
})
