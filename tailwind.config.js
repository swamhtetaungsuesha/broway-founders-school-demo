module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,json}",
    "./components/**/*.{js,ts,jsx,tsx,json}",
  ],
  theme: {
    extend: {},
    minWidth: {
      '1/2': '50%',
      '500' : '500px'
    },
    minHeight: {
      '1/2': '50%',
      '300' : '300px'

    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      'create':['Fugaz One', 'sans-serif'],
      'caption_small':['Inter', 'sans-serif'],
      'content':['Hepta Slab', 'serif'],
      'number': ['Signika Negative', 'sans-serif']
    },
    objectPosition: {
      'center-top': 'center top',
    },
    
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("tailwindcss-scoped-groups")({
      groups: ["one", "two"],
  }),
  ],
}
