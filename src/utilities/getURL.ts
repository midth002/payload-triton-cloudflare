import { headers } from 'next/headers'

export const getServerSideURL = (): string => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return getServerSideURL()
}

export const getOrigin = async (): Promise<string> => {
  const headersList = await headers()
  const origin = headersList.get('origin') || headersList.get('host')

  if (origin?.includes('localhost')) {
    return `http://${origin}`
  }

  if (origin) {
    return `https://${origin}`
  }

  return getServerSideURL()
}
