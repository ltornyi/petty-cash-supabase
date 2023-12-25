import { Injectable } from '@angular/core';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { createSupabaseClient } from '../client/supabase-client';
import { Database } from '../client/supabase.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient<Database>;
  private currentUser = new BehaviorSubject<User | undefined>(undefined)

  constructor() {
    this.supabase = createSupabaseClient();

    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(sess?.user);
      } else {
        this.currentUser.next(undefined);
      }
    })
  }

  public get supabaseClient() {
    return this.supabase
  }

  getCurrentUser() {
    return this.currentUser.asObservable()
  }

  getCurrentUserValue() {
    return this.currentUser.value
  }

  signUp(credentials: { email: string, password: string }) {
    return this.supabase.auth.signUp(credentials)
  }

  signIn(credentials: { email: string, password: string }) {
    return this.supabase.auth.signInWithPassword(credentials)
  }

  sendPwReset(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email)
  }

  async signOut() {
    await this.supabase.auth.signOut()
  }
}
