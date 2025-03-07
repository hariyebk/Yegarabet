'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Logout } from '@/actions'
import Link from 'next/link'
import { createPortal } from 'react-dom'

interface UserMenuProps {
    user: {
        firstName: string
        email: string
        image?: string | null
    } | null
}

export function UserMenu({ user }: UserMenuProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && 
                !menuRef.current.contains(event.target as Node) && 
                popupRef.current && 
                !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        const response = await Logout()
        if (response.success) {
            setIsOpen(false)
            router.refresh()
            router.push('/')
        }
    }

    if (!user) {
        return (
            <div className="flex items-center max-sm:gap-6 sm:gap-14 text-regular text-sm">
                <Link href="/signin"> Signin </Link>
                <Link href="/signup"> Signup </Link>
            </div>
        )
    }

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border border-[#ff9c24]"
            >
                {user.image ? (
                    <Image 
                        src={user.image} 
                        alt={user.firstName}
                        width={40}
                        height={40}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-base" style={{ backgroundColor: '#1e1e20' }}>
                        {user.firstName[0]}
                    </div>
                )}
            </button>

            {isOpen && typeof document !== 'undefined' && createPortal(
                <div 
                    ref={popupRef}
                    className="fixed right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-[100]"
                    style={{
                        top: '60px',
                        right: '24px'
                    }}
                >
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm text-gray-700 font-medium">{user.firstName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Log out
                    </button>
                </div>,
                document.body
            )}
        </div>
    )
} 