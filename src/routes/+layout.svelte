<script lang="ts">
	import Aside from '$lib/components/sidebar.svelte';
	let { children } = $props();
</script>

<Aside />
{@render children()}

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
	}

	:global(body) {
		font-family: system-ui, sans-serif;
		box-sizing: border-box;
		background-color: var(--color-bg-body);
		font-style:
			Times New Roman,
			sans-serif;
	}
</style>
