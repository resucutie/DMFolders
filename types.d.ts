export interface PinnedDMS {
    [category: string]: {
        color?: string
        users: Array<import("ittai").UserID>
    }
}