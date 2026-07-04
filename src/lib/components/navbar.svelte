<script lang="ts">
	import { Menu } from '@lucide/svelte';

	let {
		collapsed,
		ontoggle
	}: {
		collapsed: boolean;
		ontoggle: () => void;
	} = $props();
</script>

<header class="navbar">
	<div class="navbar-left">
		<button class="toggle-btn" onclick={ontoggle} aria-label="Toggle sidebar">
			<Menu size={25} />
		</button>
		<span class="brand_name">Suffa</span>
	</div>
	<div class="navbar-right">
		<div class="avatar" aria-label="User profile"></div>
	</div>
</header>

<style>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.5rem;
		background-color: var(--color-bg-surface);
		border-bottom: 1px solid var(--color-border-divider);
		height: 100%;
	}

	.navbar-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.brand_name {
		font-size: 2.1rem;
		font-weight: 700;
		color: var(--color-primary-700);
		letter-spacing: -0.02em;
	}

	.toggle-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.4rem;
		border-radius: 6px;
		color: var(--color-text-body);
		transition: background-color 0.15s ease;
	}

	.toggle-btn:hover {
		background-color: var(--color-primary-50);
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: var(--color-primary-400);
		cursor: pointer;
	}

	/* Toggle button hidden on mobile — sidebar becomes bottom nav */
	@media (max-width: 768px) {
		.toggle-btn {
			display: none;
		}
	}
</style>
