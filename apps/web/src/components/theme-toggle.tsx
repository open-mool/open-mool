"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Wait until mounted on client to avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="size-5" /> // Placeholder to avoid layout shift
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <button 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2 hover:bg-[var(--bg-subtle)] rounded-full flex items-center justify-center"
        >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
    )
}
