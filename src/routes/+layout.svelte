<script lang="ts">
	import Aside from '$lib/components/sidebar.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	let { children } = $props();
	let collapsed = $state(false);
</script>

<div class="app-wrapper">
	<Navbar {collapsed} ontoggle={() => (collapsed = !collapsed)} />
	<div class="app-body">
		<Aside {collapsed} />
		<main class="main-content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	:global(:root) {
		/* Background Colors */
		--color-bg-body: #fafaf9;
		--color-bg-surface: #ffffff;

		/* Border & Divider Colors */
		--color-border-divider: #e7e5e4;

		/* Typography Colors */
		--color-text-heading: #0f172a;
		--color-text-body: #334155;
		--color-text-muted: #64748b;

		/* Primary Brand Colors (Deep Pine Green) */
		--color-primary-50: #ecfdf5;
		--color-primary-100: #d1fae5;
		--color-primary-400: #34d399;
		--color-primary-500: #10b981;
		--color-primary-600: #059669; /* Main Action Color */
		--color-primary-700: #047857; /* Hover State */
		--color-primary-800: #065f46;
		--color-primary-950: #022c22;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: system-ui, sans-serif;
		background-color: var(--color-bg-body);
	}

	.app-wrapper {
		display: grid;
		grid-template-rows: 60px 1fr;
		height: 100vh;
		overflow: hidden;
	}

	.app-body {
		display: flex;
		overflow: hidden;
	}

	.main-content {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
	}

	@media (max-width: 768px) {
		.app-body {
			padding-bottom: 64px;
		}

		.main-content {
			padding: 1rem;
		}
	}
</style>
