import { NumericSides, VerticalPaddingLine, WrappedLine, WrappedLineDescriptor } from './types'

export function synthesizeWrappedLine(wrappedLine: WrappedLine): string {
  const wrappedLineDescriptor = wrappedLine as WrappedLineDescriptor
  const verticalPaddingLine = wrappedLine as VerticalPaddingLine

  if (verticalPaddingLine.padding) {
    return ' '.repeat(verticalPaddingLine.padding)
  } else {
    return (
      ' '.repeat(wrappedLineDescriptor.leftMargin) +
      ' '.repeat(wrappedLineDescriptor.leftPadding) +
      ' '.repeat(wrappedLineDescriptor.leftFill) +
      wrappedLineDescriptor.text +
      ' '.repeat(wrappedLineDescriptor.rightFill) +
      ' '.repeat(wrappedLineDescriptor.rightPadding) +
      ' '.repeat(wrappedLineDescriptor.rightMargin)
    )
  }
}

export function normalizeNumericSides(sides: number | NumericSides): NumericSides {
  if (typeof sides === 'number') {
    const normalizedPadding = Math.max(sides, 0)

    return [normalizedPadding, normalizedPadding, normalizedPadding, normalizedPadding]
  } else {
    return [Math.max(sides[0] || 0, 0), Math.max(sides[1] || 0, 0), Math.max(sides[2] || 0, 0), Math.max(sides[3] || 0, 0)]
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
