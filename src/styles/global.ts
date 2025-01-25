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

  'input, button, textarea, a': {
    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray500',
    },
  },

  body: {
    backgroundColor: '$gray800',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  // SCROLLBAR
  /* width */
  '::-webkit-scrollbar': {
    width: 6,
  },

  /* Track */
  '::-webkit-scrollbar-track': {
    background: '$gray700',
    borderRadius: 9999,
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: '$gray600',
    borderRadius: 9999,
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    background: '$gray500',
  },
})
