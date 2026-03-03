"use client"

import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react"
import type { CartItem } from "@/lib/types"

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: "hydrate"; payload: CartItem[] }
  | { type: "add"; payload: CartItem }
  | { type: "remove"; payload: { productId: string } }
  | { type: "updateQuantity"; payload: { productId: string; quantity: number } }
  | { type: "clear" }

type CartContextValue = {
  state: CartState
  dispatch: Dispatch<CartAction>
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.payload }
    case "add": {
      const existing = state.items.find((item) => item.productId === action.payload.productId)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }
      return { items: [...state.items, action.payload] }
    }
    case "remove":
      return {
        items: state.items.filter((item) => item.productId !== action.payload.productId),
      }
    case "updateQuantity":
      return {
        items: state.items
          .map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: Math.max(0, action.payload.quantity) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case "clear":
      return { items: [] }
    default:
      return state
  }
}

const STORAGE_KEY = "edc-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const hasHydratedFromStorage = useRef(false)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      hasHydratedFromStorage.current = true
      return
    }

    try {
      const parsed = JSON.parse(raw) as CartItem[]
      if (Array.isArray(parsed)) {
        dispatch({ type: "hydrate", payload: parsed })
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    } finally {
      hasHydratedFromStorage.current = true
    }
  }, [])

  useEffect(() => {
    if (!hasHydratedFromStorage.current) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const value = {
    state,
    dispatch,
    itemCount,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return context
}
