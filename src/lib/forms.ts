import type { SubmitFunction } from '@sveltejs/kit';
import { invalidate } from '$app/navigation';

export type FormState = { pending: boolean; error: string; message: string };

export const newFormState = (): FormState => ({ pending: false, error: '', message: '' });

type Options = {
	/** Refresh only this dependency instead of every load function. */
	invalidate?: string;
	/** Reset the form's inputs after success (default: true unless `invalidate` is set). */
	reset?: boolean;
	onSuccess?: () => void;
};

/** `use:enhance` handler that tracks pending/error/message state for a form. */
export function submit(state: FormState, options: Options = {}): SubmitFunction {
	return () => {
		state.pending = true;
		state.error = '';
		state.message = '';

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const message = result.data?.message;
				state.message = typeof message === 'string' ? message : '';
				if (options.invalidate) {
					await update({ reset: options.reset ?? false, invalidateAll: false });
					await invalidate(options.invalidate);
				} else {
					await update({ reset: options.reset ?? true });
				}
				options.onSuccess?.();
			} else if (result.type === 'failure') {
				const error = result.data?.error;
				state.error = typeof error === 'string' ? error : 'Something went wrong.';
			} else if (
				result.type === 'redirect' &&
				new URL(result.location, location.href).origin !== location.origin
			) {
				// e.g. Stripe Checkout: client-side navigation can't leave the app.
				location.href = result.location;
				return;
			} else if (result.type === 'error') {
				state.error = 'Something went wrong. Please try again.';
			} else {
				await update();
			}
			state.pending = false;
		};
	};
}
