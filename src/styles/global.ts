import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  'body, input, textarea, button': {
    fontFamily: '$default',
  },

  'input, button, textarea': {
    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray500',
    },
  },

  body: {
    backgroundColor: '$gray800',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },
})
