import { page } from '$app/state';
import type { TProductState } from './types';

export const USER_PRODUCTS = 'app:user-products';

type Toast = { id: number; text: string; tone: 'info' | 'error' };

/** Client-only UI state. Never written during SSR, so it is safe at module level. */
export const ui = $state({ cartOpen: false, toast: null as Toast | null });

let toastTimer: ReturnType<typeof setTimeout> | undefined;
export function notify(text: string, tone: Toast['tone'] = 'info') {
	clearTimeout(toastTimer);
	ui.toast = { id: Date.now(), text, tone };
	toastTimer = setTimeout(() => (ui.toast = null), 3500);
}

/** The signed-in user's lists, derived from the root layout's data (the server is the source of truth). */
export const shop = {
	get user() {
		return page.data.user ?? null;
	},
	get states(): TProductState[] {
		return page.data.userProducts ?? [];
	},
	get cart() {
		return this.states.filter((s) => s.isInCart);
	},
	get cartCount() {
		return this.cart.reduce((sum, s) => sum + s.quantity, 0);
	},
	get wishlist() {
		return this.states.filter((s) => s.isWishlisted);
	},
	get orders() {
		return this.states.filter((s) => s.isPurchased);
	},
	stateOf(productId: string) {
		return this.states.find((s) => s.productId === productId);
	}
};
