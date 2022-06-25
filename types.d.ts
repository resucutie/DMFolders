export interface PinnedDMS {
    [category: string]: Category
}

export interface Category {
    color ?: ColorHex | "default"
    users: Array<import("ittai").UserID>
}

export type ColorHex = `#${string}`

export const DiscordNative = import("ittai").DiscordNative