'use client';

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import type { User } from '@supabase/supabase-js';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1️⃣ Get initial user
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null); // `data.user` might be null
    };
    fetchUser();

    // 2️⃣ Listen for login/logout events
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      // session can be null if logged out
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.subscription.unsubscribe(); // cleanup
    };
  }, []);

  return { user };
}
