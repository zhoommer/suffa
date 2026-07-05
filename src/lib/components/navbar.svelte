<script lang="ts">
	import { Menu, LogOut, User, ChevronDown, Bell, NotebookPen } from '@lucide/svelte';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let {
		collapsed,
		ontoggle,
		user
	}: {
		collapsed: boolean;
		ontoggle: () => void;
		user: Record<string, unknown> | null;
	} = $props();
	let menuEl = $state<HTMLDivElement | null>(null);
	let menuOpen = $state(false);

	const initials = $derived(
		typeof user?.name === 'string'
			? user.name
					.split(' ')
					.map((n) => n[0])
					.join('')
					.toUpperCase()
					.slice(0, 2)
			: '?'
	);

	$effect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuEl && !menuEl.contains(e.target as Node)) {
				menuOpen = false;
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	async function logout() {
		await authClient.signOut();
		goto('/login');
	}
</script>

<header class="navbar">
	<div class="navbar-left">
		<button class="toggle-btn" onclick={ontoggle} aria-label="Toggle sidebar">
			<Menu size={25} />
		</button>
		<span class="brand_name">Suffa</span>
		<input class="search-input" type="search" placeholder="Ara..." />
	</div>

	<div class="navbar-right">
		<a href="/write" class="write-btn">
			<NotebookPen />
			Yazı Yaz
		</a>
		<button class="notification-btn">
			<Bell size={20} />
		</button>
		<div class="user-menu" bind:this={menuEl}>
			<button class="avatar-btn" onclick={() => (menuOpen = !menuOpen)} aria-label="User menu">
				<div class="avatar">{initials}</div>
				<ChevronDown
					size={14}
					class="chevron"
					style="transform: rotate({menuOpen ? 180 : 0}deg); transition: transform 0.2s ease;"
				/>
			</button>

			{#if menuOpen}
				<div class="dropdown" role="menu">
					<div class="dropdown-header">
						<div class="avatar avatar--lg">{initials}</div>
						<div class="user-info">
							<span class="user-name">{user?.name ?? '—'}</span>
							<span class="user-email">{user?.email ?? ''}</span>
						</div>
					</div>

					<div class="dropdown-divider"></div>

					<button
						class="dropdown-item"
						role="menuitem"
						onclick={() => {
							menuOpen = false;
							goto('/profile');
						}}
					>
						<User size={15} />
						Profil
					</button>

					<div class="dropdown-divider"></div>

					<button class="dropdown-item dropdown-item--danger" role="menuitem" onclick={logout}>
						<LogOut size={15} />
						Çıkış Yap
					</button>
				</div>
			{/if}
		</div>
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

	.navbar-right {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.write-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--color-primary-600);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.write-btn:hover {
		color: var(--color-primary-700);
	}

	.notification-btn {
		border: none;
		border-radius: 50%;
		background: none;
		color: var(--color-primary-600);
		width: 36px;
		height: 36px;
		transition: background-color 0.15s ease;
	}

	.notification-btn:hover {
		background-color: var(--color-primary-100);
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

	.search-input {
		border: none;
		border-radius: 1rem;
		color: var(--color-primary-950);
		background-color: var(--color-primary-50);
		padding: 0.75rem;
		width: 10rem;
		transition: width 0.3s ease;
	}

	.search-input:focus {
		outline: none;
		width: 20rem;
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

	/* ── User menu ── */
	.user-menu {
		position: relative;
	}

	.avatar-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.3rem 0.5rem;
		border-radius: 8px;
		transition: background-color 0.15s ease;
	}

	.avatar-btn:hover {
		background-color: var(--color-primary-50);
	}

	.avatar {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background-color: var(--color-primary-600);
		color: #fff;
		font-size: 0.75rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.avatar--lg {
		width: 42px;
		height: 42px;
		font-size: 1rem;
	}

	/* ── Dropdown ── */
	.dropdown {
		position: absolute;
		top: calc(100% + 10px);
		right: 0;
		min-width: 230px;
		background: var(--color-bg-surface);
		border: 1px solid var(--color-border-divider);
		border-radius: 10px;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.07),
			0 10px 20px -4px rgba(0, 0, 0, 0.08);
		z-index: 200;
		overflow: hidden;
		animation: dropdown-in 0.12s ease;
	}

	@keyframes dropdown-in {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.dropdown-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.85rem 1rem;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		overflow: hidden;
	}

	.user-name {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-heading);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-email {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.dropdown-divider {
		height: 1px;
		background-color: var(--color-border-divider);
		margin: 0;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
		padding: 0.7rem 1rem;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.875rem;
		color: var(--color-text-body);
		text-align: left;
		transition: background-color 0.12s ease;
	}

	.dropdown-item:hover {
		background-color: var(--color-primary-50);
	}

	.dropdown-item--danger {
		color: #dc2626;
	}

	.dropdown-item--danger:hover {
		background-color: #fef2f2;
	}

	@media (max-width: 768px) {
		.toggle-btn {
			display: none;
		}

		.search-input {
			display: none;
		}
	}
</style>
