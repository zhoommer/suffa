<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { StarterKit } from '@tiptap/starter-kit';
	import { Underline } from '@tiptap/extension-underline';
	import { Link } from '@tiptap/extension-link';
	import { Placeholder } from '@tiptap/extension-placeholder';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import {
		Bold,
		Italic,
		Underline as UnderlineIcon,
		Strikethrough,
		Code,
		Heading1,
		Heading2,
		Heading3,
		List,
		ListOrdered,
		Quote,
		FileCode,
		Minus,
		Undo2,
		Redo2,
		Link as LinkIcon
	} from '@lucide/svelte';

	let {
		placeholder = 'Yazmaya başlayın...',
		fullPage = false
	}: { placeholder?: string; fullPage?: boolean } = $props();

	let element = $state<HTMLDivElement | null>(null);
	let bubbleMenuEl = $state<HTMLDivElement | null>(null);
	let editor = $state<Editor | null>(null);

	// Re-render trigger
	let tick = $state(0);

	const is = (type: string, attrs?: Record<string, unknown>) =>
		editor?.isActive(type, attrs) ?? false;

	function setLink() {
		const prev = editor?.getAttributes('link').href ?? '';
		const url = window.prompt('URL girin:', prev);
		if (url === null) return;
		if (url === '') {
			editor?.chain().focus().extendMarkRange('link').unsetLink().run();
		} else {
			editor
				?.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: url, target: '_blank' })
				.run();
		}
	}

	onMount(() => {
		editor = new Editor({
			element: element!,
			extensions: [
				StarterKit,
				Underline,
				Link.configure({ openOnClick: false }),
				Placeholder.configure({ placeholder }),
				BubbleMenu.configure({ element: bubbleMenuEl! })
			],
			content: '',
			onTransaction: () => {
				tick++;
			}
		});
	});

	onDestroy(() => editor?.destroy());
</script>

<!-- Bubble menu (shown on text selection) -->
<div bind:this={bubbleMenuEl} class="bubble-menu" class:hidden={!editor}>
	{#if editor}
		<button
			class:active={is('bold')}
			onclick={() => editor?.chain().focus().toggleBold().run()}
			title="Kalın"
		>
			<Bold size={13} />
		</button>
		<button
			class:active={is('italic')}
			onclick={() => editor?.chain().focus().toggleItalic().run()}
			title="İtalik"
		>
			<Italic size={13} />
		</button>
		<button
			class:active={is('underline')}
			onclick={() => editor?.chain().focus().toggleUnderline().run()}
			title="Altı çizgili"
		>
			<UnderlineIcon size={13} />
		</button>
		<button
			class:active={is('strike')}
			onclick={() => editor?.chain().focus().toggleStrike().run()}
			title="Üstü çizgili"
		>
			<Strikethrough size={13} />
		</button>
		<div class="bubble-divider"></div>
		<button class:active={is('link')} onclick={setLink} title="Bağlantı">
			<LinkIcon size={13} />
		</button>
	{/if}
</div>

<div class="editor-wrapper" class:full-page={fullPage}>
	<!-- Fixed toolbar -->
	<div class="toolbar" class:hidden={!editor}>
		{#if editor}
			<!-- History -->
			<div class="toolbar-group">
				<button
					class="toolbar-btn"
					onclick={() => editor?.chain().focus().undo().run()}
					disabled={!editor.can().undo()}
					title="Geri Al"
				>
					<Undo2 size={15} />
				</button>
				<button
					class="toolbar-btn"
					onclick={() => editor?.chain().focus().redo().run()}
					disabled={!editor.can().redo()}
					title="İleri Al"
				>
					<Redo2 size={15} />
				</button>
			</div>

			<div class="toolbar-divider"></div>

			<!-- Text style -->
			<div class="toolbar-group">
				<button
					class="toolbar-btn"
					class:active={is('bold')}
					onclick={() => editor?.chain().focus().toggleBold().run()}
					title="Kalın (Ctrl+B)"
				>
					<Bold size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('italic')}
					onclick={() => editor?.chain().focus().toggleItalic().run()}
					title="İtalik (Ctrl+I)"
				>
					<Italic size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('underline')}
					onclick={() => editor?.chain().focus().toggleUnderline().run()}
					title="Altı Çizgili (Ctrl+U)"
				>
					<UnderlineIcon size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('strike')}
					onclick={() => editor?.chain().focus().toggleStrike().run()}
					title="Üstü Çizgili"
				>
					<Strikethrough size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('code')}
					onclick={() => editor?.chain().focus().toggleCode().run()}
					title="Satır içi Kod"
				>
					<Code size={15} />
				</button>
			</div>

			<div class="toolbar-divider"></div>

			<!-- Headings -->
			<div class="toolbar-group">
				<button
					class="toolbar-btn"
					class:active={is('heading', { level: 1 })}
					onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
					title="Başlık 1"
				>
					<Heading1 size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('heading', { level: 2 })}
					onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
					title="Başlık 2"
				>
					<Heading2 size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('heading', { level: 3 })}
					onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
					title="Başlık 3"
				>
					<Heading3 size={15} />
				</button>
			</div>

			<div class="toolbar-divider"></div>

			<!-- Lists & blocks -->
			<div class="toolbar-group">
				<button
					class="toolbar-btn"
					class:active={is('bulletList')}
					onclick={() => editor?.chain().focus().toggleBulletList().run()}
					title="Madde İşareti"
				>
					<List size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('orderedList')}
					onclick={() => editor?.chain().focus().toggleOrderedList().run()}
					title="Numaralı Liste"
				>
					<ListOrdered size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('blockquote')}
					onclick={() => editor?.chain().focus().toggleBlockquote().run()}
					title="Alıntı"
				>
					<Quote size={15} />
				</button>
				<button
					class="toolbar-btn"
					class:active={is('codeBlock')}
					onclick={() => editor?.chain().focus().toggleCodeBlock().run()}
					title="Kod Bloğu"
				>
					<FileCode size={15} />
				</button>
				<button
					class="toolbar-btn"
					onclick={() => editor?.chain().focus().setHorizontalRule().run()}
					title="Yatay Çizgi"
				>
					<Minus size={15} />
				</button>
			</div>

			<div class="toolbar-divider"></div>

			<!-- Link -->
			<div class="toolbar-group">
				<button
					class="toolbar-btn"
					class:active={is('link')}
					onclick={setLink}
					title="Bağlantı Ekle"
				>
					<LinkIcon size={15} />
				</button>
			</div>
		{/if}
	</div>

	<!-- Editor content area -->
	<div bind:this={element} class="editor-content"></div>
