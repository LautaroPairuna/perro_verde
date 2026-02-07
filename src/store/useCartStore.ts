import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  quantity: number
  thumbnail: string
  name: string
  price: number
}

interface CartState {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  // Selectores útiles (opcional integrarlos aquí o derivarlos en componentes)
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.cart.findIndex((i) => i.id === item.id)
          if (existingIndex !== -1) {
            const newCart = [...state.cart]
            newCart[existingIndex] = {
              ...newCart[existingIndex],
              quantity: newCart[existingIndex].quantity + item.quantity,
            }
            return { cart: newCart }
          }
          return { cart: [...state.cart, item] }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }))
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getTotalItems: () => {
        return get().cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (acc, item) => acc + Number(item.price) * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage', // nombre en localStorage
      storage: createJSONStorage(() => localStorage),
      // Opcional: onRehydrateStorage para debug o manejo de carga
    }
  )
)
