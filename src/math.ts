
export function lerp(v1: number, v2: number, frac: number): number {
    const delta = v2 - v1;
    return v1 + delta * frac;
}

export function map(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    const inDelta = inMax - inMin;
    const inFrac = (v - inMin) / inDelta;
    const outDelta = outMax - outMin;
    return outDelta * inFrac + outMin;
}


export function between(v: number, mn: number, mx: number): boolean {
    return v >= mn && v <= mx;
}

