import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default ({ nextUrl: { pathname }}: NextRequest) => {
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  return response
}