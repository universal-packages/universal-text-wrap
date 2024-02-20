import { wrapText } from '../../src'
import { LOREM_IPSUM } from '../__fixtures__/texts'

describe(wrapText, (): void => {
  it('aligns text vertically top by default', async (): Promise<void> => {
    expect(
      wrapText(LOREM_IPSUM, {
        fillBlock: true,
        height: 10,
        width: 40
      })
    ).toEqual(`Lorem ipsum dolor sit amet, consectetur 
adipiscing elit. Sed do eiusmod tempor  
incididunt ut labore et dolore magna    
aliqua. Ut enim ad minim veniam, quis   
nostrud exercitation ullamco laboris    
nisi ut aliquip ex ea commodo consequat.
                                        
                                        
                                        
                                        `)

    expect(
      wrapText(LOREM_IPSUM, {
        fillBlock: true,
        height: 10,
        verticalAlign: 'top',
        width: 40
      })
    ).toEqual(`Lorem ipsum dolor sit amet, consectetur 
adipiscing elit. Sed do eiusmod tempor  
incididunt ut labore et dolore magna    
aliqua. Ut enim ad minim veniam, quis   
nostrud exercitation ullamco laboris    
nisi ut aliquip ex ea commodo consequat.
                                        
                                        
                                        
                                        `)
  })

  it('does not fill any vertical space if fillBlock is false', async (): Promise<void> => {
    expect(
      wrapText(LOREM_IPSUM, {
        fillBlock: false,
        height: 10,
        verticalAlign: 'top',
        width: 40
      })
    ).toEqual(`Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`)
  })
})
