import { useState } from 'react';
import styles from './AuthPage.module.css';
import LogInForm from '../../components/LoginForm/LogInForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm';


export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className={styles.AuthPage}>
      <div>
        {/* <Logo /> */}
        <h3 onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? 'SIGN UP' : 'LOG IN'}
        </h3>
      </div>
      {showLogin ? (
        <LogInForm setUser={setUser} />
      ) : (
        <SignUpForm setUser={setUser} />
      )}
    </main>
  );
}