<script lang="ts">
	import { House, Library, User, ScrollText, Signal } from '@lucide/svelte';
</script>

<aside>
	<div class="container">
		<ul class="list">
			<li class="list-item">
				<a href="/" class="list-item-link">
					<House size={20} />
					<span>Anasayfa</span>
				</a>
			</li>
			<li class="list-item">
				<a href="/library" class="list-item-link">
					<Library size={20} />
					<span>Kütüphane</span>
				</a>
			</li>
			<li class="list-item">
				<a href="/profile" class="list-item-link">
					<User size={20} />
					<span>Profil</span>
				</a>
			</li>
			<li class="list-item">
				<a href="/hitories" class="list-item-link">
					<ScrollText size={20} />
					<span>Hikayeler</span>
				</a>
			</li>
			<li class="list-item">
				<a href="/stats" class="list-item-link">
					<Signal size={20} />
					<span>İstatistikler</span>
				</a>
			</li>
		</ul>
	</div>
</aside>

<style>
	aside {
		width: 250px;
		height: 100vh;
		background-color: var(--color-primary-50);
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

	.list-item.active::before {
		content: '';
		position: absolute;
		left: 2px;
		top: 8px;
		width: 4px;
		height: 70%;
		background-color: var(--color-primary-950);
		transition: background-color 0.3s ease;
	}

	.list-item:hover {
		font-weight: 500;
	}

	.list-item-link {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.8rem;
		text-decoration: none;
		color: var(--color-primary-950);
	}
</style>
