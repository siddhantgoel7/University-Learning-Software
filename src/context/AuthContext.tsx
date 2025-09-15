import React, { createContext, useContext, useEffect, useState } from 'react'


type User = { id: string; name: string; role: 'professor' | 'student' }


type AuthCtx = {
user: User | null
loginAsProfessor: (name: string) => void
logout: () => void
}


const Ctx = createContext<AuthCtx | undefined>(undefined)


export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User | null>(null)


useEffect(() => {
const raw = localStorage.getItem('auth:user')
if (raw) setUser(JSON.parse(raw))
}, [])


const loginAsProfessor = (name: string) => {
const u: User = { id: 'prof-1', name, role: 'professor' }
setUser(u)
localStorage.setItem('auth:user', JSON.stringify(u))
}


const logout = () => {
setUser(null)
localStorage.removeItem('auth:user')
}


return <Ctx.Provider value={{ user, loginAsProfessor, logout }}>{children}</Ctx.Provider>
}


export function useAuth() {
const v = useContext(Ctx)
if (!v) throw new Error('useAuth must be used within <AuthProvider>')
return v
}