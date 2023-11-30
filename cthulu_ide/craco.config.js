module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },
  webpack: {
    configure: {
      target: 'electron-renderer'
    }
  }
}
