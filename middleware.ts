 
import {  NextResponse } from 'next/server'
import { auth } from './auth'
 

 
export default auth((req)=>{
    const isLoggedIn = !!req.auth
    if(!isLoggedIn)  return NextResponse.redirect(new URL('/login', req.url))
   
})

export const config =  {

    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|login).*)',],
}