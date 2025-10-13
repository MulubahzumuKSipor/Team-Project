'use client'
import React from "react";
import styles from "../page.module.css"
import { useCart } from "../context/cartContext"; // Import the custom hook

export default function Cart(){
  // Get state and functions from the global context
  const { cartItems, updateQuantity } = useCart();

  // The rest of your logic can now use the global state
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 10.00 : 0.00;
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>Your Shopping Cart ({cartItems.length} items)</h2>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty! Time to find some handcrafted goods. 🛍️</p>
          <button className={styles.continueShoppingButton}>Continue Shopping</button>
        </div>
      ) : (
        <div className={styles.cartContent}>
          {/* Cart Item List */}
          <div className={styles.itemList}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)} each</p>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantityControl}>
                    {/* Use the updateQuantity function from the context */}
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={styles.qtyButton}
                    >-</button>
                    <input 
                      type="number" 
                      value={item.quantity}
                      min="1"
                      readOnly
                      className={styles.qtyInput}
                    />
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={styles.qtyButton}
                    >+</button>
                  </div>
                  <p className={styles.itemTotal}>Total: **${(item.price * item.quantity).toFixed(2)}**</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary (This part remains the same) */}
          <div className={styles.summaryBox}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryLine}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
              <div className={styles.summaryLine}>
              <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryLine} ${styles.grandTotal}`}>
              <span>Grand Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}