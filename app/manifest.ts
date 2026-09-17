import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HDFC Digital Banking',
    short_name: 'HDFC Bank',
    description: 'A digital banking statement experience.',
    start_url: '/',
    display: 'standalone',
    background_color: '#071238',
    theme_color: '#071238',
    orientation: 'portrait',
    icons: [
      { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
