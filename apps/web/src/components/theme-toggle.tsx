"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    return (
        <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme == "light" ? <Moon className="size-5"/> : <Sun className="size-5"/>}

        </button>
    )
}

