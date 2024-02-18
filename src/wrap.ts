import stripAnsi from 'strip-ansi'

import { HyphenateRule, Padding, SelectivePadding, WrapTextOptions, WrappedLine } from './types'

const WORTHY_WORD_SIZE_FOR_WORD_BREAK = 3
const WORTHY_REMAINING_SPACE_FOR_WORD_BREAK = ' -'.length

export function wrap(text: string, width: number, options?: WrapTextOptions): WrappedLine[] {
  const finalText = stripAnsi(text)
  const finalWidth = Math.max(1, width)
  const finalOptions: WrapTextOptions = { ...options }
  const padding = normalizePadding(finalOptions.padding || 0)
  const lines: string[] = []
  const words = finalText.split(' ')

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i]

    if (lines.length === 0) {
      if (currentWord.length > finalWidth) {
        applyWordBreak(currentWord, lines, finalWidth, finalOptions.hyphenate)
      } else {
        lines.push(currentWord)
      }
    } else {
      if (lines[lines.length - 1].length + currentWord.length + 1 > finalWidth) {
        if (!currentWord) {
          lines.push('')
        } else if (finalOptions.align && finalOptions.align !== 'left') {
          lines.push(currentWord)
        } else {
          applyWordBreak(currentWord, lines, finalWidth, finalOptions.hyphenate)
        }
      } else {
        if (!currentWord && lines[lines.length - 1].length === 0 && finalWidth === 1) {
          lines.push('')
          continue
        }

        lines[lines.length - 1] += ' ' + currentWord
      }
    }
  }

  const wrappedLines: WrappedLine[] = []

  for (let i = 0; i < padding[0]; i++) {
    wrappedLines.push({ leftFill: ' '.repeat(padding[3]), rightFill: ' '.repeat(padding[1]), text: ' '.repeat(finalWidth) })
  }

  for (let i = 0; i < lines.length; i++) {
    switch (finalOptions.align) {
      case 'justify':
        wrappedLines.push({
          leftFill: ' '.repeat(padding[3]),
          rightFill: ' '.repeat(padding[1]),
          text: justifyText(lines[i], finalWidth)
        })
        break
      case 'right':
        const alignRightPadding = finalWidth - lines[i].length

        wrappedLines.push({
          leftFill: ' '.repeat(padding[3] + alignRightPadding),
          rightFill: ' '.repeat(padding[1]),
          text: lines[i]
        })
        break
      case 'center':
        const centerLeftPadding = Math.floor((finalWidth - lines[i].length) / 2)
        const centerRightPadding = padding[1] || finalOptions.fillBlock ? finalWidth - lines[i].length - centerLeftPadding : 0

        wrappedLines.push({
          leftFill: ' '.repeat(padding[3] + centerLeftPadding),
          rightFill: ' '.repeat(padding[1] + centerRightPadding),
          text: lines[i]
        })
        break
      default:
        const fillBlockPadding = padding[1] || finalOptions.fillBlock ? finalWidth - lines[i].length : 0

        wrappedLines.push({
          leftFill: ' '.repeat(padding[3]),
          rightFill: ' '.repeat(padding[1] + fillBlockPadding),
          text: lines[i]
        })
        break
    }
  }

  for (let i = 0; i < padding[2]; i++) {
    wrappedLines.push({ leftFill: ' '.repeat(padding[3]), rightFill: ' '.repeat(padding[1]), text: ' '.repeat(finalWidth) })
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
