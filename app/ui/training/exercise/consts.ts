export const tagColorClassName: Record<number, any> = {
  1: {
    bg: 'bg-cyan-700',
    text: 'text-white',
    titleColor: 'text-cyan-700',
    color: 'cyan-700',
  },
  2: {
    bg: 'bg-pink-700',
    text: 'text-white',
    titleColor: 'text-pink-700',
    color: 'pink-700',
  },
  3: {
    bg: 'bg-zinc-700',
    text: 'text-white',
    titleColor: 'text-zinc-700',
    color: 'zinc-700',
  },
  4: {
    bg: 'bg-purple-700',
    text: 'text-white',
    titleColor: 'text-purple-700',
    color: 'purple-700',
  },
  5: {
    bg: 'bg-blue-700',
    text: 'text-white',
    titleColor: 'text-blue-700',
    color: 'blue-700',
  },
  6: {
    bg: 'bg-yellow-700',
    text: 'text-white',
    titleColor: 'text-yellow-700',
    color: 'yellow-700',
  },
  7: {
    bg: 'bg-red-700',
    text: 'text-white',
    titleColor: 'text-red-700',
    color: 'red-700',
  },
  8: {
    bg: 'bg-red-400',
    text: 'text-white',
    titleColor: 'text-red-400',
    color: 'red-400',
  },
};

export type Tag = keyof typeof tagColorClassName;

export const iconClasses = 'text-xl text-blue-500 pointer-events-none w-6';
