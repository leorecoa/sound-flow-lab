import { useReducer, useEffect, useRef, useCallback } from "react";

interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isLooping: boolean;
  error: string | null;
}

type AudioPlayerAction =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_PLAYBACK_RATE"; payload: number }
  | { type: "TOGGLE_LOOP" }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialState: AudioPlayerState = {
  isPlaying: false,
  isLoading: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  playbackRate: 1,
  isLooping: false,
  error: null,
};

function audioPlayerReducer(state: AudioPlayerState, action: AudioPlayerAction): AudioPlayerState {
  switch (action.type) {
    case "PLAY":
      return { ...state, isPlaying: true, error: null };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_PLAYBACK_RATE":
      return { ...state, playbackRate: action.payload };
    case "TOGGLE_LOOP":
      return { ...state, isLooping: !state.isLooping };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false, isPlaying: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export const useAudioPlayer = (audioUrl: string) => {
  const [state, dispatch] = useReducer(audioPlayerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();

  // Initialize audio element
  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      dispatch({ type: "SET_DURATION", payload: audio.duration });
      dispatch({ type: "SET_LOADING", payload: false });
    };

    const handleLoadStart = () => {
      dispatch({ type: "SET_LOADING", payload: true });
    };

    const handleError = () => {
      dispatch({ type: "SET_ERROR", payload: "Erro ao carregar áudio" });
    };

    const handleEnded = () => {
      dispatch({ type: "PAUSE" });
      if (!state.isLooping) {
        dispatch({ type: "SET_TIME", payload: 0 });
        audio.currentTime = 0;
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioUrl]);

  // Update loop property
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = state.isLooping;
    }
  }, [state.isLooping]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  // Update playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = state.playbackRate;
    }
  }, [state.playbackRate]);

  // Update time during playback
  useEffect(() => {
    if (state.isPlaying && audioRef.current) {
      const updateTime = () => {
        if (audioRef.current) {
          dispatch({ type: "SET_TIME", payload: audioRef.current.currentTime });
          animationFrameRef.current = requestAnimationFrame(updateTime);
        }
      };
      animationFrameRef.current = requestAnimationFrame(updateTime);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [state.isPlaying]);

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        dispatch({ type: "PLAY" });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Erro ao reproduzir áudio" });
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch({ type: "PAUSE" });
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch({ type: "SET_TIME", payload: time });
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: "SET_VOLUME", payload: Math.max(0, Math.min(1, volume)) });
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    dispatch({ type: "SET_PLAYBACK_RATE", payload: rate });
  }, []);

  const toggleLoop = useCallback(() => {
    dispatch({ type: "TOGGLE_LOOP" });
  }, []);

  return {
    ...state,
    play,
    pause,
    togglePlayPause,
    seek,
    setVolume,
    setPlaybackRate,
    toggleLoop,
    audioRef,
  };
};
