import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  X,
  Wind,
  LogOut,
  RefreshCw,
  Coffee,
  Music,
  Heart
} from 'lucide-react';
import { sound } from './utils/sound';
import TeaGardenCanvas from './components/TeaGardenCanvas';
import ZenCatPavilion from './components/ZenCatPavilion';
import scrollBg from './assets/scroll_bg.jpg';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('scroll'); // 'scroll' | 'night'
  const [soundActive, setSoundActive] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [breezeMode, setBreezeMode] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  // Input Form
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  // Modal Lupa Sandi
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Jam Realtime
  const [hudTime, setHudTime] = useState('');

  // 3D Parallax Tilt
  const [tiltStyle, setTiltStyle] = useState({});
  const cardRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'night' ? 'night' : '');
  }, [theme]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setHudTime(now.toLocaleTimeString('id-ID', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Parallax Tilt
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      });
    }
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease',
    });
  };

  const toggleSound = () => {
    const next = sound.toggle();
    setSoundActive(next);
    if (next) sound.playPluck(2);
  };

  // Putar Musik Alunan Kecapi Guzheng Otomatis
  const handleToggleMelody = () => {
    const playing = sound.toggleMelody((active) => {
      setIsMusicPlaying(active);
    });
    setIsMusicPlaying(playing);
  };

  const switchTheme = (newTheme) => {
    sound.playPluck(1);
    setTheme(newTheme);
  };

  const switchMode = (newMode) => {
    sound.playPluck(0);
    setMode(newMode);
    setErrorMsg('');
  };

  // 1-Click Auto Isi Akun Demo
  const handleDemoFill = () => {
    sound.playPluck(4);
    setEmail('pengelana.teduh@tamanjiwa.id');
    setPassword('DamaiSejati#2026');
    setName('Pengelana Hati Yang Tenang');
    setConfirmPassword('DamaiSejati#2026');
    setErrorMsg('');
  };

  // Kalkulasi Kedamaian Sandi
  const checkRules = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const strengthScore = Object.values(checkRules).filter(Boolean).length;

  const getTingkatKesaktian = () => {
    if (!password) return { text: 'BELUM ADA KUNCI', color: '#7d6b54' };
    if (strengthScore <= 1) return { text: 'GELISAH (Masih Rentan)', color: '#ef4444' };
    if (strengthScore === 2) return { text: 'MULAI TENANG', color: '#f59e0b' };
    if (strengthScore === 3) return { text: 'HENING MENDALAM', color: '#3b82f6' };
    return { text: 'DAMAI SEJATI TINGKAT TINGGI!', color: '#16a34a' };
  };

  // Perayaan Konfeti Daun & Emas
  const triggerCelebration = () => {
    const colors = ['#dc2626', '#f59e0b', '#16a34a', '#d97706', '#ffffff', '#fb7185'];
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.65 },
      colors,
      disableForReducedMotion: true,
    });
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playPluck(2);
    setErrorMsg('');

    if (!email || !password) {
      sound.playError();
      setErrorMsg('Harap isi alamat email dan kata sandi rahasia Anda!');
      return;
    }

    if (mode === 'register') {
      if (!name) {
        sound.playError();
        setErrorMsg('Harap cantumkan nama panggilan Anda!');
        return;
      }
      if (password !== confirmPassword) {
        sound.playError();
        setErrorMsg('Konfirmasi kata sandi tidak cocok!');
        return;
      }
    }

    setIsLoading(true);
    setLoadingText('Menyeduh teh Longjing hangat penyegar batin...');

    setTimeout(() => {
      setLoadingText('Mengikis penat dan hiruk-pikuk dunia...');
    }, 700);

    setTimeout(() => {
      setLoadingText('Membuka gerbang pendopo dengan senyuman hangat...');
    }, 1400);

    setTimeout(() => {
      setIsLoading(false);
      sound.playZenBowl();
      triggerCelebration();
      setIsLoggedIn(true);
      setLoggedUser({
        name: mode === 'register' ? name : 'Sahabat Terkasih',
        email: email,
        title: 'Tamu Kehormatan Paviliun Teduh',
        sealId: `BERKAH_DAMAI_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      });
    }, 2100);
  };

  const handleLogout = () => {
    sound.playPluck(0);
    setIsLoggedIn(false);
    setPassword('');
    setConfirmPassword('');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    sound.playPluck(3);
    if (!forgotEmail) return;
    setForgotSuccess(true);
    sound.playZenBowl();
    setTimeout(() => {
      setForgotModalOpen(false);
      setForgotSuccess(false);
      setForgotEmail('');
    }, 2400);
  };

  return (
    <div
      className="app-viewport"
      ref={viewportRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Latar Belakang Lukisan Gulungan Kuno Asli */}
      <div
        className="scroll-painting-backdrop"
        style={{ backgroundImage: `url(${scrollBg})` }}
      />
      <div className="silk-parchment-overlay" />

      {/* 2. Kanvas Sinematik: Sinar Matahari, Lentera Teratai, Daun & Kupu-kupu */}
      <TeaGardenCanvas seasonMode={breezeMode} />

      {/* 3. Bait Puisi Penyejuk Jiwa di Sisi Kiri */}
      <aside className="painting-poem-column">
        <div className="poem-title-id">❖ Syair Pendopo Teduh ❖</div>
        <div className="poem-line-id">"Bila lelah langkahmu meniti hari,</div>
        <div className="poem-line-id">Singgahlah sejenak di pendopo sunyi.</div>
        <div className="poem-line-id">Hangatnya teh, semilir angin melati,</div>
        <div className="poem-line-id">Menghapus resah yang membebani hati."</div>
        <div className="poem-seal-pill">KEDAMAIAN ABADI</div>
      </aside>

      {/* 4. Stempel-Stempel Cap Merah Indonesia di Kanan Atas */}
      <div className="imperial-seals-cluster">
        <div className="seal-stamp-item seal-oval" title="Segel Kasih Sayang">KASIH</div>
        <div className="seal-stamp-item seal-gourd" title="Segel Kesejukan Jiwa">SEJUK</div>
        <div className="seal-stamp-item seal-square" title="Stempel Berkah Kedai">
          BERKAH<br />KEDAI
        </div>
      </div>

      {/* 5. Navbar / HUD Atas */}
      <header className="scroll-hud-bar">
        <div className="hud-brand-area">
          <div className="brand-seal-icon">PAVILIUN TEDUH</div>
          <div className="brand-names">
            <h2>KEDAI TEH SI OYEN</h2>
            <p>TEMPAT BERTEDUH BAGI JIWA YANG LELAH</p>
          </div>
        </div>

        <div className="hud-center-motto">
          <span className="motto-dot" />
          <span>PINTU SELALU TERBUKA UNTUKMU // {hudTime || '12:00:00'}</span>
        </div>

        <div className="hud-controls-area">
          {/* Tombol Putar Alunan Musik Kecapi Guzheng (Menyejukkan Jiwa) */}
          <button
            className={`music-play-btn ${isMusicPlaying ? 'playing' : ''}`}
            onClick={handleToggleMelody}
            title="Nyalakan / Matikan Musik Kecapi Tradisional"
          >
            <Music size={14} />
            <span>{isMusicPlaying ? 'Matikan Alunan' : '🎵 Putar Musik Kecapi'}</span>
          </button>

          {/* Tombol Tiupan Angin Taman */}
          <button
            className="hud-circle-btn"
            onClick={() => {
              sound.playPluck(1);
              setBreezeMode(!breezeMode);
            }}
            title="Hembusan Angin Semilir Bunga"
          >
            <Wind size={15} />
          </button>

          {/* Ganti Suasana */}
          <div className="theme-pill-box">
            <button
              className={`theme-pill-btn ${theme === 'scroll' ? 'active' : ''}`}
              onClick={() => switchTheme('scroll')}
              title="Suasana Kertas Sutra Klasik"
            >
              Klasik
            </button>
            <button
              className={`theme-pill-btn ${theme === 'night' ? 'active' : ''}`}
              onClick={() => switchTheme('night')}
              title="Suasana Malam Lentera Syahdu"
            >
              Malam
            </button>
          </div>

          {/* Efek Suara */}
          <button
            className="hud-circle-btn"
            onClick={toggleSound}
            title={soundActive ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
          >
            {soundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </header>

      {/* 6. Kartu Gulungan Sutra Login yang Menggetarkan Jiwa */}
      <main className="auth-scroll-viewport">
        <div className="album-leaf-card" ref={cardRef} style={tiltStyle}>
          {/* Ornamen Sudut Simpul Sutra */}
          <svg className="leaf-corner-knot knot-tl" viewBox="0 0 30 30">
            <path d="M 4 26 Q 4 4 26 4 Q 14 8 8 14 Q 4 20 4 26 Z" fill="var(--ink-secondary)" />
            <circle cx="10" cy="10" r="2.5" fill="var(--cinnabar-red)" />
          </svg>
          <svg className="leaf-corner-knot knot-tr" viewBox="0 0 30 30">
            <path d="M 4 26 Q 4 4 26 4 Q 14 8 8 14 Q 4 20 4 26 Z" fill="var(--ink-secondary)" />
            <circle cx="10" cy="10" r="2.5" fill="var(--cinnabar-red)" />
          </svg>
          <svg className="leaf-corner-knot knot-bl" viewBox="0 0 30 30">
            <path d="M 4 26 Q 4 4 26 4 Q 14 8 8 14 Q 4 20 4 26 Z" fill="var(--ink-secondary)" />
            <circle cx="10" cy="10" r="2.5" fill="var(--cinnabar-red)" />
          </svg>
          <svg className="leaf-corner-knot knot-br" viewBox="0 0 30 30">
            <path d="M 4 26 Q 4 4 26 4 Q 14 8 8 14 Q 4 20 4 26 Z" fill="var(--ink-secondary)" />
            <circle cx="10" cy="10" r="2.5" fill="var(--cinnabar-red)" />
          </svg>

          {/* Si Oyen Interaktif & Cangkir Teh Giok Panas Menghangatkan Jiwa */}
          <ZenCatPavilion onDemoFill={handleDemoFill} />

          {/* Tampilan Ketika Berhasil Masuk (Tiket Kepulangan) */}
          {isLoggedIn ? (
            <div className="ink-success-box">
              <div className="success-seal-round">
                <CheckCircle2 size={40} color="#fff6e0" />
              </div>
              <h2 className="success-title-cn">SELAMAT PULANG KE PELUKAN KEDAMAIAN!</h2>
              <p className="success-desc-cn">
                Engkau telah sampai di rumah. Secangkir teh hangat telah tersaji, dan dengkuran Si Oyen setia menemanimu.
              </p>

              <div className="guest-card-hud">
                <div className="guest-row">
                  <div className="guest-seal-avatar">
                    <Heart size={26} color="#fff" />
                  </div>
                  <div className="guest-details">
                    <h4>{loggedUser?.name}</h4>
                    <p>{loggedUser?.email}</p>
                    <p style={{ color: 'var(--cinnabar-red)', fontSize: '0.8rem', fontWeight: 800, marginTop: '3px' }}>
                      {loggedUser?.title}
                    </p>
                  </div>
                </div>
                <div className="token-seal-strip">
                  <span>Nomor Berkah: {loggedUser?.sealId}</span>
                  <span style={{ color: '#16a34a', fontWeight: 800 }}>[DIRANGKUL KEDAI TEH]</span>
                </div>
              </div>

              <button className="leave-garden-btn" onClick={handleLogout}>
                <LogOut size={16} />
                <span>PAMIT SEJENAK DARI PENDOPO</span>
              </button>
            </div>
          ) : (
            /* Tampilan Formulir Masuk / Daftar */
            <>
              <div className="album-header-text">
                <h1 className="album-main-title">
                  {mode === 'login' ? 'REBAHKAN LELAH & MASUK' : 'BERGABUNG SEBAGAI SAHABAT'}
                </h1>
                <p className="album-sub-title">
                  {mode === 'login'
                    ? 'Tuliskan namamu untuk menikmati kehangatan dan keheningan pendopo teh'
                    : 'Goreskan namamu di gulungan sutra agar kami selalu mengingat kepulanganmu'}
                </p>
              </div>

              {/* Pilihan Tab Masuk / Daftar */}
              <div className="scroll-tab-nav">
                <button
                  type="button"
                  className={`scroll-tab-item ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => switchMode('login')}
                >
                  MASUK KE PENDOPO
                </button>
                <button
                  type="button"
                  className={`scroll-tab-item ${mode === 'register' ? 'active' : ''}`}
                  onClick={() => switchMode('register')}
                >
                  DAFTAR SAHABAT
                </button>
              </div>

              {/* Notifikasi Pesan Kesalahan */}
              {errorMsg && (
                <div
                  style={{
                    background: 'rgba(166, 40, 40, 0.12)',
                    border: '1px solid rgba(166, 40, 40, 0.4)',
                    borderRadius: '8px',
                    padding: '0.65rem 0.9rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--cinnabar-red)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Nama jika Daftar */}
                {mode === 'register' && (
                  <div className="ink-form-field">
                    <label className="ink-field-label">
                      <span><span className="ink-label-accent">❖</span> NAMA PANGGILAN KASIH</span>
                    </label>
                    <div className="ink-input-container">
                      <User className="ink-input-icon" size={17} />
                      <input
                        type="text"
                        className="ink-brush-input"
                        placeholder="Contoh: Pengelana Hati Yang Tenang"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          sound.playPluck();
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Email / Akun */}
                <div className="ink-form-field">
                  <label className="ink-field-label">
                    <span><span className="ink-label-accent">❖</span> ALAMAT SUREL (EMAIL)</span>
                  </label>
                  <div className="ink-input-container">
                    <Mail className="ink-input-icon" size={17} />
                    <input
                      type="email"
                      className="ink-brush-input"
                      placeholder="pengelana@tamanjiwa.id"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        sound.playPluck();
                      }}
                    />
                    {email && (
                      <button
                        type="button"
                        className="ink-clear-btn"
                        onClick={() => setEmail('')}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Kata Sandi Rahasia */}
                <div className="ink-form-field">
                  <label className="ink-field-label">
                    <span><span className="ink-label-accent">❖</span> KUNCI RAHASIA HATI</span>
                  </label>
                  <div className="ink-input-container">
                    <Lock className="ink-input-icon" size={17} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="ink-brush-input"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        sound.playPluck();
                      }}
                    />
                    <button
                      type="button"
                      className="ink-clear-btn"
                      onClick={() => {
                        setShowPassword(!showPassword);
                        sound.playPluck(1);
                      }}
                      title={showPassword ? 'Sembunyikan Sandi' : 'Tampilkan Sandi'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {/* Meteran Kedamaian Sandi */}
                  {password && (
                    <div className="harmony-meter-box">
                      <div className="harmony-header">
                        <span>TINGKAT KETENANGAN KUNCI:</span>
                        <span style={{ color: getTingkatKesaktian().color }}>
                          {getTingkatKesaktian().text}
                        </span>
                      </div>
                      <div className="harmony-track">
                        <div className={`harmony-seg ${strengthScore >= 1 ? 'seg-1' : ''}`} />
                        <div className={`harmony-seg ${strengthScore >= 2 ? 'seg-2' : ''}`} />
                        <div className={`harmony-seg ${strengthScore >= 3 ? 'seg-3' : ''}`} />
                        <div className={`harmony-seg ${strengthScore >= 4 ? 'seg-4' : ''}`} />
                      </div>
                      <div className="harmony-rules">
                        <span className={`harmony-rule-item ${checkRules.length ? 'pass' : ''}`}>
                          {checkRules.length ? '✓' : '○'} Minimal 8 Huruf
                        </span>
                        <span className={`harmony-rule-item ${checkRules.hasUpper ? 'pass' : ''}`}>
                          {checkRules.hasUpper ? '✓' : '○'} Ada Huruf Besar
                        </span>
                        <span className={`harmony-rule-item ${checkRules.hasNumber ? 'pass' : ''}`}>
                          {checkRules.hasNumber ? '✓' : '○'} Ada Angka
                        </span>
                        <span className={`harmony-rule-item ${checkRules.hasSpecial ? 'pass' : ''}`}>
                          {checkRules.hasSpecial ? '✓' : '○'} Ada Simbol Unik
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Konfirmasi Kata Sandi jika Daftar */}
                {mode === 'register' && (
                  <div className="ink-form-field">
                    <label className="ink-field-label">
                      <span><span className="ink-label-accent">❖</span> PENEGASAN KUNCI RAHASIA</span>
                    </label>
                    <div className="ink-input-container">
                      <KeyRound className="ink-input-icon" size={17} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="ink-brush-input"
                        placeholder="Tuliskan kembali kunci rahasiamu"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          sound.playPluck();
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Baris Opsi: Ingat Saya & Lupa Sandi */}
                <div className="ink-options-row">
                  <label
                    className="ink-checkbox-wrap"
                    onClick={() => {
                      setRememberMe(!rememberMe);
                      sound.playPluck(1);
                    }}
                  >
                    <div className={`ink-checkbox-box ${rememberMe ? 'checked' : ''}`}>
                      {rememberMe && <CheckCircle2 size={13} strokeWidth={3} />}
                    </div>
                    <span>Ingat kepulanganku di kedai ini</span>
                  </label>

                  {mode === 'login' && (
                    <button
                      type="button"
                      className="forgot-cipher-btn"
                      onClick={() => {
                        sound.playPluck(3);
                        setForgotModalOpen(true);
                      }}
                    >
                      Lupa Kunci Rahasia?
                    </button>
                  )}
                </div>

                {/* Tombol Utama BENTANGKAN GULUNGAN & REBAHKAN LELAH */}
                <button
                  type="submit"
                  className="ink-submit-bar"
                  disabled={isLoading}
                >
                  <span className="btn-brush-shimmer" />
                  {isLoading ? (
                    <>
                      <RefreshCw size={17} style={{ animation: 'spin 1s linear infinite' }} />
                      <span>{loadingText}</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === 'login' ? '🏮 BENTANGKAN GULUNGAN & REBAHKAN LELAH 🍵' : '📜 RESMIKAN NAMA & JADILAH SAHABAT 🌸'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Opsi Masuk Rekanan */}
              <div className="ink-social-divider">
                <div className="ink-divider-rule" />
                <span className="ink-divider-text">ATAU MASUK DENGAN IDENTITAS LAIN</span>
              </div>

              <div className="ink-social-row">
                <button
                  type="button"
                  className="ink-social-btn"
                  onClick={() => sound.playPluck(0)}
                  title="Masuk lewat GitHub"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </button>

                <button
                  type="button"
                  className="ink-social-btn"
                  onClick={() => sound.playPluck(1)}
                  title="Masuk lewat Google"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.36 7.35 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27a7.18 7.18 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="ink-social-btn"
                  onClick={() => {
                    sound.playTeaPour();
                    alert('Tiket Kedai Teh Diterima dengan Penuh Kehangatan!');
                  }}
                  title="Masuk lewat Tiket Kedai Teh"
                >
                  <Coffee size={15} color="var(--cinnabar-red)" />
                  <span>Tiket Kedai</span>
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* 7. Modal Pemulihan Kata Sandi Penuh Harapan */}
      {forgotModalOpen && (
        <div className="ink-modal-backdrop" onClick={() => setForgotModalOpen(false)}>
          <div className="ink-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="ink-modal-head">
              <h3>BANTUAN MERPATI POS (Pemulihan Kunci)</h3>
              <button className="close-modal-btn" onClick={() => setForgotModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            {forgotSuccess ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <CheckCircle2 size={46} color="var(--cinnabar-red)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ marginBottom: '0.45rem', color: 'var(--ink-primary)', fontWeight: 800 }}>
                  MERPATI POS TELAH BERANGKAT!
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: '1.5' }}>
                  Surat pemulihan kunci rahasia telah diterbangkan menuju alamat email Anda. Periksalah dengan tenang dan lapang dada.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--ink-secondary)',
                    marginBottom: '1.35rem',
                    lineHeight: '1.55',
                  }}
                >
                  Jangan berkecil hati bila lupa. Tuliskan alamat emailmu di bawah ini, merpati pos kami akan segera mengantarkan surat pemulihan dengan selamat.
                </p>
                <div className="ink-form-field">
                  <div className="ink-input-container">
                    <Mail className="ink-input-icon" size={17} />
                    <input
                      type="email"
                      className="ink-brush-input"
                      placeholder="pengelana@tamanjiwa.id"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="ink-submit-bar" style={{ marginTop: '1rem' }}>
                  <span>TERBANGKAN MERPATI POS SEKARANG</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 8. Footer */}
      <footer className="scroll-footer-area">
        <span>PAVILIUN TEH KUNO & KUCING TEDUH</span>
        <span className="seal-dot-accent">❖</span>
        <span>Secangkir Teh Hangat di Bawah Pohon Rindang</span>
        <span className="seal-dot-accent">❖</span>
        <span>Persembahan untuk Jiwa-Jiwa Pengelana</span>
      </footer>
    </div>
  );
}
