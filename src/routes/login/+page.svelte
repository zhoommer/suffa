<script lang="ts">
	import { authClient } from '$lib/auth-client';

	let loading = $state(false);
	let error = $state('');

	async function loginWithKeycloak() {
		loading = true;
		error = '';
		try {
			await authClient.signIn.oauth2({
				providerId: 'keycloak',
				callbackURL: '/'
			});
		} catch (e) {
			error = 'Giriş başarısız. Lütfen tekrar deneyin.';
			loading = false;
		}
	}
</script>

<div class="login-page">
	<div class="login-card">
		<div class="logo">S</div>
		<h1>Suffa'ya Hoşgeldiniz</h1>
		<p class="subtitle">Devam etmek için hesabınızla giriş yapın.</p>

		{#if error}
			<p class="error">{error}</p>
		{/if}

		<button class="login-btn" onclick={loginWithKeycloak} disabled={loading}>
			{#if loading}
				<span class="spinner"></span>
				Yönlendiriliyor...
			{:else}
				Keycloak ile Giriş Yap
			{/if}
		</button>
	</div>
</div>

<style>
	.login-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-bg-body);
		padding: 1rem;
	}

	.login-card {
		background: var(--color-bg-surface);
		border: 1px solid var(--color-border-divider);
		border-radius: 12px;
		padding: 2.5rem 2rem;
		width: 100%;
		max-width: 380px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.logo {
		width: 52px;
		height: 52px;
		border-radius: 12px;
		background-color: var(--color-primary-600);
		color: #fff;
		font-size: 1.5rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	h1 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--color-text-heading);
		margin: 0;
	}

	.subtitle {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		margin: 0 0 0.75rem;
	}

	.error {
		font-size: 0.85rem;
		color: #dc2626;
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
		width: 100%;
	}

	.login-btn {
		width: 100%;
		padding: 0.75rem 1.25rem;
		background-color: var(--color-primary-600);
		color: #fff;
		border: none;
		border-radius: 8px;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.login-btn:hover:not(:disabled) {
		background-color: var(--color-primary-700);
	}

	.login-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.4);
		border-top-color: #fff;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
