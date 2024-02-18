import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('adds padding space around the wrapped text', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, 20, {
      padding: 10
    })

    expect(wrappedText).toEqual(`                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
          Lorem ipsum dolor             
          sit amet,                     
          consectetur                   
          adipiscing elit               
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        `)

    const wrappedText2 = wrapText(largeText, 20, {
      align: 'center',
      padding: 10,
      fillBlock: true
    })

    expect(wrappedText2).toEqual(`                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
           Lorem ipsum dolor            
               sit amet,                
              consectetur               
            adipiscing elit             
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        `)

    const wrappedText3 = wrapText(largeText, 20, {
      align: 'right',
      padding: 10,
      fillBlock: true
    })

    expect(wrappedText3).toEqual(`                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
             Lorem ipsum dolor          
                     sit amet,          
                   consectetur          
               adipiscing elit          
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        `)
  })

  it('adds padding space around the wrapped text with different padding values', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, 20, {
      padding: [10, 5, 2, 3]
    })

    expect(wrappedText).toEqual(`                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
   Lorem ipsum dolor        
   sit amet,                
   consectetur              
   adipiscing elit          
                            
                            `)
  })

  it('corrects erratic padding values to 0', async (): Promise<void> => {
    const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

    const wrappedText = wrapText(largeText, 20, {
      padding: -10
    })

    expect(wrappedText).toEqual(`Lorem ipsum dolor
sit amet,
consectetur
adipiscing elit`)

    const wrappedText2 = wrapText(largeText, 20, {
      padding: [-10, 5, 2, 3]
    })

    expect(wrappedText2).toEqual(`   Lorem ipsum dolor        
   sit amet,                
   consectetur              
   adipiscing elit          
                            
                            `)

    const wrappedText3 = wrapText(largeText, 20, {
      padding: [10, 5] as any
    })

    expect(wrappedText3).toEqual(`                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
Lorem ipsum dolor        
sit amet,                
consectetur              
adipiscing elit          `)
  })
})
