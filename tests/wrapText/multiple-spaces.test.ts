import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('respects multiple spaces between words', async (): Promise<void> => {
    expect(
      wrapText('  Hello    World!', {
        width: 10
      })
    ).toEqual(`  Hello   
World!`)

    expect(
      wrapText('  Hello    World!', {
        width: -10
      })
    ).toEqual(`

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
    expect(
      wrapText('  Hello    World!', {
        width: 10,
        height: 1
      })
    ).toEqual(`  Hello...`)

    expect(
      wrapText('  Hello    World!', {
        width: -10,
        height: 4
      })
    ).toEqual(`

H
e`)

    expect(
      wrapText('  Hello    World!', {
        fillBlock: true,
        width: 1,
        height: 9
      })
    ).toEqual(` 
 
H
e
l
l
o
 
 `)

    expect(
      wrapText('  Hello    World!', {
        fillBlock: true,
        width: 1,
        height: 1
      })
    ).toEqual(` `)

    expect(
      wrapText('  Hello    World!', {
        fillBlock: true,
        width: 2,
        height: 4
      })
    ).toEqual(`  
He
ll
o `)
  })
})
