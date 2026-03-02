'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import { Error as ErrorComponent } from '@/articles/error'
 
const Error = ({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return <ErrorComponent>Something went wrong!</ErrorComponent>
}

export default Error