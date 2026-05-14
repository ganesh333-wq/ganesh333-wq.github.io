const path = require('path')
 
module.exports = {
  output: 'export',
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com', 'media.dev.to']
  }
}
