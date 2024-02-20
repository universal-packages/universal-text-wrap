import { VerticalPaddingLine, WrapTextOptions, WrappedLineDescriptor } from './types'
import { wrap } from './wrap'

export function wrapText(text: string, options?: WrapTextOptions): string {
  return wrap(text, options)
    .map((line) => {
      const verticalPaddingLine = line as VerticalPaddingLine
      const wrappedLineDescriptor = line as WrappedLineDescriptor

      if (verticalPaddingLine.padding) {
        return verticalPaddingLine.padding
      } else {
        return (
          wrappedLineDescriptor.leftPadding + wrappedLineDescriptor.leftFill + wrappedLineDescriptor.text + wrappedLineDescriptor.rightFill + wrappedLineDescriptor.rightPadding
        )
      }
    })
    .join('\n')
}
