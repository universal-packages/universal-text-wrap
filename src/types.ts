export type HyphenateRule = 'always' | 'word' | 'never'
export type Margin = number | NumericSides
export type Padding = number | NumericSides
export type NumericSides = [number, number, number, number]
export type TextAlign = 'left' | 'center' | 'right' | 'justify'
export type VerticalAlign = 'top' | 'middle' | 'bottom'

export interface WrapTextOptions {
  align?: TextAlign
  fillBlock?: boolean
  height?: number
  hyphenate?: HyphenateRule
  margin?: Margin
  padding?: Padding
  verticalAlign?: VerticalAlign
  width?: number
}

export interface WrappedLine {
  leftFill: number
  leftMargin: number
  leftPadding: number
  rightFill: number
  rightMargin: number
  rightPadding: number
  text: string
}
