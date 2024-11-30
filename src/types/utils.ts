export type Unarray<T extends unknown[]> = T extends Array<infer U> ? U : never
