import React, { useState } from 'react';
import { sound } from '../utils/sound';

export default function ZenCatPavilion({ onDemoFill }) {
  const [catMood, setCatMood] = useState('resting'); // 'resting' | 'eating' | 'happy'
  const [bubbleText, setBubbleText] = useState('Rebahkan lelahmu sejenak di pendopo ini, wahai pengelana... (zzz)');
  const [teaCount, setTeaCount] = useState(0);
  const [flyingSparks, setFlyingSparks] = useState([]);

  const pesanKehangatanKucing = [
    'Wahai pengelana, taruhlah bebanmu sejenak. Di sini engkau aman dan selalu diterima apa adanya...',
    'Bila dunia luar terlalu bising dan melelahkan, biarkan dengkuran hangat ini menenangkan jiwamu...',
    'Setiap tetes keringat perjuanganmu hari ini sungguh berharga. Bernapaslah perlahan, semua akan baik-baik saja...',
    'Secangkir teh hangat, semilir bayu senja, dan dengkuran kecil ini... semuanya menyambut kepulanganmu.',
    'Tak perlu tergesa-gesa. Duduklah di sisiku, dengarkan gemerisik daun willow bernyanyi untukmu...',
  ];

  // Elus Si Oyen
  const handlePetCat = () => {
    sound.playCatMeow();
    setTimeout(() => sound.playCatPurr(), 140);

    const pesan = pesanKehangatanKucing[Math.floor(Math.random() * pesanKehangatanKucing.length)];
    setCatMood('happy');
    setBubbleText(pesan);

    const newSpark = {
      id: Date.now(),
      text: '🌸 HATI DAMAI SEJUK',
      x: Math.random() * 40 - 20,
    };
    setFlyingSparks((prev) => [...prev.slice(-3), newSpark]);

    setTimeout(() => {
      setCatMood('resting');
      setBubbleText('Purrrr... Tidurlah dalam damai yang menyejukkan...');
    }, 5500);
  };

  // Kasih Makan Ikan Segar
  const handleFeedFish = () => {
    sound.playNyam();
    setTimeout(() => sound.playCatMeow(), 280);

    setCatMood('eating');
    setBubbleText('🐟 Nyam nyam nyam! Mataku berkaca-kaca terharu... Kebaikan hatimu akan selalu diingat oleh alam semesta!');

    const newSpark = {
      id: Date.now(),
      text: '✨ BERKAH KEBAIKAN HATI',
      x: Math.random() * 30 - 15,
    };
    setFlyingSparks((prev) => [...prev.slice(-3), newSpark]);

    setTimeout(() => {
      setCatMood('happy');
      setBubbleText('Perutku kenyang, jiwaku tenang... Mari kita nikmati sore ini bersama!');
    }, 4500);
  };

  // Seruput Teh Hangat Longjing
  const handleSipTea = () => {
    sound.playTeaPour();
    sound.playPluck(3);
    setTeaCount((prev) => prev + 1);
    setBubbleText(`🍵 *Srupuuut*... Ahh, kehangatan teh meresap lembut ke relung dada. Hirupan ke-${teaCount + 1} yang menenangkan jiwa.`);
  };

  return (
    <div className="pavilion-cat-tea-stage">
      {/* Gelembung Kata Penuh Kasih Sayang & Keteduhan */}
      <div className="cat-talk-bubble poetic-glow">
        <span className="bubble-msg">{bubbleText}</span>
        <div className="bubble-arrow" />
      </div>

      <div className="cat-tea-actors-wrapper">
        {/* Kucing Si Oyen dengan Nafas Watercolor */}
        <div
          className={`interactive-cat-card ${catMood}`}
          onClick={handlePetCat}
          title="Sentuh lembut Si Oyen untuk merasakan ketenangannya..."
        >
          {flyingSparks.map((item) => (
            <span
              key={item.id}
              className="paw-floating-bubble soul-sparkle"
              style={{ left: `calc(50% + ${item.x}px)` }}
            >
              {item.text}
            </span>
          ))}

          {/* Vektor Kucing Seni Lukis Tinta Tradisional */}
          <svg
            className="cat-vector-graphic breathing-cat"
            viewBox="0 0 130 95"
            width="128"
            height="92"
          >
            {/* Bayangan Halus di Atas Kertas Sutra */}
            <ellipse cx="65" cy="85" rx="52" ry="7.5" fill="rgba(35, 26, 18, 0.45)" />

            {/* Ekor Mengayun Lembut */}
            <path
              className="cat-tail-anim"
              d="M 98 70 Q 123 55 113 34 Q 104 42 98 62"
              fill="#df8c3d"
              stroke="#5e330c"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Tubuh Kucing Gembul Hangat */}
            <ellipse cx="66" cy="64" rx="38" ry="24" fill="#e29346" />
            <path
              d="M 44 53 Q 62 47 75 66 Q 54 78 43 68 Z"
              fill="#fdfaf3"
              opacity="0.97"
            />
            {/* Belang Kucing Manis */}
            <path
              d="M 77 52 Q 93 54 91 68 Q 78 72 74 60 Z"
              fill="#3e2311"
              opacity="0.82"
            />

            {/* Kaki Depan Rileks */}
            <ellipse cx="43" cy="76" rx="9.5" ry="6.5" fill="#fdfaf3" />
            <ellipse cx="60" cy="76" rx="9.5" ry="6.5" fill="#fdfaf3" />

            {/* Kepala Kucing yang Menggemaskan */}
            <circle cx="37" cy="46" r="21.5" fill="#e29346" />
            <path
              d="M 37 33 Q 42 46 48 60 L 27 60 Q 32 46 37 33 Z"
              fill="#fdfaf3"
              opacity="0.97"
            />

            {/* Telinga Kiri */}
            <polygon points="20,33 14,10 35,24" fill="#e29346" stroke="#5e330c" strokeWidth="1.3" />
            <polygon points="21,30 17,14 32,24" fill="#fca5a5" />

            {/* Telinga Kanan */}
            <polygon points="39,24 51,9 55,33" fill="#3e2311" stroke="#251608" strokeWidth="1.3" />
            <polygon points="42,25 49,14 52,31" fill="#fca5a5" />

            {/* Mata Teduh Membawa Damai */}
            {catMood === 'happy' || catMood === 'eating' ? (
              <>
                <circle cx="30" cy="45" r="3.2" fill="#1c1610" />
                <circle cx="44" cy="45" r="3.2" fill="#1c1610" />
                <circle cx="31" cy="44" r="1.1" fill="#ffffff" />
                <circle cx="45" cy="44" r="1.1" fill="#ffffff" />
              </>
            ) : (
              <>
                <path d="M 26 47 Q 30 43 34 47" fill="none" stroke="#2c2016" strokeWidth="2.3" strokeLinecap="round" />
                <path d="M 40 47 Q 44 43 48 47" fill="none" stroke="#2c2016" strokeWidth="2.3" strokeLinecap="round" />
              </>
            )}

            {/* Hidung Merah Muda & Senyuman Lembut */}
            <polygon points="36,51 38,51 37,53" fill="#e11d48" />
            <path d="M 34 55 Q 37 57 37 53 Q 37 57 40 55" fill="none" stroke="#3e2311" strokeWidth="1.6" strokeLinecap="round" />

            {/* Kumis Kucing Halus */}
            <path d="M 22 49 L 8 48 M 22 52 L 8 54" stroke="#3e2311" strokeWidth="1.1" opacity="0.65" />
            <path d="M 52 49 L 66 48 M 52 52 L 66 54" stroke="#3e2311" strokeWidth="1.1" opacity="0.65" />

            {/* Rona Hangat di Pipi */}
            <circle cx="26" cy="53" r="4.2" fill="#f43f5e" opacity="0.4" />
            <circle cx="48" cy="53" r="4.2" fill="#f43f5e" opacity="0.4" />
          </svg>
        </div>

        {/* Cangkir Porselen Giok Panas Bersahaja */}
        <div
          className="interactive-tea-cup ceremonial-cup"
          onClick={handleSipTea}
          title="Seruput teh Longjing hangat penyegar batin..."
        >
          {/* Uap Mengepul Harum */}
          <div className="tea-hot-steams">
            <span className="steam-line line-1 golden-steam" />
            <span className="steam-line line-2 golden-steam" />
            <span className="steam-line line-3 golden-steam" />
          </div>

          <div className="celadon-green-cup">
            <div className="hot-tea-lake">
              <span className="bobbing-leaf">🍃</span>
            </div>
            <div className="cup-base-ring" />
          </div>
          <span className="cup-text-label">Teh Longjing Hangat</span>
        </div>

        {/* Cap Segel Merah Bertuah */}
        <div
          className="red-seal-action-box auspicious-seal"
          onClick={() => {
            sound.playPluck(4);
            onDemoFill();
          }}
          title="Klik Stempel Bertuah untuk mengisi identitas secara instan!"
        >
          <div className="red-seal-box-border">
            <span className="seal-word-top">BERKAH</span>
            <span className="seal-word-sub">KEDAI</span>
          </div>
          <span className="seal-desc-text">⚡ Auto Isi</span>
        </div>
      </div>

      {/* Aksi Penuh Kasih Sayang */}
      <div className="cat-quick-actions">
        <button
          type="button"
          className="heboh-action-btn pet-btn warmth-hover"
          onClick={handlePetCat}
        >
          🌸 Elus Si Oyen
        </button>
        <button
          type="button"
          className="heboh-action-btn feed-btn warmth-hover"
          onClick={handleFeedFish}
        >
          🐟 Kasih Makan Ikan
        </button>
        <button
          type="button"
          className="heboh-action-btn tea-btn warmth-hover"
          onClick={handleSipTea}
        >
          🍵 Seruput Teh Hangat
        </button>
      </div>
    </div>
  );
}
