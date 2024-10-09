import { useEffect } from 'react'

const letters = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <text x="50%" y="50%" font-size="24" text-anchor="middle" dy=".35em" font-family="Arial, sans-serif" font-weight="bold" fill="#4A90E2">A</text>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <text x="50%" y="50%" font-size="24" text-anchor="middle" dy=".35em" font-family="Arial, sans-serif" font-weight="bold" fill="#4A90E2">C</text>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <text x="50%" y="50%" font-size="24" text-anchor="middle" dy=".35em" font-family="Arial, sans-serif" font-weight="bold" fill="#4A90E2">P</text>
  </svg>`
]

export default function AnimateHeadIcon() {
  useEffect(() => {
    let currentIndex = 0

    const changeFavicon = () => {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
      if (!link) {
        const newLink = document.createElement('link')
        newLink.rel = 'icon'
        document.head.appendChild(newLink)
      }
      const svgBlob = new Blob([letters[currentIndex]], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(svgBlob)
      if (link) {
        link.href = url
      }
      currentIndex = (currentIndex + 1) % letters.length

      setTimeout(() => URL.revokeObjectURL(url), 2000)
    }

    changeFavicon()

    const intervalId = setInterval(changeFavicon, 2000)

    return () => {
      clearInterval(intervalId)
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
      if (link && link.href.startsWith('blob:')) {
        URL.revokeObjectURL(link.href)
      }
    }
  }, [])

  return null
}