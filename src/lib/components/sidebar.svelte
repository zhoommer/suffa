<script lang="ts">
	import { page } from '$app/state';
	import { type ResolvedPathname } from '$app/types';
	import { House, Library, User, ScrollText, Signal } from '@lucide/svelte';

	interface NavItem {
		id: number;
		href: ResolvedPathname;
		icon: typeof House;
		label: string;
	}

	let { collapsed = false }: { collapsed?: boolean } = $props();

	const nav: NavItem[] = [
		{ id: 0, href: '/', icon: House, label: 'Anasayfa' },
		{ id: 1, href: '/library', icon: Library, label: 'Kütüphane' },
		{ id: 2, href: '/profile', icon: User, label: 'Profil' },
		{ id: 3, href: '/histories', icon: ScrollText, label: 'Hikayeler' },
		{ id: 4, href: '/stats', icon: Signal, label: 'İstatistikler' }
	];
</script>

<aside class:collapsed>
	<div class="container">
		<ul class="list">
			{#each nav as item (item.id)}
				{@const Icon = item.icon}
				<li class="list-item" class:active={page.url.pathname === item.href}>
					<a
						href={item.href}
						class="list-item-link"
						aria-current={page.url.pathname === item.href ? 'page' : undefined}
					>
						<Icon size={20} />
						<span class="label">{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</aside>

<style>
	aside {
		width: 250px;
		height: 100%;
		background-color: var(--color-primary-50);
		border-right: 1px solid var(--color-border-divider);
		flex-shrink: 0;
		overflow: hidden;
		transition: width 0.2s ease;
	}

	aside.collapsed {
		width: 64px;
	}

	aside.collapsed .label {
		display: none;
	}

	aside.collapsed .list-item-link {
		justify-content: center;
	}

	aside.collapsed .list-item.active {
		padding-left: 1rem;
	}

	.list {
		border-bottom: 1px solid var(--color-border-divider);
		padding-bottom: 2rem;
	}

	.list-item {
		position: relative;
		list-style: none;
		padding: 1rem;
		transition: font-weight 0.3s ease;
	}

	.list-item:hover {
		font-weight: 500;
	}

	.list-item.active {
		padding-left: calc(1rem + 4px);
		font-weight: 600;
	}

	.list-item.active::before {
		content: '';
		position: absolute;
		left: 3px;
		top: 10px;
		bottom: 0;
		width: 4px;
		height: 70%;
		background-color: var(--color-primary-700);
		transition: background-color 0.2s ease;
	}

	.list-item-link {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.8rem;
		text-decoration: none;
		color: var(--color-primary-950);
	}

	/* ── Mobile: bottom navigation bar ── */
	@media (max-width: 768px) {
		aside {
			width: 100%;
			height: 64px;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			border-right: none;
			border-top: 1px solid var(--color-border-divider);
			z-index: 100;
		}

		.container {
			height: 100%;
		}

		.list {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			height: 100%;
			padding: 0;
			border-bottom: none;
		}

		.list-item {
			padding: 0;
			flex: 1;
			display: flex;
			justify-content: center;
		}

		.list-item.active {
			padding-left: 0;
		}

		.list-item.active::before {
			display: none;
		}

		.list-item-link {
			flex-direction: column;
			gap: 0.25rem;
			padding: 0.5rem;
			font-size: 0.65rem;
		}

		.list-item.active .list-item-link {
			color: var(--color-primary-700);
			font-weight: 600;
		}
	}
</style>
