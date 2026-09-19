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
      { src: '/apple-icon.svg', sizes: '32x32', type: 'image/svg' },
      { src: '/apple-icon.svg', sizes: '180x180', type: 'image/svg' },
    ],
  }
}
