<script lang="ts">
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';

	type Props = {
		name: string;
		label: string;
		autocomplete: 'current-password' | 'new-password';
		minlength?: number;
	};
	let { name, label, autocomplete, minlength }: Props = $props();
	let visible = $state(false);
	const id = $props.id();
</script>

<div class="field">
	<label for={id}>{label}</label>
	<div class="relative">
		<input
			{id}
			{name}
			{autocomplete}
			{minlength}
			required
			type={visible ? 'text' : 'password'}
			class="input pr-12"
		/>
		<button
			type="button"
			class="btn-icon absolute top-1/2 right-1 size-9 -translate-y-1/2 text-muted"
			aria-label={visible ? 'Hide password' : 'Show password'}
			aria-pressed={visible}
			onclick={() => (visible = !visible)}
		>
			{#if visible}<EyeOff class="size-4" />{:else}<Eye class="size-4" />{/if}
		</button>
	</div>
	{#if minlength}
		<p class="text-xs font-normal text-muted">At least {minlength} characters.</p>
	{/if}
</div>
