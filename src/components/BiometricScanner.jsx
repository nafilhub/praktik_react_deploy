import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, CheckCircle2, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/sound';

export default function BiometricScanner({ onScanSuccess }) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('HOLD TO SCAN NEURAL PRINT');
  const [scanComplete, setScanComplete] = useState(false);
  const scanIntervalRef = useRef(null);

  const startScan = (e) => {
    e.preventDefault();
    if (scanComplete) return;
    setIsScanning(true);
    setStatusText('ALIGNING QUANTUM SCANNER...');
    sound.playScan();

    let current = 0;
    scanIntervalRef.current = setInterval(() => {
      current += 4;
      if (current % 20 === 0) {
        sound.playScan();
      }
      if (current >= 100) {
        clearInterval(scanIntervalRef.current);
        setProgress(100);
        setIsScanning(false);
        setScanComplete(true);
        setStatusText('NEURAL PATTERN VERIFIED');
        sound.playSuccess();
        setTimeout(() => {
          onScanSuccess();
        }, 600);
      } else {
        setProgress(current);
        if (current > 30 && current < 70) {
          setStatusText(`ANALYZING HASH: ${current}%`);
        } else if (current >= 70) {
          setStatusText(`SYNTHESIZING TOKEN: ${current}%`);
        }
      }
    }, 50);
  };

  const cancelScan = () => {
    if (scanComplete) return;
    if (isScanning) {
      clearInterval(scanIntervalRef.current);
      setIsScanning(false);
      setProgress(0);
      setStatusText('SCAN INTERRUPTED // HOLD CONTACT');
      sound.playError();
      setTimeout(() => {
        setStatusText('HOLD TO SCAN NEURAL PRINT');
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  return (
    <div className="biometric-box">
      <div className="biometric-top-info">
        <span className="biometric-label">BIOMETRIC FASTPASS</span>
        <span className={`biometric-status-indicator ${isScanning ? 'active' : scanComplete ? 'done' : ''}`}>
          {scanComplete ? 'AUTHORIZED' : isScanning ? 'SCANNING...' : 'READY'}
        </span>
      </div>

      <div
        className={`biometric-touchpad ${isScanning ? 'scanning' : ''} ${scanComplete ? 'complete' : ''}`}
        onMouseDown={startScan}
        onMouseUp={cancelScan}
        onMouseLeave={cancelScan}
        onTouchStart={startScan}
        onTouchEnd={cancelScan}
        title="Click and hold to authenticate via Neural Biometric Scan"
      >
        {/* Animated Cyber Ring Overlays */}
        <div className="touchpad-ring ring-outer" />
        <div className="touchpad-ring ring-inner" />

        {/* Laser Scanning Bar */}
        {isScanning && <div className="biometric-laser-line" />}

        {/* Fingerprint / Success Icon */}
        <div className="touchpad-icon">
          {scanComplete ? (
            <CheckCircle2 size={36} color="var(--primary)" />
          ) : (
            <Fingerprint size={38} className={isScanning ? 'pulse-icon' : ''} />
          )}
        </div>

        {/* Circular Progress Arc / HUD Percentage */}
        <div className="touchpad-hud-val">
          {scanComplete ? '100%' : `${progress}%`}
        </div>
      </div>

      <div className="biometric-feedback-text">
        <span>{statusText}</span>
      </div>
    </div>
  );
}
