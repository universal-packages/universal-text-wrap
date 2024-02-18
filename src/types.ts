export type HyphenateRule = 'always' | 'word' | 'never'
export type WrapAlignment = 'left' | 'center' | 'right' | 'justify'
export type Padding = number | SelectivePadding
export type SelectivePadding = [number, number, number, number]

export interface WrapTextOptions {
  align?: WrapAlignment
  fillBlock?: boolean
  hyphenate?: HyphenateRule
  padding?: Padding
  width?: number
}

export interface WrappedLine {
  leftFill: string
  rightFill: string
  text: string
}
