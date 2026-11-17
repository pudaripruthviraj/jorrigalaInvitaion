// Audio Player for Sita Kalyanam (Ranarangam)
// Automatically uses local sita_kalyanam.mp3 / seetha_kalyanam.mp3 if added under src/assets/audio/,
// otherwise streams the official Aditya Music YouTube track via YouTube IFrame Player API.

const localAudioFiles = import.meta.glob('../assets/audio/*.{mp3,m4a,ogg,wav}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const LOCAL_SITA_KALYANAM_URL =
  localAudioFiles['../assets/audio/sita_kalyanam.mp3'] ||
  localAudioFiles['../assets/audio/seetha_kalyanam.mp3'] ||
  '';

// Official Aditya Music release: "Seetha Kalyanam Full Video Song | Ranarangam"
const YOUTUBE_VIDEO_ID = 'Yi6EWl5xlRE';

type AudioListener = (isPlaying: boolean) => void;

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (vol: number) => void;
}

interface YTGlobal {
  Player: new (
    elementId: string,
    options: {
      height?: string | number;
      width?: string | number;
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YTPlayerInstance }) => void;
        onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
        onError?: () => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState?: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
  };
}

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
  }
}

class WeddingMusicPlayer {
  private audio: HTMLAudioElement | null = null;
  private ytPlayer: YTPlayerInstance | null = null;
  private ytReady: boolean = false;
  private pendingPlay: boolean = false;
  private isPlaying: boolean = false;
  private volume: number = 85;
  private listeners: Set<AudioListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      if (LOCAL_SITA_KALYANAM_URL) {
        this.initLocalAudio(LOCAL_SITA_KALYANAM_URL);
      } else {
        this.initYouTubePlayer();
      }
    }
  }

  private initLocalAudio(srcUrl: string) {
    if (this.audio) return;
    try {
      this.audio = new Audio();
      this.audio.src = srcUrl;
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = this.volume / 100;

      this.audio.addEventListener('playing', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });
    } catch (err) {
      console.warn('Audio initialization restricted:', err);
    }
  }

  private initYouTubePlayer() {
    if (typeof document === 'undefined') return;

    const mountPlayer = () => {
      if (this.ytPlayer || !window.YT?.Player) return;

      let container = document.getElementById('yt-wedding-music-player');
      if (!container) {
        container = document.createElement('div');
        container.id = 'yt-wedding-music-player';
        container.style.position = 'fixed';
        container.style.bottom = '0px';
        container.style.right = '0px';
        container.style.width = '1px';
        container.style.height = '1px';
        container.style.opacity = '0.001';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '-1';
        document.body.appendChild(container);
      }

      this.ytPlayer = new window.YT.Player('yt-wedding-music-player', {
        height: 1,
        width: 1,
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            this.ytReady = true;
            event.target.unMute();
            event.target.setVolume(this.volume);
            if (this.pendingPlay) {
              this.pendingPlay = false;
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === 1) {
              this.isPlaying = true;
              this.notifyListeners();
            } else if (event.data === 2) {
              this.isPlaying = false;
              this.notifyListeners();
            } else if (event.data === 0) {
              event.target.playVideo();
            }
          },
          onError: () => {
            this.isPlaying = false;
            this.pendingPlay = false;
            this.notifyListeners();
          },
        },
      });
    };

    if (window.YT?.Player) {
      mountPlayer();
      return;
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') {
        try {
          previousReady();
        } catch {
          // ignore
        }
      }
      mountPlayer();
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.isPlaying);
      } catch {
        // ignore
      }
    });
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start(): Promise<boolean> {
    if (this.audio) {
      return this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
          this.notifyListeners();
          return true;
        })
        .catch((err) => {
          console.warn('Audio playback error (will retry on user gesture):', err);
          this.isPlaying = false;
          this.notifyListeners();
          return false;
        });
    }

    this.pendingPlay = true;
    this.initYouTubePlayer();

    if (this.ytPlayer && this.ytReady) {
      try {
        this.ytPlayer.unMute();
        this.ytPlayer.setVolume(this.volume);
        this.ytPlayer.playVideo();
        this.pendingPlay = false;
        this.isPlaying = true;
        this.notifyListeners();
        return Promise.resolve(true);
      } catch (err) {
        console.warn('YouTube playback error:', err);
        return Promise.resolve(false);
      }
    }

    // Player is initializing; will auto-start as soon as onReady fires
    this.isPlaying = true;
    this.notifyListeners();
    return Promise.resolve(true);
  }

  public stop() {
    this.pendingPlay = false;

    if (this.audio) {
      try {
        this.audio.pause();
      } catch {
        // ignore
      }
    }

    if (this.ytPlayer && this.ytReady) {
      try {
        this.ytPlayer.pauseVideo();
      } catch {
        // ignore
      }
    }

    this.isPlaying = false;
    this.notifyListeners();
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return Promise.resolve(false);
    }
    return this.start();
  }

  public setVolume(val: number) {
    const normalized = Math.max(0, Math.min(1, val));
    this.volume = Math.round(normalized * 100);

    if (this.audio) {
      this.audio.volume = normalized;
    }
    if (this.ytPlayer && this.ytReady) {
      try {
        this.ytPlayer.setVolume(this.volume);
      } catch {
        // ignore
      }
    }
  }
}

export const weddingMusic = new WeddingMusicPlayer();
