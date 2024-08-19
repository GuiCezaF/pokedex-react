export const getBackgroundColor = (type: string): string => {
  switch (type) {
    case 'normal':
      return 'var(--normal)';
    case 'fire':
      return 'var(--fire)';
    case 'water':
      return 'var(--water)';
    case 'electric':
      return 'var(--electric)';
    case 'grass':
      return 'var(--grass)';
    case 'ice':
      return 'var(--ice)';
    case 'fighting':
      return 'var(--fighting)';
    case 'poison':
      return 'var(--poison)';
    case 'ground':
      return 'var(--ground)';
    case 'flying':
      return 'var(--flying)';
    case 'psychic':
      return 'var(--psychic)';
    case 'bug':
      return 'var(--bug)';
    case 'rock':
      return 'var(--rock)';
    case 'ghost':
      return 'var(--ghost)';
    case 'dragon':
      return 'var(--dragon)';
    case 'fairy':
      return 'var(--fairy)';
    default:
      return 'var(--tipo-n-registrado)';
  }
};