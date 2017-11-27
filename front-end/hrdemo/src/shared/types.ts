export interface Guy {
    firstName: string
    lastName: string
}

export type Eventual<T> = 'isLoading' | T