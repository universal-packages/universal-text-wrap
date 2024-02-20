import { Padding, SelectivePadding } from './types'

export function normalizePadding(padding: Padding): SelectivePadding {
  if (typeof padding === 'number') {
    const normalizedPadding = Math.max(padding, 0)

    return [normalizedPadding, normalizedPadding, normalizedPadding, normalizedPadding]
  } else {
    return [Math.max(padding[0] || 0, 0), Math.max(padding[1] || 0, 0), Math.max(padding[2] || 0, 0), Math.max(padding[3] || 0, 0)]
  }
}

export function justifyText(line: string, width: number): string {
  const lineWords = line.split(' ')
  const lineWordsCount = lineWords.length
  const lineWordsLength = lineWords.reduce((acc: number, word: string) => acc + word.length, 0)
  const remainingSpace = width - lineWordsLength
  const spaceCount = lineWordsCount - 1
  const spacePerWord = spaceCount > 0 ? Math.floor(remainingSpace / spaceCount) : 0
  const remainingSpaceAfterDistribution = remainingSpace - spacePerWord * spaceCount

  const justifiedLine = lineWords.reduce((acc: string, word: string, index: number) => {
    acc += word
    if (index < lineWordsCount - 1) {
      acc += ' '.repeat(spacePerWord)
      if (index < remainingSpaceAfterDistribution) {
        acc += ' '
      }
    }
    return acc
  }, '')

  return justifiedLine
}

export function splitWord(word: string, maxWidth: number, hyphenate: boolean): string[] {
  const parts = []
  const partLength = maxWidth - (hyphenate ? 1 : 0)

  for (let i = 0; i < word.length; i += partLength) {
    const end = i + partLength
    let part = word.substring(i, end)

    if (end < word.length && hyphenate) part += '-'

    parts.push(part)
  }
  return parts
}

export function getLongestLineLength(lines: string[]): number {
  return lines.reduce((acc: number, line: string) => Math.max(acc, line.length), 0)
}
