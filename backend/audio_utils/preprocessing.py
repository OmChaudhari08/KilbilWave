
import librosa as lr
import numpy as np

def load_audio(file_path, target_sr=22050):
    audio, sr = lr.load(file_path, sr=target_sr)
    return audio, sr


def find_active_segment(audio, sr,duration_sec = 3):
    frame_size = 2048
    hop_length = 1024
    energy = np.array([np.sum(audio[i:i+2048]**2)  for i in range(0, len(audio)-frame_size+1, hop_length)])
    energy /= np.max(energy) + 1e-9

    frames_per_window = int((duration_sec * sr) / hop_length)


    window_energy = np.convolve(energy, np.ones(frames_per_window), mode='valid')
    start_frames = np.argmax(window_energy)
    start_sample = start_frames * hop_length
    end_sample = start_sample + int(duration_sec * sr)

    return start_sample, end_sample
def extract_features(y, sr):
    feats = []
    # MFCC mean + std
    mfcc = lr.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    feats.extend(np.mean(mfcc, axis=1))
    feats.extend(np.std(mfcc, axis=1))

    # Spectral features (mean + std)
    centroid = lr.feature.spectral_centroid(y=y, sr=sr)
    bandwidth = lr.feature.spectral_bandwidth(y=y, sr=sr)
    rolloff = lr.feature.spectral_rolloff(y=y, sr=sr)
    zcr = lr.feature.zero_crossing_rate(y)

    feats.append(np.mean(centroid))
    feats.append(np.std(centroid))
    feats.append(np.mean(bandwidth))
    feats.append(np.std(bandwidth))
    feats.append(np.mean(rolloff))
    feats.append(np.std(rolloff))
    feats.append(np.mean(zcr))
    feats.append(np.std(zcr))
    return np.array(feats)
def preprocess_for_model(file_path):
    fixed_sample = 22050 * 3
    y , sr = lr.load(file_path, sr=22050)
    if len(y) < fixed_sample:
        y = np.pad(y, (0, fixed_sample - len(y)), mode='constant')
    elif len(y) > fixed_sample:
        start , end = find_active_segment(y, sr)
        y = y[start:start+fixed_sample]
        if len(y) < fixed_sample:
            y = np.pad(y, (0, fixed_sample - len(y)), mode='constant')
    
    feats = extract_features(y,sr)
    return np.array(feats)