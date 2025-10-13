"use client"

import { cn } from "@/lib/utils"
import { HyperText } from "@/components/ui/hyper-text"

type Props = {
  lines: string[]
  className?: string
}

export function ScrollHighlightText({ lines, className }: Props) {
  return (
    <div className={cn("space-y-3 text-center px-4 -mt-16 sm:mt-44", className)}>
      {lines.map((line, lineIndex) => {
        // Check if this line contains "I'm Hari"
        if (line.includes("I'm Hari")) {
          // Split the line and render with special styling
          const parts = line.split(/(I'm Hari)/g)
          
          return (
            <div key={lineIndex} className="text-balance">
              <div className="text-white/90">
                {parts.map((part, partIndex) => {
                  if (part === "I'm Hari") {
                    return (
                      <span
                        key={partIndex}
                        className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text"
                        style={{
                          backgroundSize: '200% 200%',
                          animation: 'gradient 3s ease infinite',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          color: 'transparent',
                        }}
                      >
                        {part}
                      </span>
                    )
                  }
                  return (
                    <span 
                      key={partIndex}
                      style={{
                        color: '#f8f9fa',
                        textShadow: '0 0 10px rgba(248, 249, 250, 0.3)',
                      }}
                    >
                      {part}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        }
        
        // Regular line without special styling
        return (
          <div key={lineIndex} className="text-balance">
            <HyperText
              className="text-white/90"
              style={{
                color: '#f8f9fa',
                textShadow: '0 0 10px rgba(248, 249, 250, 0.3)',
              }}
              duration={1200}
              animateOnHover={false}
              startOnView={false}
              delay={lineIndex * 200}
            >
              {line}
            </HyperText>
          </div>
        )
      })}
    </div>
  )
}
