export const AVATAR_COLORS = [
  '#4762E3',
  '#FF7A59',
  '#0F9D6E',
  '#8B5CF6',
  '#C2790B',
  '#D43A45',
  '#0EA5B7',
]

export const avatarColor = (s: string): string =>
  AVATAR_COLORS[s.charCodeAt(0) % AVATAR_COLORS.length]

export const initials = (n: string): string =>
  n
    .split(' ')
    .map((x) => x[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
