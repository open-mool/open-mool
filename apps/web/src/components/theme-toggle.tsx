"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Wait until mounted on client to avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="size-5" />
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    return (
        <button 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            className="hover:text-[var(--text-primary)] transition-colors p-1 rounded-md"
        >
            {resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
    )
}

