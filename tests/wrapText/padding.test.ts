import { wrapText } from '../../src'
import { SHORT_LOREM_IPSUM } from '../__fixtures__/texts'

describe(wrapText, (): void => {
  it('adds padding space around the wrapped text', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        padding: 10,
        width: 20
      })
    ).toEqual(`                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
          Lorem ipsum dolor             
          sit amet,                     
          consectetur                   
          adipiscing elit.              
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        `)

    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        align: 'center',
        fillBlock: true,
        padding: 10,
        width: 20
      })
    ).toEqual(`                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
           Lorem ipsum dolor            
               sit amet,                
              consectetur               
            adipiscing elit.            
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        `)

    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        align: 'right',
        fillBlock: true,
        padding: 10,
        width: 20
      })
    ).toEqual(`                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
             Lorem ipsum dolor          
                     sit amet,          
                   consectetur          
              adipiscing elit.          
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        `)
  })

  it('adds padding space around the wrapped text with different padding values', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        padding: [10, 5, 2, 3],
        width: 20
      })
    ).toEqual(`                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
   Lorem ipsum dolor        
   sit amet,                
   consectetur              
   adipiscing elit.         
                            
                            `)
  })

  it('corrects erratic padding values to 0', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        padding: -10,
        width: 20
      })
    ).toEqual(`Lorem ipsum dolor
sit amet,
consectetur
adipiscing elit.`)

    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        padding: [-10, 5, 2, 3],
        width: 20
      })
    ).toEqual(`   Lorem ipsum dolor        
   sit amet,                
   consectetur              
   adipiscing elit.         
                            
                            `)

    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        padding: [10, 5] as any,
        width: 20
      })
    ).toEqual(`                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
Lorem ipsum dolor        
sit amet,                
consectetur              
adipiscing elit.         `)
  })

  it('works with truncated heights', async (): Promise<void> => {
    expect(
      wrapText(SHORT_LOREM_IPSUM, {
        padding: 10,
        width: 20,
        height: 2
      })
    ).toEqual(`                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
          Lorem ipsum dolor             
          sit amet, ...                 
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        `)
  })
})
