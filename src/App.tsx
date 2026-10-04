/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, Product, CartItem, Soundtrack, Order } from './types';
import { ALL_VAULT_PRODUCTS } from './data/mockData';
import { INITIAL_MOCK_ORDERS } from './data/mockOrders';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  doc,
  setDoc,
  collection,
  onSnapshot,
} from './firebase';
import type { User } from 'firebase/auth';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { FlavorQuizModal } from './components/FlavorQuizModal';
import { AudioPlayerWidget } from './components/AudioPlayerWidget';
import { UserProfileModal } from './components/UserProfileModal';
import { KineticIntelModal } from './components/KineticIntelModal';
import { CreatorWatermarkBadge } from './components/CreatorWatermarkBadge';
import { CreatorWatermarkModal } from './components/CreatorWatermarkModal';
import { HomeScreen } from './screens/HomeScreen';
import { ShopDropsScreen } from './screens/ShopDropsScreen';
import { ProductSpotlightScreen } from './screens/ProductSpotlightScreen';
import { XClubCommunityScreen } from './screens/XClubCommunityScreen';
import { TasteLabScreen } from './screens/TasteLabScreen';
import { AboutScreen } from './screens/AboutScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [shopCategory, setShopCategory] = useState<string>('all');

  // Creator Contact & Watermark Modal State
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  // Firebase Auth User State
  const [user, setUser] = useState<User | null>(null);
  const [isFirestoreLive, setIsFirestoreLive] = useState(true);

  // Orders State (synced with Firestore when signed in)
  const [orders, setOrders] = useState<Order[]>(INITIAL_MOCK_ORDERS);

  // Profile Modal State
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Google Search Grounded Intelligence Modal
  const [isIntelOpen, setIsIntelOpen] = useState(false);
  const [intelQuery, setIntelQuery] = useState('');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: ALL_VAULT_PRODUCTS[0],
      quantity: 1,
      flavor: 'Glazed Donut Core',
      size: '2.2 lbs',
      isSubscription: true,
      price: 35.99,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals & Widgets
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Soundtrack | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Global CMD+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Firebase Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        showToast(`⚡ SIGNED IN AS ${currentUser.displayName || currentUser.email}!`);
        // Sync profile document to Firestore
        try {
          await setDoc(
            doc(db, 'users', currentUser.uid),
            {
              uid: currentUser.uid,
              name: currentUser.displayName || 'Athlete',
              email: currentUser.email || '',
              photoURL: currentUser.photoURL || '',
              tier: 'TITANIUM VIP // TIER 3',
              passId: `KP-${currentUser.uid.slice(0, 5).toUpperCase()}`,
              xpPoints: 4850,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.warn('Error syncing user profile to Firestore:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore orders collection for the signed-in user
  useEffect(() => {
    if (!user) {
      setOrders(INITIAL_MOCK_ORDERS);
      return;
    }

    try {
      const ordersCol = collection(db, 'users', user.uid, 'orders');
      const unsubscribeOrders = onSnapshot(
        ordersCol,
        (snapshot) => {
          if (!snapshot.empty) {
            const firestoreOrders: Order[] = [];
            snapshot.forEach((docSnap) => {
              firestoreOrders.push(docSnap.data() as Order);
            });
            setOrders(firestoreOrders);
            setIsFirestoreLive(true);
          } else {
            // First time user: seed initial orders into Firestore so user sees their Titanium mock history immediately
            INITIAL_MOCK_ORDERS.forEach(async (mo) => {
              try {
                await setDoc(doc(db, 'users', user.uid, 'orders', mo.id), mo);
              } catch (e) {
                console.warn('Could not seed initial order:', e);
              }
            });
            setOrders(INITIAL_MOCK_ORDERS);
          }
        },
        (error) => {
          console.warn('Firestore snapshot listener error:', error);
          setOrders(INITIAL_MOCK_ORDERS);
        }
      );
      return () => unsubscribeOrders();
    } catch (e) {
      console.warn('Error connecting orders listener:', e);
    }
  }, [user]);

  const handleSignInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google Sign-in failed:', error);
      showToast(
        error.message ? `Sign-in notice: ${error.message}` : 'Google Sign-in encountered an issue.'
      );
    }
  };

  const handleSignOutGoogle = async () => {
    try {
      await signOut(auth);
      showToast('Signed out of Kinetic VIP account.');
    } catch (error: any) {
      console.error('Sign-out error:', error);
    }
  };

  // Navigation helper
  const handleNavigate = (screen: ScreenType, categoryFilter?: string) => {
    if (categoryFilter) {
      setShopCategory(categoryFilter);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Kinetic Intel modal with optional initial query
  const handleOpenIntel = (initialQ?: string) => {
    setIntelQuery(initialQ || '');
    setIsIntelOpen(true);
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    flavor?: string,
    size?: string,
    isSub = false,
    customPrice?: number
  ) => {
    const chosenFlavor = flavor || 'Glazed Donut Core';
    const chosenSize = size || '2.2 lbs';
    const chosenPrice =
      customPrice !== undefined
        ? customPrice
        : isSub && product.subPrice
        ? product.subPrice
        : product.price;

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.flavor === chosenFlavor &&
        item.size === chosenSize &&
        item.isSubscription === isSub
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        quantity: 1,
        flavor: chosenFlavor,
        size: chosenSize,
        isSubscription: isSub,
        price: chosenPrice,
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    showToast(`⚡ ADDED ${product.name.toUpperCase()} (${chosenFlavor}) TO BAG!`);
    setIsCartOpen(true);
  };

  // Reorder entire order from OrderHistory
  const handleReorderOrder = (order: Order) => {
    const newItems: CartItem[] = order.items.map((item, idx) => {
      const match =
        ALL_VAULT_PRODUCTS.find((p) =>
          item.name.toLowerCase().includes(p.name.toLowerCase())
        ) || ALL_VAULT_PRODUCTS[0];

      return {
        id: `reorder-${Date.now()}-${idx}`,
        product: match,
        quantity: item.quantity,
        flavor: item.flavor,
        size: item.size,
        isSubscription: false,
        price: item.price,
      };
    });

    setCartItems((prev) => [...prev, ...newItems]);
    setIsProfileOpen(false);
    setIsCartOpen(true);
    showToast(`⚡ REORDERED ${order.items.length} ITEMS FROM ORDER #${order.orderNumber}!`);
  };

  // Add custom bundle
  const handleAddCustomBundle = (
    bundleItems: { product: Product; flavor: string; price: number }[]
  ) => {
    const newItems: CartItem[] = bundleItems.map((item, idx) => ({
      id: `bundle-item-${Date.now()}-${idx}`,
      product: item.product,
      quantity: 1,
      flavor: item.flavor,
      size: 'Standard',
      isSubscription: false,
      price: item.price,
    }));

    setCartItems((prev) => [...prev, ...newItems]);
    showToast(`💥 CUSTOM 3-TIER STACK ADDED TO BAG WITH 25% DISCOUNT!`);
    setIsCartOpen(true);
  };

  // Add Quiz Stack
  const handleAddQuizStack = (stackProducts: Product[], discountCode: string) => {
    const newItems: CartItem[] = stackProducts.map((p, idx) => ({
      id: `quiz-item-${Date.now()}-${idx}`,
      product: p,
      quantity: 1,
      flavor: 'Personalized Quiz Match',
      size: 'Full Tub',
      isSubscription: true,
      price: p.subPrice || p.price,
    }));

    setCartItems((prev) => [...prev, ...newItems]);
    showToast(`🔥 QUIZ RECOMMENDATION STACK ADDED WITH CODE ${discountCode}!`);
    setIsCartOpen(true);
  };

  // Cart Qty updates
  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from bag');
  };

  // Checkout Success: creates new live order in "Processing" status and saves to Firestore
  const handleCheckoutSuccess = async (
    items: CartItem[],
    total: number,
    discount: number,
    shipping: number
  ) => {
    const newOrderNum = `KX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNum,
      date: 'JUST NOW // CLEANROOM DISPATCH',
      status: 'Processing',
      items: items.map((ci) => ({
        id: ci.id,
        name: ci.product.name,
        flavor: ci.flavor,
        size: ci.size,
        quantity: ci.quantity,
        price: ci.price,
        image: ci.product.image,
      })),
      subtotal: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      discount,
      shipping,
      total,
      carrier: 'FedEx Kinetic Express Air',
      trackingNumber: `FXK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      estimatedDelivery: '3 BUSINESS DAYS',
      shippingAddress: 'Kai Chen, 1420 Olympic Blvd, Apt 4B, Los Angeles, CA 90015',
      timeline: [
        {
          title: 'Order Placed & Payment Authorized',
          description: 'Batch reservation confirmed via Apple Pay.',
          timestamp: 'Just now',
          completed: true,
        },
        {
          title: 'Cleanroom Batch Dispensing',
          description: 'Automated micro-filtration canister sealing underway.',
          timestamp: 'In progress',
          completed: false,
          current: true,
        },
        {
          title: 'FedEx Express Courier Scan',
          description: 'Expected dispatch within 12 hours.',
          timestamp: 'Pending',
          completed: false,
        },
        {
          title: 'Final Delivery',
          description: 'Insured contactless delivery to resident door.',
          timestamp: 'Pending',
          completed: false,
        },
      ],
    };

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'orders', newOrder.id), newOrder);
      } catch (err) {
        console.warn('Failed to save order to Firestore:', err);
      }
    }

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    showToast(`🎉 ORDER #${newOrderNum} PLACED! TRACKING LIVE IN FIRESTORE.`);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0e0e12] text-[#e4e1e7] flex flex-col font-space selection:bg-[#c3f400] selection:text-[#0e0e12]">
      {/* Sticky Header Navigation */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        user={user}
        onSignInGoogle={handleSignInGoogle}
        onOpenIntel={() => handleOpenIntel()}
        onOpenCreatorModal={() => setIsCreatorModalOpen(true)}
      />

      {/* Main Content Area (padding-top accounts for header height) */}
      <main className="flex-1 w-full pt-[112px]">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenToast={showToast}
          />
        )}

        {currentScreen === 'shop-drops' && (
          <ShopDropsScreen
            initialCategory={shopCategory}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onAddCustomBundle={handleAddCustomBundle}
            onOpenToast={showToast}
          />
        )}

        {currentScreen === 'product-spotlight' && (
          <ProductSpotlightScreen
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onOpenToast={showToast}
          />
        )}

        {currentScreen === 'x-club-community' && (
          <XClubCommunityScreen
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onPlayTrack={(track) => setCurrentTrack(track)}
            onOpenToast={showToast}
          />
        )}

        {currentScreen === 'taste-lab' && (
          <TasteLabScreen
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onOpenToast={showToast}
            onOpenIntel={() => handleOpenIntel('Cold microfiltered whey vs ion exchange')}
            user={user}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen
            onNavigate={handleNavigate}
            onOpenToast={showToast}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenToast={showToast}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* User Account / Profile & Order History Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
        onReorder={handleReorderOrder}
        onOpenToast={showToast}
        user={user}
        onSignInGoogle={handleSignInGoogle}
        onSignOutGoogle={handleSignOutGoogle}
        isFirestoreLive={isFirestoreLive}
      />

      {/* Google Search Grounded Kinetic Intel Modal (Gemini 3.5 Flash) */}
      <KineticIntelModal
        isOpen={isIntelOpen}
        onClose={() => setIsIntelOpen(false)}
        initialQuery={intelQuery}
      />

      {/* Shopping Bag Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onNavigate={handleNavigate}
        onCheckoutSuccess={handleCheckoutSuccess}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* CMD+K Instant Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenIntel={handleOpenIntel}
      />

      {/* 60-Second Biomechanical Flavor Quiz Modal */}
      <FlavorQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddStackToBag={handleAddQuizStack}
      />

      {/* Floating Audio Player for Soundtracks */}
      <AudioPlayerWidget
        currentTrack={currentTrack}
        onClose={() => setCurrentTrack(null)}
      />

      {/* Floating Creator Watermark & Contact Pill */}
      <CreatorWatermarkBadge
        onOpenModal={() => setIsCreatorModalOpen(true)}
        onOpenToast={showToast}
      />

      {/* Creator Watermark & Direct Client Contact Modal */}
      <CreatorWatermarkModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
        onNavigate={handleNavigate}
        onOpenToast={showToast}
      />

      {/* Floating Brutalist Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#131317] border-2 border-[#c3f400] text-white p-4 shadow-[6px_6px_0px_#000000] flex items-center justify-between gap-4 animate-bounce-once">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-ping" />
            <span className="font-space font-bold text-xs uppercase tracking-wide">
              {toastMessage}
            </span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#8f919d] hover:text-white font-space text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
