declare module "*.scss"; declare module "*.sass"; declare module "*.less"; declare module "*.styl"; declare module "*.json"; declare module "*.svg";

export interface PinnedDMS {
    [category: string]: Category
}

export interface Category {
    color ?: ColorHex
    users: Array<import("ittai").UserID>
}

export type ColorHex = `#${string}`

export const DiscordNative = import("ittai").DiscordNative