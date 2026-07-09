import { useEffect, useState } from 'react'

// Carrinho local/frontend do Studio Shop mobile — compartilhado entre
// a listagem (MobileShopPage.jsx) e a página completa do produto
// (ShopProduto.jsx), para que os dois lugares leiam e escrevam o
// mesmo carrinho. Só localStorage + React state: sem API, sem banco,
// sem checkout real.

export const SHOP_CART_STORAGE_KEY = 'studiopay_shop_cart'

function readCart() {
  try {
    const raw = localStorage.getItem(SHOP_CART_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * @param {Array} products - lista de produtos disponível na tela atual
 *   (usada só para resolver nome/preço dos itens do carrinho; o
 *   carrinho em si guarda apenas { id, qty }).
 */
export function useShopCart(products = []) {
  const [cart, setCart] = useState(readCart)

  // Persistência local — só localStorage, sem API/banco.
  useEffect(() => {
    try {
      localStorage.setItem(SHOP_CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // localStorage indisponível (ex.: modo privado sem quota) — o
      // carrinho continua funcionando normalmente só na sessão atual.
    }
  }, [cart])

  // Mantém listagem e página de produto em sincronia quando o
  // carrinho muda em outra aba/janela (evento nativo "storage").
  useEffect(() => {
    function onStorage(e) {
      if (e.key === SHOP_CART_STORAGE_KEY) setCart(readCart())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  function addItem(id, qty = 1) {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.id === id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...prev, { id, qty }]
    })
  }

  function increment(id) {
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)))
  }

  function decrement(id) {
    setCart((prev) => prev.flatMap((it) => {
      if (it.id !== id) return [it]
      const nextQty = it.qty - 1
      return nextQty > 0 ? [{ ...it, qty: nextQty }] : []
    }))
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((it) => it.id !== id))
  }

  function clear() {
    setCart([])
  }

  const items = cart
    .map((it) => ({ ...it, product: products.find((p) => p.id === it.id) }))
    .filter((it) => it.product)

  const totalQuantity = items.reduce((s, it) => s + it.qty, 0)
  const subtotal = items.reduce((s, it) => s + (it.product.precoPro ?? it.product.preco) * it.qty, 0)
  const savings = items.reduce((s, it) => {
    if (it.product.precoPro == null) return s
    return s + (it.product.preco - it.product.precoPro) * it.qty
  }, 0)

  return {
    items,
    addItem,
    increment,
    decrement,
    removeItem,
    clear,
    totalQuantity,
    subtotal,
    savings,
  }
}
