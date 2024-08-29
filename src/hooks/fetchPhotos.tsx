import { useCallback, useState } from "react";
import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";

type FetchState = {
  photos: Random[];
  isLoading: boolean;
  error: string | null;
};

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

function useFetchPhotos() {
  const [state, setState] = useState<FetchState>({
    photos: [],
    error: null,
    isLoading: false,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await unsplash.photos.getRandom({ count: 4 });
      if (res.errors) {
        throw new Error(res.errors[0]);
      }
      const photos = res.response;
      // make sure to get an array of photos
      if (photos && Array.isArray(photos)) {
        setState({ photos, isLoading: false, error: null });
      } else {
        throw new Error("Unknown response format");
      }
    } catch (err) {
      setState({
        photos: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "An unexpected error occured",
      });
    }
  }, []);

  return { fetchFn: fetch, state };
}

export default useFetchPhotos;
