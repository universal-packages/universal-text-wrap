import stripAnsi from 'strip-ansi'

import { HyphenateRule, Padding, SelectivePadding, WrapTextOptions, WrappedLine } from './types'

const WORTHY_WORD_SIZE_FOR_WORD_BREAK = 3
const WORTHY_REMAINING_SPACE_FOR_WORD_BREAK = ' -'.length
const WORTHY_WIDTH_SIZE_FOR_ELLIPSES = 7
const ELLIPSES = '...'

export function wrap(text: string, options?: WrapTextOptions): WrappedLine[] {
  const height = options?.height === undefined ? undefined : Math.max(options?.height, 1)
  const strippedText = stripAnsi(text)
  const textLines = strippedText.split('\n')

  if (height && !options?.width && textLines.length > height) textLines.splice(height)

  const longestLineSize = getLongestLineLength(textLines)
  const finalOptions: WrapTextOptions = {
    align: 'left',
    hyphenate: 'never',
    fillBlock: false,
    ...options,
    height,
    padding: normalizePadding(options?.padding || 0),
    width: Math.max(options?.width || longestLineSize, 1)
  }

  const wrappedTextLines: string[] = []
  for (let i = 0; i < textLines.length; i++) {
    wrapLine(wrappedTextLines, textLines[i], finalOptions)

    if (height && wrappedTextLines.length === height) {
      if (textLines[i] === '') wrappedTextLines[height - 1] = ELLIPSES

      break
    }
  }

  const wrappedLines: WrappedLine[] = []

  for (let i = 0; i < finalOptions.padding[0]; i++) {
    wrappedLines.push({ padding: ' '.repeat(finalOptions.width + finalOptions.padding[3] + finalOptions.padding[1]) })
  }

  for (let i = 0; i < wrappedTextLines.length; i++) {
    wrappedLines.push(generateWrappedLine(wrappedTextLines[i], finalOptions))
  }

  for (let i = 0; i < finalOptions.padding[2]; i++) {
    wrappedLines.push({ padding: ' '.repeat(finalOptions.width + finalOptions.padding[3] + finalOptions.padding[1]) })
  }

  return wrappedLines
}

function wrapLine(lines: string[], text: string, options: WrapTextOptions): void {
  const { align, height, hyphenate, width } = options
  const words = text.split(' ')

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i]

    if (i === 0) {
      if (currentWord.length > width) {
        if (shouldStopAddingLinesWithWordBreak(currentWord, lines, width, height, hyphenate)) break
      } else {
        if (shouldStopAddingLineWithWord(currentWord, lines, width, height)) break
      }
    } else if (lines[lines.length - 1].length + currentWord.length + 1 > width) {
      if (!currentWord) {
        if (shouldStopAddingLineWithWord('', lines, width, height)) break
      } else if (align && align !== 'left') {
        if (shouldStopAddingLineWithWord(currentWord, lines, width, height)) break
      } else {
        if (shouldStopAddingLinesWithWordBreak(currentWord, lines, width, height, hyphenate)) break
      }
    } else {
      if (!currentWord && lines[lines.length - 1].length === 0 && width === 1) {
        if (shouldStopAddingLineWithWord(currentWord, lines, width, height)) break
        continue
      }

      lines[lines.length - 1] += ' ' + currentWord
    }
  }
}

