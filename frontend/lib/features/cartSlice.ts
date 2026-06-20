import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CartProduct {
  id: number
  name: string
  price: number
  qty: number
}

interface CartState {
  products: CartProduct[],
  total: number
}

const initialState: CartState = { 
    products: [],
    total: 0
 }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateProducts(state, action: PayloadAction<CartProduct>) {
        const productIndex = state.products.findIndex((product) => product.id === action.payload.id)
        if (productIndex!==-1) {
            state.products[productIndex] = action.payload
        } else {
            state.products.push(action.payload)
        }
        const countTotal = state.products.reduce((acc, product) => {
            return acc + (product.price * product.qty)
        }, 0)
        state.total = countTotal
    },
    removeItem(state, action) {
        state.products = state.products.filter((item) => item.id!=action.payload)
    }
    // addProduct(state) {
        
    // }
    // increment(state) {
    //   state.value++
    // },
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload
    // },
  },
})

// export const { increment, decrement, incrementByAmount } = cartSlice.actions
export const {updateProducts, removeItem} = cartSlice.actions
export default cartSlice.reducer