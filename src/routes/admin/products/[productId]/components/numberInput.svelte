<script lang="ts">
	import { capitalizeAndReplace } from 'utils';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import { CheckOutline, MinusOutline, PenOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { editProductStore } from '.';

	interface Props {
		defaultValue?: number;
		maxValue?: number;
		minValue?: number;
		label: string;
		description?: string;
	}

	const { defaultValue, maxValue, minValue, label, description }: Props = $props();
	let isEditing = $derived(!!editProductStore.editState);

	/*
        onClick={async () => {
				setEditState((state: any) => ({
					...state,
					[label]: {
						editing: !isEditing,
						text: (inputRef.current as any).value
					}
				}));

				if (inputRef.current && isEditing) {
					await editAttribute(product?.id, {
						key: label,
						value: parseInt((inputRef.current as any).value)
					});
				}

				if (activeInput === label) {
					setActiveInput('');
					return;
				}

				if (activeInput) document.getElementById(activeInput)?.click();
				setActiveInput(label);
			}}
        */
</script>

<div>
	<Label for={`${label}-input`}>{capitalizeAndReplace(label)}</Label>
	<div>
		<Button
			class={[
				{ 'opacity-0 pointer-events-none cursor-not-allowed': !isEditing },
				'grid transition-all'
			]}
		>
			<MinusOutline class="size-8" />
		</Button>
		<Input
			id={`${label}-input`}
			type="number"
			disabled={!isEditing}
			autofocus={isEditing}
			defaultValue={defaultValue || 0}
			minlength={minValue}
			maxlength={maxValue}
			class={[
				'transition-all border-2 border-transparent react-aria-Input',
				{ 'border-secondary-dark': isEditing }
			]}
		/>
		<Button class={[{ 'opacity-0': !isEditing }, 'grid transition-all']} disabled={!isEditing}>
			<PlusOutline class="size-8" />
		</Button>

		<Button type={isEditing ? 'submit' : 'button'} id={label}>
			{#if !isEditing}
				<PenOutline class="size-10" />
			{:else}
				<CheckOutline class="size-10" />
			{/if}
		</Button>
	</div>
	{#if description}
		<Textarea>{description}</Textarea>
	{/if}
	<!-- <FieldError /> -->
</div>

