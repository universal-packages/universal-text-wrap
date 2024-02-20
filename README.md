# Text Wrap

[![npm version](https://badge.fury.io/js/@universal-packages%2Ftext-wrap.svg)](https://www.npmjs.com/package/@universal-packages/text-wrap)
[![Testing](https://github.com/universal-packages/universal-text-wrap/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-text-wrap/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-text-wrap/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-text-wrap)

## Install

```shell
npm install @universal-packages/text-wrap
```

## Global methods

#### **`wrap(text: string, [options: Object])`**

Wraps a string to a given width.

```js
import { wrapText } from '@universal-packages/text-wrap'

const wrappedText = wrapText('This is some super long text', { width: 10 })

console.log(wrappedText)
// > This is
// > some super
// > long text
```

##### Options

- **`align`** `'left' | 'right' | 'center' | 'justify'` `default: 'left'`
  Aligns the text within the width.

  ```js
  const wrappedTextCenter = wrapText('This is some super long text', { align: 'center', width: 9 })

  console.log(wrappedTextCenter)
  // >  This is
  // >   some
  // >   super
  // > long text

  const wrappedTextRight = wrapText('This is some super long text', { align: 'right', width: 10 })

  console.log(wrappedTextRight)
  // >    This is
  // > some super
  // >  long text

  const wrappedTextJustify = wrapText('This is some super long text', { align: 'justify', width: 10 })

  console.log(wrappedTextJustify)
  // > This    is
  // > some super
  // > long  text
  ```

- **`fillBlock`** `boolean` `default: false`
  Fills the block with spaces to the width.

  ```js
  const wrappedTextFillBlock = wrapText('This is some super long text', { fillBlock: true, width: 10 })

  console.log(wrappedTextFillBlock)
  // > This is°°°
  // > some super
  // > long text°
  ```

- **`height`** `number`
  Truncates the text so that it fits the height. If not provided, the text will be wrapped only to the width. if the `hight` is greater to the number of lines, the text will be filled with spaces if `fillBlock` is `true`.

  ```js
  const wrappedTextFillBlock = wrapText('This is some super long text', { width: 10, height: 2 })

  console.log(wrappedTextFillBlock)
  // > This is
  // > some su...

  const wrappedTextFillBlock = wrapText('This is some super long text', { fillBlock: true, width: 10, height: 5 })

  console.log(wrappedTextFillBlock)

  // > This is°°°
  // > some super
  // > long text°
  // > °°°°°°°°°°
  // > °°°°°°°°°°
  ```

- **`hyphenate`** `'always' | 'word' | 'never'` `default: 'never'`
  Breaks words to fit the width, and adds a hyphen to the end of the line. Use `always` to always hyphenate to fit the width on each line that needs it. Use `word` to only hyphenate words that are too long to fit the width. Use `never` or do not pass the option to disable hyphenation. The hyphenation follows just a few simple rules, like we don't break words smaller than 4 characters, and we only hyphenate text aligned to the left.

  ```js
  const wrappedTextHyphenate = wrapText('This is some super long text', { hyphenate: 'always', width: 10 })

  console.log(wrappedTextHyphenate)
  // > This is s-
  // > ome super
  // > long text

  const wrappedTextHyphenateWord = wrapText('This is some large text and a very ultramegalarge word', { hyphenate: 'word', width: 10 })

  console.log(wrappedTextHyphenateWord)

  // > This is
  // > some large
  // > text and a
  // > very ultr-
  // > amegalarg-
  // > e word
  ```

- **`margin`** `number | [number. number, number. number]` `default: 0`
  Adds margin to the wrapped lines. You can pass a single number to add the same padding to all sides, or an array with 4 numbers to add padding to each side in the following order: top, right, bottom, left.

  > The margin adds to the final width of the block, for example, if you have a width of 10 and a margin of 2, the text will be wrapped to 10 characters but each line will have a length of 14 characters.

  ```js
  const wrappedTextPadding = wrapText('This is some super long text', { padding: 2, width: 10 })

  console.log(wrappedTextOnFinishLine)
  // > °°°°°°°°°°°°°°
  // > °°°°°°°°°°°°°°
  // > °°This is°°°°°
  // > °°some super°°
  // > °°long text°°°
  // > °°°°°°°°°°°°°°
  // > °°°°°°°°°°°°°°
  ```

- **`padding`** `number | [number. number, number. number]` `default: 0`
  Adds padding to the wrapped lines. You can pass a single number to add the same padding to all sides, or an array with 4 numbers to add padding to each side in the following order: top, right, bottom, left.

  > The wrapped text will be wrapped considering the horizontal padding, for example, if you have a width of 10 and a padding of 2, the text will be wrapped to 6 characters.

  ```js
  const wrappedTextPadding = wrapText('This is some super long text', { padding: 2, width: 10 })

  console.log(wrappedTextOnFinishLine)
  // > °°°°°°°°°°°°°°
  // > °°°°°°°°°°°°°°
  // > °°This is°°°°°
  // > °°some super°°
  // > °°long text°°°
  // > °°°°°°°°°°°°°°
  // > °°°°°°°°°°°°°°
  ```

- **`verticalAlign`** `'top' | 'middle' | 'bottom'` `default: 'top'`
  When the height is provided, aligns the text vertically within the height only if `fillBlock` is `true`.

  ```js
  const wrappedMiddleText = wrapText('This is some super long text', { fillBlock: true, width: 10, height: 7, verticalAlign: 'middle' })

  console.log(wrappedMiddleText)

  // > °°°°°°°°°°
  // > °°°°°°°°°°
  // > This is°°°
  // > some super
  // > long text°
  // > °°°°°°°°°°
  // > °°°°°°°°°°
  ```

- **`width`** `number`
  The width of the block to wrap the text. If not provided align, fillBlock, and padding will be applied as if width was provided as the largest line in the input text.

  ```js
  const wrappedTextWidth = wrapText('This is some super long text', { padding: 1 })

  console.log(wrappedTextWidth)
  // > °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  // > °This is some super long text°
  // > °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  ```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