</div>

<style>
	/* ── Bubble menu ── */
	.bubble-menu {
		display: flex;
		align-items: center;
		gap: 2px;
		background: var(--color-text-heading);
		border-radius: 8px;
		padding: 4px 6px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.bubble-menu.hidden {
		display: none;
	}

	.bubble-menu button {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		color: #e2e8f0;
		cursor: pointer;
		padding: 4px 6px;
		border-radius: 4px;
		transition: background 0.1s;
	}

	.bubble-menu button:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.bubble-menu button.active {
		background: rgba(255, 255, 255, 0.25);
		color: #fff;
	}

	.bubble-divider {
		width: 1px;
		height: 16px;
		background: rgba(255, 255, 255, 0.2);
		margin: 0 2px;
	}

	/* ── Editor wrapper ── */
	.editor-wrapper {
		border: 1px solid var(--color-border-divider);
		border-radius: 10px;
		background: var(--color-bg-surface);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.editor-wrapper:focus-within {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary-500) 15%, transparent);
	}

	/* ── Toolbar ── */
	.toolbar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 2px;
		padding: 6px 10px;
		border-bottom: 1px solid var(--color-border-divider);
		background: var(--color-bg-body);
	}

	.toolbar.hidden {
		visibility: hidden;
	}

	.toolbar-group {
		display: flex;
		align-items: center;
		gap: 1px;
	}

	.toolbar-divider {
		width: 1px;
		height: 20px;
		background: var(--color-border-divider);
		margin: 0 4px;
	}

	.toolbar-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px 7px;
		border-radius: 6px;
		color: var(--color-text-muted);
		transition:
			background 0.12s,
			color 0.12s;
	}

	.toolbar-btn:hover:not(:disabled) {
		background: var(--color-primary-50);
		color: var(--color-primary-700);
	}

	.toolbar-btn.active {
		background: var(--color-primary-100);
		color: var(--color-primary-700);
	}

	.toolbar-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	/* ── Editor content ── */
	.editor-content {
		padding: 1.25rem 1.5rem;
		min-height: 240px;
		cursor: text;
	}

	/* Tiptap prose styles */
	.editor-content :global(.tiptap) {
		outline: none;
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--color-text-body);
	}

	.editor-content :global(.tiptap > * + *) {
		margin-top: 0.75em;
	}

	.editor-content :global(.tiptap h1) {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--color-text-heading);
		line-height: 1.3;
	}

	.editor-content :global(.tiptap h2) {
		font-size: 1.35rem;
		font-weight: 600;
		color: var(--color-text-heading);
		line-height: 1.35;
	}

	.editor-content :global(.tiptap h3) {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-text-heading);
	}

	.editor-content :global(.tiptap strong) {
		font-weight: 600;
		color: var(--color-text-heading);
	}

	.editor-content :global(.tiptap code) {
		background: var(--color-primary-50);
		color: var(--color-primary-700);
		border-radius: 4px;
		padding: 0.15em 0.4em;
		font-size: 0.875em;
		font-family: 'Fira Code', 'Cascadia Code', monospace;
	}

	.editor-content :global(.tiptap pre) {
		background: var(--color-text-heading);
		color: #e2e8f0;
		border-radius: 8px;
		padding: 1rem 1.25rem;
		overflow-x: auto;
	}

	.editor-content :global(.tiptap pre code) {
		background: none;
		color: inherit;
		padding: 0;
		font-size: 0.875rem;
	}

	.editor-content :global(.tiptap blockquote) {
		border-left: 3px solid var(--color-primary-400);
		padding-left: 1rem;
		color: var(--color-text-muted);
		font-style: italic;
	}

	.editor-content :global(.tiptap ul) {
		padding-left: 1.5rem;
		list-style: disc;
	}

	.editor-content :global(.tiptap ol) {
		padding-left: 1.5rem;
		list-style: decimal;
	}

	.editor-content :global(.tiptap li + li) {
		margin-top: 0.3em;
	}

	.editor-content :global(.tiptap hr) {
		border: none;
		border-top: 1px solid var(--color-border-divider);
		margin: 1.5rem 0;
	}

	.editor-content :global(.tiptap a) {
		color: var(--color-primary-600);
		text-decoration: underline;
	}

	.editor-wrapper.full-page {
		border: none;
		border-radius: 0;
		border-top: 1px solid var(--color-border-divider);
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.editor-wrapper.full-page .toolbar {
		border-radius: 0;
	}

	.editor-wrapper.full-page .editor-content {
		flex: 1;
		overflow-y: auto;
		min-height: unset;
	}
	.editor-content :global(.tiptap p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: var(--color-text-muted);
		pointer-events: none;
		height: 0;
	}
</style>
