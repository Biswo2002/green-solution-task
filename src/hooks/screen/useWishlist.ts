import { useCallback, useState } from 'react';

export function useWishlist() {
  const [ids, setIds] = useState<Set<string>>(() => new Set());
  const toggle = useCallback((id: string) => {
    setIds(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }, []);
  return { wishlist: ids, toggleWishlist: toggle };
}
