import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('handles strings with line breaks', async (): Promise<void> => {
    const largeText = 'This is some text.\nThis is other text in the second line\n\nAnd this is the final line'

    const wrappedText = wrapText(largeText, { width: 10 })

    expect(wrappedText).toEqual(`This is
some text.
This is
other text
in the
second
line

And this
is the
final line`)

    const wrappedText2 = wrapText(largeText, { width: 10, fillBlock: true })

    expect(wrappedText2).toEqual(`This is   
some text.
This is   
other text
in the    
second    
line      
          
And this  
is the    
final line`)

    const wrappedText3 = wrapText(largeText, { fillBlock: true })

    expect(wrappedText3).toEqual(`This is some text.                   
This is other text in the second line
                                     
And this is the final line           `)
  })

  it('works with truncated heights', async (): Promise<void> => {
    const largeText = 'This is some text.\nThis is other text in the second line\n\nAnd this is the final line'

    const wrappedText = wrapText(largeText, { width: 10, height: 8 })

    expect(wrappedText).toEqual(`This is
some text.
This is
other text
in the
second
line
...`)

    const wrappedText2 = wrapText(largeText, { width: 10, fillBlock: true, height: 9 })

    expect(wrappedText2).toEqual(`This is   
some text.
This is   
other text
in the    
second    
line      
          
And thi...`)

    const wrappedText3 = wrapText(largeText, { fillBlock: true, height: 3 })

    expect(wrappedText3).toEqual(`This is some text.                   
This is other text in the second line
...                                  `)
  })
})