function generateWrappedLine(text: string, options: WrapTextOptions): WrappedLine {
  const { align, fillBlock, padding, width } = options

  switch (align) {
    case 'justify':
      return {
        alignment: align,
        leftFill: '',
        leftPadding: ' '.repeat(padding[3]),
        rightFill: '',
        rightPadding: ' '.repeat(padding[1]),
        text: justifyText(text, width)
      }
    case 'right':
      const alignRightPadding = width - text.length

      return {
        alignment: align,
        leftFill: ' '.repeat(alignRightPadding),
        leftPadding: ' '.repeat(padding[3]),
        rightFill: '',
        rightPadding: ' '.repeat(padding[1]),
        text: text
      }

    case 'center':
      const centerLeftPadding = Math.floor((width - text.length) / 2)
      const centerRightPadding = padding[1] || fillBlock ? width - text.length - centerLeftPadding : 0

      return {
        alignment: align,
        leftFill: ' '.repeat(centerLeftPadding),
        leftPadding: ' '.repeat(padding[3]),
        rightFill: ' '.repeat(centerRightPadding),
        rightPadding: ' '.repeat(padding[1]),
        text: text
      }

    default:
      const fillBlockPadding = padding[1] || fillBlock ? width - text.length : 0

      return {
        alignment: align,
        leftFill: '',
        leftPadding: ' '.repeat(padding[3]),
        rightFill: ' '.repeat(fillBlockPadding),
        rightPadding: ' '.repeat(padding[1]),
        text: text
      }
  }
}

function shouldStopAddingLinesWithWordBreak(word: string, lines: string[], width: number, height?: number, hyphenate?: HyphenateRule): boolean {
  if (hyphenate === 'always') {
    const remainingLastLineSpace = width - lines[lines.length - 1].length

    if ((remainingLastLineSpace > WORTHY_REMAINING_SPACE_FOR_WORD_BREAK && word.length > WORTHY_WORD_SIZE_FOR_WORD_BREAK) || word.length > width) {
      const wordPart = word.substring(0, remainingLastLineSpace - 2)
      const hyphenatedWord = wordPart + '-'

      lines[lines.length - 1] += ' ' + hyphenatedWord

      const restOfWord = word.substring(wordPart.length)
      const restOfWordParts = splitWord(restOfWord, width, true)

      for (let i = 0; i < restOfWordParts.length; i++) {
        if (shouldStopAddingLineWithWord(restOfWordParts[i], lines, width, height)) return true
      }
    } else {
      if (shouldStopAddingLineWithWord(word, lines, width, height)) return true
    }
  } else if (hyphenate === 'word') {
    if (word.length > width) {
      const wordParts = splitWord(word, width, true)

      for (let i = 0; i < wordParts.length; i++) {
        if (shouldStopAddingLineWithWord(wordParts[i], lines, width, height)) return true
      }
    } else {
      return shouldStopAddingLineWithWord(word, lines, width, height)
    }
  } else {
    if (word.length > width) {
      const wordParts = splitWord(word, width, false)

      for (let i = 0; i < wordParts.length; i++) {
        if (shouldStopAddingLineWithWord(wordParts[i], lines, width, height)) return true
      }
    } else {
      return shouldStopAddingLineWithWord(word, lines, width, height)
    }
  }
}

function shouldStopAddingLineWithWord(word: string, lines: string[], width: number, height?: number): boolean {
  if (height) {
    if (lines.length === height) {
      if (width >= WORTHY_WIDTH_SIZE_FOR_ELLIPSES) {
        const remainingSpace = width - lines[lines.length - 1].length

        if (remainingSpace > 3) {
          lines[lines.length - 1] += ' ' + ELLIPSES
        } else if (remainingSpace === 3) {
          lines[lines.length - 1] += ELLIPSES
        } else {
          lines[lines.length - 1] = lines[lines.length - 1].substring(0, width - 3) + ELLIPSES
        }
      }

      return true
    }
  }

  lines.push(word)

  if (height && lines.length === height && width === 1 && !word) return true
  return false
}

function normalizePadding(padding: Padding): SelectivePadding {
  if (typeof padding === 'number') {
    const normalizedPadding = Math.max(padding, 0)

    return [normalizedPadding, normalizedPadding, normalizedPadding, normalizedPadding]
  } else {
    return [Math.max(padding[0] || 0, 0), Math.max(padding[1] || 0, 0), Math.max(padding[2] || 0, 0), Math.max(padding[3] || 0, 0)]
  }
}

function justifyText(line: string, width: number): string {
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

function splitWord(word: string, maxWidth: number, hyphenate: boolean): string[] {
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

function getLongestLineLength(lines: string[]): number {
  return lines.reduce((acc: number, line: string) => Math.max(acc, line.length), 0)
}
