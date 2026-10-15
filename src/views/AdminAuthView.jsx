import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound
} from 'lucide-react';

const ACCOUNTS_KEY = 'transit-admin-accounts';
const ADMIN_ACCESS_CODE = '123';

const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');

async function hashPassword(password, salt) {
  const key = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const hash = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: Uint8Array.from(salt.match(/.{2}/g), (byte) => parseInt(byte, 16)),
      iterations: 310000,
      hash: 'SHA-256'
    },
    key,
    256
  );

  return toHex(hash);
}

function createSalt() {
  return toHex(window.crypto.getRandomValues(new Uint8Array(16)));
}

function readAccounts() {
  const storedAccounts = window.localStorage.getItem(ACCOUNTS_KEY);
  if (!storedAccounts) return [];

  const accounts = JSON.parse(storedAccounts);
  if (!Array.isArray(accounts)) {
    throw new Error('Les données des comptes sont invalides.');
  }
  return accounts;
}

export default function AdminAuthView({ onAuthenticate }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegistering = mode === 'register';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!window.crypto?.subtle) {
        throw new Error('La connexion sécurisée est indisponible. Ouvrez le site en HTTPS.');
      }

      const normalizedEmail = email.trim().toLowerCase();
      const accounts = readAccounts();

      if (isRegistering) {
        if (password.length < 8) {
          setError('Le mot de passe doit contenir au moins 8 caractères.');
          return;
        }
        if (password !== confirmation) {
          setError('La confirmation du mot de passe ne correspond pas.');
          return;
        }
        if (accounts.some((account) => account.email === normalizedEmail)) {
          setError('Un compte existe déjà avec cette adresse e-mail. Connectez-vous.');
          return;
        }

        const salt = createSalt();
        const account = {
          name: name.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
          salt,
          passwordHash: await hashPassword(password, salt)
        };
        window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
        setMode('login');
        setPassword('');
        setConfirmation('');
        setSecretCode('');
        setName('');
        setPhone('');
        setSuccessMessage('Inscription réussie. Connectez-vous avec votre adresse e-mail, votre mot de passe et le code secret.');
        return;
      }

      if (secretCode !== ADMIN_ACCESS_CODE) {
        setError('Code secret incorrect. Accès au tableau de bord refusé.');
        return;
      }

      const account = accounts.find((candidate) => candidate.email === normalizedEmail);
      if (!account || (await hashPassword(password, account.salt)) !== account.passwordHash) {
        setError('Adresse e-mail ou mot de passe incorrect.');
        return;
      }

      onAuthenticate({ name: account.name, email: account.email, phone: account.phone || '' });
    } catch (submissionError) {
      console.error('Échec de l’authentification administrateur :', submissionError);
      setError(submissionError.message || 'Impossible de traiter la demande. Réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setMode(isRegistering ? 'login' : 'register');
    setError('');
    setSuccessMessage('');
    setPassword('');
    setConfirmation('');
  };

  return (
    <main className="flex min-h-screen bg-white">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#245841] p-12 text-white lg:flex">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full border border-white/10" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Globe2 className="h-7 w-7 text-emerald-200" />
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight">Transit Madagascar</p>
            <p className="text-xs text-emerald-100/70">Administration logistique</p>
          </div>
        </div>

        <div className="relative max-w-lg">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-emerald-100">
            <ShieldCheck className="h-4 w-4" />
            Espace administrateur
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
            Gérez votre activité, en toute simplicité.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-emerald-100/75">
            Retrouvez vos commandes, expéditions et clients dans un seul espace dédié au transit vers Madagascar.
          </p>
          <div className="mt-9 flex items-center gap-3 text-xs font-medium text-emerald-100/80">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">🇲🇬</span>
            Chine, Europe & USA vers Madagascar
          </div>
        </div>

        <p className="relative text-xs text-emerald-100/50">Transit Madagascar · Espace de gestion</p>
      </section>

      <section className="flex min-h-screen flex-1 items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Globe2 className="h-6 w-6" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900">Transit Madagascar</p>
              <p className="text-xs text-slate-500">Administration logistique</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              {isRegistering ? 'Créer un compte' : 'Bienvenue'}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              {isRegistering ? 'Inscription admin' : 'Connexion admin'}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {isRegistering
                ? 'Créez votre compte pour accéder au tableau de bord.'
                : 'Connectez-vous pour accéder à votre tableau de bord.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {successMessage && !isRegistering && (
              <p role="status" className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-xs font-medium leading-5 text-emerald-800">
                {successMessage}
              </p>
            )}

            {isRegistering && (
              <label className="block text-xs font-semibold text-slate-700">
                Nom complet
                <span className="relative mt-1.5 block">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Votre nom"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </span>
              </label>
            )}

            {isRegistering && (
              <label className="block text-xs font-semibold text-slate-700">
                Téléphone
                <span className="relative mt-1.5 block">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+261 ..."
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </span>
              </label>
            )}

            <label className="block text-xs font-semibold text-slate-700">
              Adresse e-mail
              <span className="relative mt-1.5 block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </span>
            </label>

            {!isRegistering && (
              <label className="block text-xs font-semibold text-slate-700">
                Code secret administrateur
                <span className="relative mt-1.5 block">
                  <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    required
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    value={secretCode}
                    onChange={(event) => setSecretCode(event.target.value)}
                    placeholder="Saisissez le code secret"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </span>
              </label>
            )}

            <label className="block text-xs font-semibold text-slate-700">
              Mot de passe
              <span className="relative mt-1.5 block">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  minLength={isRegistering ? 8 : undefined}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={isRegistering ? '8 caractères minimum' : 'Votre mot de passe'}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-11 text-sm font-normal outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {isRegistering && (
              <label className="block text-xs font-semibold text-slate-700">
                Confirmer le mot de passe
                <span className="relative mt-1.5 block">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                    placeholder="Répétez votre mot de passe"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </span>
              </label>
            )}

            {error && (
              <p role="alert" className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting
                ? 'Veuillez patienter...'
                : isRegistering
                  ? 'Créer mon compte'
                  : 'Se connecter'}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isRegistering ? 'Vous avez déjà un compte ?' : 'Pas encore de compte ?'}
            <button
              type="button"
              onClick={switchMode}
              className="ml-1 cursor-pointer font-bold text-emerald-700 hover:text-emerald-800"
            >
              {isRegistering ? 'Se connecter' : "S'inscrire"}
            </button>
          </p>

          <p className="mt-8 rounded-xl bg-amber-50 px-3 py-2.5 text-[11px] leading-5 text-amber-800">
            Mode démonstration : les comptes sont enregistrés dans ce navigateur. Pour protéger réellement un tableau de bord en production, connectez cette interface à un serveur d’authentification.
          </p>
        </div>
      </section>
    </main>
  );
}
