export function murmurhash3(key, seed = 0) {
  let h = seed >>> 0
  const len = key.length
  const rem = len & 3
  const blocks = len - rem
  const c1 = 0xcc9e2d51
  const c2 = 0x1b873593

  for (let i = 0; i < blocks; i += 4) {
    let k =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(i + 1) & 0xff) << 8) |
      ((key.charCodeAt(i + 2) & 0xff) << 16) |
      ((key.charCodeAt(i + 3) & 0xff) << 24)

    k = Math.imul(k, c1)
    k = (k << 15) | (k >>> 17)
    k = Math.imul(k, c2)

    h ^= k
    h = (h << 13) | (h >>> 19)
    h = Math.imul(h, 5) + 0xe6546b64
  }

  let tail = 0
  if (rem >= 3) tail ^= (key.charCodeAt(blocks + 2) & 0xff) << 16
  if (rem >= 2) tail ^= (key.charCodeAt(blocks + 1) & 0xff) << 8
  if (rem >= 1) {
    tail ^= key.charCodeAt(blocks) & 0xff
    tail = Math.imul(tail, c1)
    tail = (tail << 15) | (tail >>> 17)
    tail = Math.imul(tail, c2)
    h ^= tail
  }

  h ^= len
  h ^= h >>> 16
  h = Math.imul(h, 0x85ebca6b)
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35)
  h ^= h >>> 16

  return (h >>> 0).toString(16).padStart(8, '0')
}
