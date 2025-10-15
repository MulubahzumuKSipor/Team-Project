'use client';
import React from 'react';
import styles from '../page.module.css';
import { useCart } from '../lib/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce(
    // FIX: Used logical OR (||) for a default value instead of invalid ternary syntax.
    (acc, item) => acc + (item.featuredproduct?.price || 0) * (item.quantity || 0),
    0
  );

  const shipping = subtotal > 0 ? 10.0 : 0.0;
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>Your Shopping Cart ({cart.length} items)</h2>

      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty! Time to find some handcrafted goods. 🛍️</p>
          <Link href={'/shop'}><button className={styles.continueShoppingButton}>Continue Shopping</button></Link>
        </div>
      ) : (
        <div className={styles.cartContent}>
          {/* Cart Item List */}
          <div className={styles.itemList}>
            {cart.map((item) => {
              const price = item.featuredproduct?.price || 0;
              const quantity = item.quantity || 0;

              return (
                // POTENTIAL FIX: Changed key to a more appropriate unique identifier like item.id.
                // If item.user_id is the only unique ID available, you can keep it, but it's not ideal.
                <div key={item.user_id || item.user_id} className={styles.cartItem}>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>${price.toFixed(2)} each</p>
                  </div>

                  <div className={styles.itemControls}>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() =>
                          // FIX: Corrected ternary syntax and ensured quantity doesn't go below 1.
                          updateQuantity(String(item.user_id), Math.max(1, quantity - 1))
                        }
                        className={styles.qtyButton}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        readOnly
                        className={styles.qtyInput}
                      />
                      <button
                        // FIX: Corrected increment logic and made ID type consistent.
                        onClick={() => updateQuantity(String(item.user_id), quantity + 1)}
                        className={styles.qtyButton}
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.itemTotal}>
                      {/* FIX: Used the 'quantity' variable for calculation. */}
                      Total: ${(price * quantity).toFixed(2)}
                    </p>
                    <button
                      className={styles.removeButton}
                      // FIX: Ensured ID is consistently a string.
                      onClick={() => removeFromCart(String(item.user_id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
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
            <button className={styles.checkoutButton}>Proceed to Checkout</button>
            <button onClick={clearCart} className={styles.clearCartButton}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}