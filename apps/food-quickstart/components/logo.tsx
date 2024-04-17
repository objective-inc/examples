import { cn } from "@/lib/utils"
import { LucideProps } from "lucide-react"

export const BrandLogo = ({ className, ...props }: LucideProps) => {
    return (
        <svg
            className={cn("text-primary fill-current", className)}
            {...props}
            width="145"
            height="75"
            viewBox="0 0 145 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.0123 0C16.571 0 0 16.571 0 37.0123C0 57.4537 16.571 74.0247 37.0123 74.0247H107.634C128.075 74.0247 144.646 57.4537 144.646 37.0123C144.646 16.571 128.075 0 107.634 0H37.0123ZM87.6383 22.9729H60.4108V50.2004H87.6383V22.9729ZM115.716 50.2008L88.489 50.2008L115.716 22.9733V50.2008ZM45.0955 50.2004C52.6142 50.2004 58.7092 44.1053 58.7092 36.5866C58.7092 29.068 52.6142 22.9729 45.0955 22.9729C37.5769 22.9729 31.4818 29.068 31.4818 36.5866C31.4818 44.1053 37.5769 50.2004 45.0955 50.2004Z"
                fill="currentColor"
            />
        </svg>
    )
}
