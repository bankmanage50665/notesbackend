import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addToCart: (items) => {},
  removeFromCart: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_TO_CART") {
    const cartItemIndex = state.items.findIndex(
      (item) => item.id === action.items.id
    );
    const updatedItems = [...state.items];
    if (cartItemIndex > -1) {
      const existingItem = state.items[cartItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[cartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.items, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE_FROM_CART") {
    const cartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[cartItemIndex];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(cartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[cartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchAction] = useReducer(cartReducer, { items: [] });

  function addToCart(items) {
    dispatchAction({ type: "ADD_TO_CART", items });
  }

  function removeFromCart(id) {
    dispatchAction({ type: "REMOVE_FROM_CART", id });
  }

  const ctxValue = { items: cart.items, addToCart, removeFromCart };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
