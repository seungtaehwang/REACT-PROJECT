import React from 'react';
import WaferMap from './WaferMap';

const Modal = ({ config, onClose }) => {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3>Enlarged Wafer View (Size: {config.waferSize})</h3>
          <button onClick={onClose} style={styles.closeBtn}>
            X
          </button>
        </div>
        <div style={styles.mapBody}>
          {/* isPopup 프로퍼티를 전달하여 크게 그림 */}
          <WaferMap config={config} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '90%',
    maxHeight: '90%',
  },
  modalHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
  closeBtn: { border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' },
  mapBody: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
};

export default Modal;
