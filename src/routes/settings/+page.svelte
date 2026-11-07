<script lang="ts">
	import { enhance } from '$app/forms';
	import FormMessage from '$lib/components/FormMessage.svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import { newFormState, submit } from '$lib/forms';
	import { shop } from '$lib/shop.svelte';

	const avatar = $state(newFormState());
	const name = $state(newFormState());
	const password = $state(newFormState());
	const remove = $state(newFormState());
	let confirmDelete: HTMLDialogElement;

	const user = $derived(shop.user!);
	const hasCustomAvatar = $derived(user.avatar.startsWith('/avatars/'));
</script>

<svelte:head><title>Settings · Common Goods</title></svelte:head>

{#snippet section(title: string, description: string)}
	<div>
		<h2 class="font-sans text-base font-semibold tracking-normal">{title}</h2>
		<p class="mt-1 text-sm text-muted">{description}</p>
	</div>
{/snippet}

<section class="container-page max-w-3xl pt-10 sm:pt-14">
	<div class="flex items-center gap-5">
		<img
			src={user.avatar}
			alt=""
			class="size-16 rounded-full border border-line bg-sand object-cover"
		/>
		<div>
			<h1 class="text-4xl">{user.username}</h1>
			<p class="text-muted">{user.email}</p>
		</div>
	</div>

	<div class="mt-10 divide-y divide-line card">
		<div class="grid gap-4 p-6 sm:grid-cols-[14rem_1fr]">
			{@render section('Avatar', 'PNG, JPEG, GIF or WebP, up to 2 MB.')}
			<div class="grid gap-3">
				<form
					method="POST"
					action="?/changeAvatar"
					enctype="multipart/form-data"
					use:enhance={submit(avatar)}
					class="flex flex-wrap items-center gap-3"
				>
					<label for="avatar" class="sr-only">Avatar image</label>
					<input
						id="avatar"
						name="avatar"
						type="file"
						accept="image/png,image/jpeg,image/gif,image/webp"
						required
						class="text-sm file:mr-3 file:rounded-full file:border file:border-line file:bg-surface file:px-4 file:py-2 file:text-sm file:font-semibold"
					/>
					<button class="btn-primary" disabled={avatar.pending}>Upload</button>
				</form>
				{#if hasCustomAvatar}
					<form method="POST" action="?/resetAvatar" use:enhance={submit(avatar)}>
						<button
							class="text-sm text-muted underline underline-offset-4 hover:text-ink"
							disabled={avatar.pending}>Use default avatar</button
						>
					</form>
				{/if}
				<FormMessage form={avatar} />
			</div>
		</div>

		<div class="grid gap-4 p-6 sm:grid-cols-[14rem_1fr]">
			{@render section('Display name', 'Shown in your account menu.')}
			<form
				method="POST"
				action="?/changeUsername"
				use:enhance={submit(name, { reset: false })}
				class="grid gap-3"
			>
				<label for="username" class="sr-only">Display name</label>
				<div class="flex gap-2">
					<input
						id="username"
						name="username"
						value={user.username}
						required
						minlength="2"
						class="input"
					/>
					<button class="btn-primary" disabled={name.pending}>Save</button>
				</div>
				<FormMessage form={name} />
			</form>
		</div>

		<div class="grid gap-4 p-6 sm:grid-cols-[14rem_1fr]">
			{@render section('Password', 'Changing it signs out your other devices.')}
			<form
				method="POST"
				action="?/changePassword"
				use:enhance={submit(password)}
				class="grid gap-4"
			>
				<PasswordInput
					name="currentPassword"
					label="Current password"
					autocomplete="current-password"
				/>
				<PasswordInput
					name="newPassword"
					label="New password"
					autocomplete="new-password"
					minlength={8}
				/>
				<FormMessage form={password} />
				<button class="btn-primary justify-self-start" disabled={password.pending}
					>Update password</button
				>
			</form>
		</div>

		<div class="grid gap-4 p-6 sm:grid-cols-[14rem_1fr]">
			{@render section(
				'Delete account',
				'Permanently removes your account, cart, wishlist and order history.'
			)}
			<div>
				<button
					class="btn-outline border-red-200 text-danger hover:border-danger"
					onclick={() => confirmDelete.showModal()}
				>
					Delete account…
				</button>
			</div>
		</div>
	</div>
</section>

<dialog
	bind:this={confirmDelete}
	aria-labelledby="delete-title"
	class="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-surface p-6 text-ink backdrop:bg-ink/40"
>
	<h2 id="delete-title" class="text-2xl">Delete your account?</h2>
	<p class="mt-2 text-muted">
		This can’t be undone. Your cart, wishlist and order history will be removed.
	</p>
	<form
		method="POST"
		action="?/deleteAccount"
		use:enhance={submit(remove)}
		class="mt-6 flex justify-end gap-3"
	>
		<button type="button" class="btn-outline" onclick={() => confirmDelete.close()}>Cancel</button>
		<button class="btn-danger" disabled={remove.pending}>Delete account</button>
	</form>
	<FormMessage form={remove} />
</dialog>
