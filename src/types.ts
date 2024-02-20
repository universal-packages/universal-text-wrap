export type HyphenateRule = 'always' | 'word' | 'never'
export type WrapAlignment = 'left' | 'center' | 'right' | 'justify'
export type Padding = number | SelectivePadding
export type SelectivePadding = [number, number, number, number]
export type WrappedLine = WrappedLineDescriptor | VerticalPaddingLine
export interface WrapTextOptions {
  align?: WrapAlignment
  fillBlock?: boolean
  height?: number
  hyphenate?: HyphenateRule
  padding?: Padding
  width?: number
}

export interface WrappedLineDescriptor {
  alignment: WrapAlignment
  leftFill: string
  leftPadding: string
  rightFill: string
  rightPadding: string
  text: string
}

export interface VerticalPaddingLine {
  padding: string
}
