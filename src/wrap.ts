import stripAnsi from 'strip-ansi'

import { HyphenateRule, Padding, SelectivePadding, WrapTextOptions, WrappedLine } from './types'

const WORTHY_WORD_SIZE_FOR_WORD_BREAK = 3
const WORTHY_REMAINING_SPACE_FOR_WORD_BREAK = ' -'.length

export function wrap(text: string, options?: WrapTextOptions): WrappedLine[] {
  const strippedText = stripAnsi(text)
  const textLines = strippedText.split('\n')
  const longestLineSize = getLongestLineLength(textLines)
  const finalOptions: WrapTextOptions = {
    align: 'left',
    hyphenate: 'never',
    fillBlock: false,
    ...options,
    padding: normalizePadding(options?.padding || 0),
    width: Math.max(options?.width || longestLineSize, 1)
  }

  return textLines.reduce((acc: WrappedLine[], line: string) => acc.concat(wrapOriginalLine(line, finalOptions)), [])
}

function wrapOriginalLine(text: string, options: WrapTextOptions): WrappedLine[] {
  const { align, fillBlock, hyphenate, padding, width } = options
  const lines: string[] = []
  const words = text.split(' ')

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i]

    if (lines.length === 0) {
      if (currentWord.length > width) {
        applyWordBreak(currentWord, lines, width, hyphenate)
      } else {
        lines.push(currentWord)
      }
    } else {
      if (lines[lines.length - 1].length + currentWord.length + 1 > width) {
        if (!currentWord) {
          lines.push('')
        } else if (align && align !== 'left') {
          lines.push(currentWord)
        } else {
          applyWordBreak(currentWord, lines, width, hyphenate)
        }
      } else {
        if (!currentWord && lines[lines.length - 1].length === 0 && width === 1) {
          lines.push('')
          continue
        }

        lines[lines.length - 1] += ' ' + currentWord
      }
    }
  }

  const wrappedLines: WrappedLine[] = []

  for (let i = 0; i < padding[0]; i++) {
    wrappedLines.push({ leftFill: ' '.repeat(padding[3]), rightFill: ' '.repeat(padding[1]), text: ' '.repeat(width) })
  }

  for (let i = 0; i < lines.length; i++) {
    switch (align) {
      case 'justify':
        wrappedLines.push({
          leftFill: ' '.repeat(padding[3]),
          rightFill: ' '.repeat(padding[1]),
          text: justifyText(lines[i], width)
        })
        break
      case 'right':
        const alignRightPadding = width - lines[i].length

        wrappedLines.push({
          leftFill: ' '.repeat(padding[3] + alignRightPadding),
          rightFill: ' '.repeat(padding[1]),
          text: lines[i]
        })
        break
      case 'center':
        const centerLeftPadding = Math.floor((width - lines[i].length) / 2)
        const centerRightPadding = padding[1] || fillBlock ? width - lines[i].length - centerLeftPadding : 0

        wrappedLines.push({
          leftFill: ' '.repeat(padding[3] + centerLeftPadding),
          rightFill: ' '.repeat(padding[1] + centerRightPadding),
          text: lines[i]
        })
        break
      default:
        const fillBlockPadding = padding[1] || fillBlock ? width - lines[i].length : 0

        wrappedLines.push({
          leftFill: ' '.repeat(padding[3]),
          rightFill: ' '.repeat(padding[1] + fillBlockPadding),
          text: lines[i]
        })
        break
    }
  }

  for (let i = 0; i < padding[2]; i++) {
    wrappedLines.push({ leftFill: ' '.repeat(padding[3]), rightFill: ' '.repeat(padding[1]), text: ' '.repeat(width) })
  }

  return wrappedLines
}

function applyWordBreak(word: string, lines: string[], width: number, hyphenate?: HyphenateRule): void {
  if (hyphenate === 'always') {
    const remainingLastLineSpace = width - lines[lines.length - 1].length

    if ((remainingLastLineSpace > WORTHY_REMAINING_SPACE_FOR_WORD_BREAK && word.length > WORTHY_WORD_SIZE_FOR_WORD_BREAK) || word.length > width) {
      const wordPart = word.substring(0, remainingLastLineSpace - 2)
      const hyphenatedWord = wordPart + '-'

      lines[lines.length - 1] += ' ' + hyphenatedWord

      const restOfWord = word.substring(wordPart.length)
      const restOfWordParts = splitWord(restOfWord, width)

      restOfWordParts.forEach((part) => lines.push(part))
    } else {
      lines.push(word)
    }
  } else if (hyphenate === 'word') {
    if (word.length > width) {
      const wordParts = splitWord(word, width)

      wordParts.forEach((part) => lines.push(part))
    } else {
      lines.push(word)
    }
  } else {
    lines.push(word)
  }
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

function splitWord(word: string, maxWidth: number): string[] {
  const parts = []
  const partLength = maxWidth - 1

  for (let i = 0; i < word.length; i += partLength) {
    const end = i + partLength
    let part = word.substring(i, end)

    if (end < word.length) part += '-'

    parts.push(part)
  }
  return parts
}

function getLongestLineLength(lines: string[]): number {
  return lines.reduce((acc: number, line: string) => Math.max(acc, line.length), 0)
}
