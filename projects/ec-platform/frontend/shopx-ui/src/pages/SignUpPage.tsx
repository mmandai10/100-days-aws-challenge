import { useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState<'signUp' | 'confirm'>('signUp');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      setStep('confirm');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmSignUp({ username: email, confirmationCode });
      alert('Registration complete! Please sign in.');
      window.location.href = '/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          {step === 'signUp' ? (
            <>
              <h1>Create account</h1>
              <p>Start shopping with ShopX</p>
            </>
          ) : (
            <>
              <h1>Verify email</h1>
              <p>Enter the code sent to your email</p>
            </>
          )}
        </div>

        {error && <div className="alert alert-error mb-lg">{error}</div>}

        {step === 'signUp' ? (
          <form onSubmit={handleSignUp} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="8+ characters"
              />
              <p className="text-sm text-muted mt-sm">
                Must include uppercase, lowercase, and numbers
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleConfirm} className="auth-form">
            <div className="alert alert-info mb-lg">
              Code sent to <strong>{email}</strong>
            </div>
            <div className="form-group">
              <label>Confirmation Code</label>
              <input
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
                placeholder="123456"
                style={{ textAlign: 'center', letterSpacing: '0.3em', fontSize: '1.25rem' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
