// src/app/auth/login/page.js
'use client';

import { SigninForm } from '../../../components/auth/SigninForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SigninForm />
    </div>
  );
}