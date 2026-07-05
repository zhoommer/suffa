<script lang="ts">
	import { ArrowLeft, Save, Send } from '@lucide/svelte';
	import Tiptap from '$lib/Tiptap.svelte';

	let title = $state('');
	let saving = $state(false);

	async function saveDraft() {
		saving = true;
		// TODO: persist to DB via form action / API
		await new Promise((r) => setTimeout(r, 600));
		saving = false;
	}
</script>

<div class="write-page">
	<!-- Top action bar -->
	<div class="write-bar">
		<a href="/" class="back-btn">
			<ArrowLeft size={16} />
			Geri
		</a>

		<input class="title-input" bind:value={title} placeholder="Başlık ekleyin..." maxlength={120} />

		<div class="write-actions">
			<button class="btn-draft" onclick={saveDraft} disabled={saving}>
				<Save size={14} />
				{saving ? 'Kaydediliyor...' : 'Taslak'}
			</button>
			<button class="btn-publish">
				<Send size={14} />
				Yayınla
			</button>
		</div>
	</div>

	<!-- Full-height editor -->
	<Tiptap placeholder="Hikayenizi buraya yazın..." fullPage />
</div>

<style>
	.write-page {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	/* ── Top bar ── */
	.write-bar {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0 1.25rem;
		height: 52px;
		background: var(--color-bg-surface);
		border-bottom: 1px solid var(--color-border-divider);
		flex-shrink: 0;
	}

	.back-btn {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.85rem;
		color: var(--color-text-muted);
		text-decoration: none;
		white-space: nowrap;
		padding: 0.35rem 0.6rem;
		border-radius: 6px;
		transition:
			background 0.12s,
			color 0.12s;
	}

	.back-btn:hover {
		background: var(--color-primary-50);
		color: var(--color-primary-700);
	}

	.title-input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text-heading);
		min-width: 0;
	}

	.title-input::placeholder {
		color: var(--color-text-muted);
		font-weight: 400;
	}

	.write-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.btn-draft,
	.btn-publish {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.9rem;
		border-radius: 6px;
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
		border: none;
		transition:
			background 0.12s,
			opacity 0.12s;
	}

	.btn-draft {
		background: var(--color-primary-50);
		color: var(--color-primary-700);
	}

	.btn-draft:hover:not(:disabled) {
		background: var(--color-primary-100);
	}

	.btn-draft:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-publish {
		background: var(--color-primary-600);
		color: #fff;
	}

	.btn-publish:hover {
		background: var(--color-primary-700);
	}
</style>
