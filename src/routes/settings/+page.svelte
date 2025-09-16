<script lang="ts">
	import { LogoutButton, PasswordInput, SettingForm } from 'components';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { globalStore } from 'store';
	import { createDisclosure } from 'svelte-headlessui';
	import { Button } from 'flowbite-svelte';
	import { customEnhanceHandler } from 'utils';
	import type { ActionData } from './$types';
	import type {
		TChangeAvatarSuccess,
		TChangePasswordSuccess,
		TChangeUsernameSuccess,
		TDeleteAccountSuccess
	} from './+page.server';

	const changeAvatar = createDisclosure({ expanded: false });
	const changeUsername = createDisclosure({ expanded: false });
	const changePassword = createDisclosure({ expanded: false });
	const deleteAccount = createDisclosure({ expanded: false });

	let newUsername = $state('');
	let currentPass = $state('');
	let newPass = $state('');
	let updating = $state(false);
	let showCurrentPass = $state(false);
	let showNewPass = $state(false);
	let sessionDestroyed = $state(false);

	let changeAvatarFeedback = $state('');
	let changePassFeedback = $state('');
	let changeUsernameFeedback = $state('');

	type RequestSuccessMap = {
		avatar: TChangeAvatarSuccess;
		delete: TDeleteAccountSuccess;
		password: TChangePasswordSuccess;
		username: TChangeUsernameSuccess;
	};
	type TRequestState = { loading: boolean; message: string; error: string };

	let updateAvatar: TRequestState = $state({ loading: false, message: '', error: '' });
	let destroyAccount: TRequestState = $state({ loading: false, message: '', error: '' });
	let updatePassword: TRequestState = $state({ loading: false, message: '', error: '' });
	let updateUsername: TRequestState = $state({ loading: false, message: '', error: '' });

	const handleChangeUserInfo = <K extends keyof RequestSuccessMap>(
		type: K,
		requestState: TRequestState
	) =>
		customEnhanceHandler<ActionData, RequestSuccessMap[K]>((data) => {
			console.log('performed:', type);
			const isSessiondestroy = ['logout', 'delete'].includes(type);
			requestState.message = data.message;

			globalStore.user = data.user;

			if (isSessiondestroy && 'redirectTo' in data) {
				// keep session destroy buttons disabled
				updating = false;
				sessionDestroyed = true;
				goto(data.redirectTo);
			}
		}, requestState);
</script>

<div class="bg-gray-500 size-full overflow-y-auto px-6 py-4 md:py-8">
	<div class="mx-auto space-y-2 md:w-[55%] md:space-y-4">
		<div class="mx-auto mb-4 flex w-fit items-center gap-4 md:mb-6">
			<img
				class="aspect-square size-12 rounded-full border"
				src={globalStore.user?.avatar}
				alt="User icon"
			/>

			<div>
				<p class="text-xl">{globalStore.user?.username}</p>
				<p class="text-xs italic text-gray-500 dark:text-gray-200">@{globalStore.user?.email}</p>
			</div>
		</div>
		<h1 class="text-center text-lg font-bold md:text-xl">Settings</h1>
		<div class="space-y-2 rounded-sm border p-2 md:rounded-md md:px-6 md:py-4">
			<!-- change avatar -->
			<div class="relative">
				<SettingForm
					heading="Change avatar"
					disclosure={changeAvatar}
					action="?/changeAvatar"
					handler={handleChangeUserInfo('avatar', updateAvatar)}
					{updating}
					feedback={changeAvatarFeedback}
				>
					<input
						required
						class="mr-1 rounded-sm bg-white p-1"
						type="file"
						accept="image/*"
						name="avatar"
					/>
				</SettingForm>

				<!-- set to default if not already default avatar -->
				{#if globalStore.user?.avatar !== '/images/icons8-user-64.png' && $changeAvatar.expanded}
					<form
						class="absolute bottom-4 right-4 px-2"
						method="POST"
						action="?/setDefaultAvatar"
						use:enhance={handleChangeUserInfo('avatar', updateAvatar)}
					>
						<input type="hidden" bind:value={globalStore.user!.username} name="username" />
						<Button disabled={updating}>Set default</Button>
					</form>
				{/if}
			</div>

			<!-- change username -->
			<SettingForm
				heading="Change display name"
				disclosure={changeUsername}
				action="?/changeUsername"
				handler={handleChangeUserInfo('username', updateUsername)}
				feedback={changeUsernameFeedback}
				{updating}
			>
				<input
					required
					class="mr-1 rounded-sm p-1"
					type="text"
					bind:value={newUsername}
					name="newUsername"
					placeholder="New display name"
				/>
			</SettingForm>

			<!-- change password -->
			<SettingForm
				{updating}
				heading="Change password"
				disclosure={changePassword}
				action="?/changePassword"
				handler={handleChangeUserInfo('password', updatePassword)}
				feedback={changePassFeedback}
			>
				<PasswordInput
					label="Show current password"
					name="currentPassword"
					placeholder="Current password"
					show={showCurrentPass}
					value={currentPass}
				/>
				<PasswordInput
					label="Show new password"
					name="newPassword"
					placeholder="New password"
					show={showNewPass}
					value={newPass}
				/>
			</SettingForm>

			<!-- log out -->
			<LogoutButton />

			<!-- delete account -->
			<SettingForm
				heading="Delete my account"
				disclosure={deleteAccount}
				action="?/deleteAccount"
				handler={handleChangeUserInfo('delete', destroyAccount)}
				{updating}
				cta="I am sure"
				{sessionDestroyed}
			>
				<p class="text-sm">Are you sure? This action cannot be undone</p>
			</SettingForm>
		</div>
	</div>
</div>

<style>
	input {
		@apply dark:bg-gray-100 dark:text-dark;
	}
</style>

