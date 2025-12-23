export const formatDateTime = (timestamp: string): string => {
  const date = new Date(timestamp)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleDateString('en-US', options)
}

export const formatDateTimeShort = (timestamp: string): string => {
  const date = new Date(timestamp)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  return date.toLocaleDateString('en-US', options)
}
