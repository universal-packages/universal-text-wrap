import stripAnsi from 'strip-ansi'

import { HyphenateRule, WrapTextOptions, WrappedLine } from './types'
import { getLongestLineLength, justifyText, normalizeNumericSides, splitWord } from './utils'

const WORTHY_WORD_SIZE_FOR_WORD_BREAK = 3
const WORTHY_REMAINING_SPACE_FOR_WORD_BREAK = ' -'.length
const WORTHY_WIDTH_SIZE_FOR_ELLIPSES = 7
const ELLIPSES = '...'

export function wrap(text: string, options?: WrapTextOptions): WrappedLine[] {
  const padding = normalizeNumericSides(options?.padding || 0)
  const height = options?.height === undefined ? undefined : Math.max(options.height - padding[0] - padding[2], 1)
  const strippedText = stripAnsi(text)
  const textLines = strippedText.split('\n')

  // Optimization for when input comes in multiple lines and we need the longest one to calculate the width
  if (height && !options?.width && textLines.length > height) textLines.splice(height)

  const longestLineSize = getLongestLineLength(textLines)
  const desiredWidth = Math.max(options?.width || longestLineSize + padding[1] + padding[3], 1)
  const finalWidth = Math.max(desiredWidth - padding[1] - padding[3], 1)
  const finalOptions: WrapTextOptions = {
    align: 'left',
    hyphenate: 'never',
    fillBlock: false,
    verticalAlign: 'top',
    ...options,
    height,
    margin: normalizeNumericSides(options?.margin || 0),
    padding,
    width: finalWidth
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

  for (let i = 0; i < finalOptions.margin[0]; i++) {
    const leftTextAreaMargin = Math.floor(finalWidth / 2)
    const rightTextAreaMargin = finalWidth - leftTextAreaMargin

    wrappedLines.push({
      leftFill: 0,
      leftMargin: finalOptions.margin[3] + finalOptions.padding[3] + leftTextAreaMargin,
      leftPadding: 0,
      rightFill: 0,
      rightMargin: finalOptions.margin[1] + finalOptions.padding[1] + rightTextAreaMargin,
      rightPadding: 0,
      text: ''
    })
  }

  for (let i = 0; i < finalOptions.padding[0]; i++) {
    const leftTextAreaPadding = Math.floor(finalWidth / 2)
    const rightTextAreaPadding = finalWidth - leftTextAreaPadding

    wrappedLines.push({
      leftFill: 0,
      leftMargin: finalOptions.margin[3],
      leftPadding: finalOptions.padding[3] + leftTextAreaPadding,
      rightFill: 0,
      rightMargin: finalOptions.margin[1],
      rightPadding: finalOptions.padding[1] + rightTextAreaPadding,
      text: ''
    })
  }

  if (height && wrappedLines.length + finalOptions.padding[0] + finalOptions.padding[2] < finalOptions.height && finalOptions.fillBlock) {
    const remainingLines = height - wrappedTextLines.length - finalOptions.padding[0] - finalOptions.padding[2]

    if (finalOptions.verticalAlign === 'middle') {
      const halfRemainingLines = Math.floor(remainingLines / 2)

      for (let i = 0; i < halfRemainingLines; i++) wrappedLines.push(generateWrappedLine('', finalOptions))
    } else if (finalOptions.verticalAlign === 'bottom') {
      for (let i = 0; i < remainingLines; i++) wrappedLines.push(generateWrappedLine('', finalOptions))
    }
  }

  for (let i = 0; i < wrappedTextLines.length; i++) {
    wrappedLines.push(generateWrappedLine(wrappedTextLines[i], finalOptions))
  }

  if (height && wrappedLines.length + finalOptions.padding[0] + finalOptions.padding[2] < finalOptions.height && finalOptions.fillBlock) {
    const remainingLines = height - wrappedTextLines.length - finalOptions.padding[0] - finalOptions.padding[2]

    if (finalOptions.verticalAlign === 'middle') {
      const halfRemainingLines = Math.ceil(remainingLines / 2)

      for (let i = 0; i < halfRemainingLines; i++) wrappedLines.push(generateWrappedLine('', finalOptions))
    } else if (finalOptions.verticalAlign === 'top') {
      for (let i = 0; i < remainingLines; i++) wrappedLines.push(generateWrappedLine('', finalOptions))
    }
  }

  for (let i = 0; i < finalOptions.padding[2]; i++) {
    const leftTextAreaPadding = Math.floor(finalWidth / 2)
    const rightTextAreaPadding = finalWidth - leftTextAreaPadding

    wrappedLines.push({
      leftFill: 0,
      leftMargin: finalOptions.margin[3],
      leftPadding: finalOptions.padding[3] + leftTextAreaPadding,
      rightFill: 0,
      rightMargin: finalOptions.margin[1],
      rightPadding: finalOptions.padding[1] + rightTextAreaPadding,
      text: ''
    })
  }

  for (let i = 0; i < finalOptions.margin[2]; i++) {
    const leftTextAreaMargin = Math.floor(finalWidth / 2)
    const rightTextAreaMargin = finalWidth - leftTextAreaMargin

    wrappedLines.push({
      leftFill: 0,
      leftMargin: finalOptions.margin[3] + finalOptions.padding[3] + leftTextAreaMargin,
      leftPadding: 0,
      rightFill: 0,
      rightMargin: finalOptions.margin[1] + finalOptions.padding[1] + rightTextAreaMargin,
      rightPadding: 0,
      text: ''
    })
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
  const { align, fillBlock, margin, padding, width } = options

  switch (align) {
    case 'justify':
      return {
        leftFill: 0,
        leftMargin: margin[3],
        leftPadding: padding[3],
        rightFill: 0,
        rightMargin: margin[1],
        rightPadding: padding[1],
        text: justifyText(text, width)
      }
    case 'right':
      const alignRightPadding = width - text.length

      return {
        leftFill: alignRightPadding,
        leftMargin: margin[3],
        leftPadding: padding[3],
        rightFill: 0,
        rightMargin: margin[1],
        rightPadding: padding[1],
        text: text
      }

    case 'center':
      const centerLeftPadding = Math.floor((width - text.length) / 2)
      const centerRightPadding = padding[1] || margin[1] || fillBlock ? width - text.length - centerLeftPadding : 0

      return {
        leftFill: centerLeftPadding,
        leftMargin: margin[3],
        leftPadding: padding[3],
        rightFill: centerRightPadding,
        rightMargin: margin[1],
        rightPadding: padding[1],
        text: text
      }

    default:
      const fillBlockPadding = padding[1] || margin[1] || fillBlock ? width - text.length : 0

      return {
        leftFill: 0,
        leftMargin: margin[3],
        leftPadding: padding[3],
        rightFill: fillBlockPadding,
        rightMargin: margin[1],
        rightPadding: padding[1],
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
