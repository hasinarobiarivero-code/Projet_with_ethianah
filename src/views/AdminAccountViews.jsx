import React, { useState } from 'react';
import {
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  Save,
  ShieldCheck,
  UserRound
} from 'lucide-react';

export function AdminProfileView({ profile }) {
  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const profileFields = [
    { label: 'Nom complet', value: profile.name },
    { label: 'Adresse e-mail', value: profile.email },
    { label: 'Téléphone', value: profile.phone || 'Non renseigné' },
    { label: 'Fonction', value: 'Administrateur' }
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Mon profil</h1>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Informations du compte administrateur créé lors de votre inscription.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
            {initials || <UserRound className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">{profile.name}</h2>
            <p className="text-xs text-slate-500">Administrateur Transit</p>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {profileFields.map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-slate-50 px-4 py-3">
              <dt className="text-xs font-semibold text-slate-500">{label}</dt>
              <dd className="mt-1 break-words text-sm font-medium text-slate-800">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

export function AdminSecurityView({ showToast }) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    next: '',
    confirmation: ''
  });
  const [error, setError] = useState('');

  const updatePassword = (field, value) => {
    setPasswords((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passwords.next.length < 8) {
      setError('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (passwords.next !== passwords.confirmation) {
      setError('La confirmation ne correspond pas au nouveau mot de passe.');
      return;
    }

    setPasswords({ current: '', next: '', confirmation: '' });
    setError('');
    showToast('Les paramètres de sécurité ont été enregistrés.');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Sécurité du compte</h1>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Gérez votre mot de passe et les protections de votre compte administrateur.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="mb-5 flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <LockKeyhole className="h-4 w-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-slate-900">Changer le mot de passe</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-semibold text-slate-700">
            Mot de passe actuel
            <input
              required
              type="password"
              autoComplete="current-password"
              value={passwords.current}
              onChange={(event) => updatePassword('current', event.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 sm:max-w-md"
            />
          </label>
          <label className="block text-xs font-semibold text-slate-700">
            Nouveau mot de passe
            <input
              required
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={passwords.next}
              onChange={(event) => updatePassword('next', event.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 sm:max-w-md"
            />
            <span className="mt-1 block font-normal text-slate-400">8 caractères minimum.</span>
          </label>
          <label className="block text-xs font-semibold text-slate-700">
            Confirmer le nouveau mot de passe
            <input
              required
              type="password"
              autoComplete="new-password"
              value={passwords.confirmation}
              onChange={(event) => updatePassword('confirmation', event.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 sm:max-w-md"
            />
          </label>

          {error && <p role="alert" className="text-xs font-medium text-rose-600">{error}</p>}

          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-700"
          >
            <KeyRound className="h-4 w-4" />
            Mettre à jour le mot de passe
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="mb-4 flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-slate-900">Protection du compte</h2>
        </div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={twoFactorEnabled}
            onChange={(event) => setTwoFactorEnabled(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded-md text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            <span className="block text-xs font-semibold text-slate-800">
              Activer la vérification en deux étapes
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              Ajouter une confirmation supplémentaire lors de la connexion.
            </span>
          </span>
        </label>
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-4">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <div>
            <p className="text-xs font-semibold text-emerald-900">Session actuelle</p>
            <p className="mt-1 text-xs text-emerald-800">Cette session administrateur est active.</p>
          </div>
          <UserRound className="ml-auto h-4 w-4 shrink-0 text-emerald-600" />
        </div>
        <button
          type="button"
          onClick={() => showToast('Les paramètres de sécurité ont été enregistrés.')}
          className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Save className="h-4 w-4" />
          Enregistrer les paramètres
        </button>
      </section>
    </div>
  );
}
