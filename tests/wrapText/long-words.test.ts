import { wrapText } from '../../src'

describe(wrapText, (): void => {
  it('can handle long words', async (): Promise<void> => {
    const dummyPath =
      'my-operating-system/long-file-path/that-goes-really-deep/into-the-file-system/and-contains-a-lot-of-directories/with-long-names/and-some-files/with-long-names.txt'

    expect(wrapText(dummyPath)).toEqual(dummyPath)
    expect(wrapText(dummyPath, { width: 50, height: 1 })).toEqual('my-operating-system/long-file-path/that-goes-re...')
  })
})
