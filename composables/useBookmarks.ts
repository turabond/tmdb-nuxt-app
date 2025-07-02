import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

export type Bookmark = {
  id: string | number;
  mediaId: number;
  mediaType: 'movie' | 'tv';
  title: string;
  vote_average: number;
  poster_path: string;
};

export const useBookmarks = () => {
  const { uid } = useCurrentUser();
  const { firebase } = useAuth();
  const db = firebase().db;

  const items = ref<Bookmark[]>([]);
  const loading = ref(true);
  let stop: (() => void) | null = null;

  const connect = () => {
    if (!uid.value) return;
    const col = collection(db, 'users', uid.value, 'bookmarks');

    stop = onSnapshot(
      col,
      { includeMetadataChanges: false },
      (snap) => {
        items.value = snap.docs.map(d => ({
          id: d.id,
          mediaId: d.data().mediaId,
          mediaType: d.data().mediaType,
          title: d.data().title,
          vote_average: d.data().vote_average,
          poster_path: d.data().poster_path,
        }));
        loading.value = false;
      },
      () => {
        loading.value = false;
      },
    );
  };

  const disconnect = () => {
    if (stop) stop();
    stop = null;
  };

  watch(
    uid,
    (v) => {
      disconnect();
      items.value = [];
      loading.value = !!v;
      if (v) connect();
    },
    { immediate: true },
  );

  onBeforeUnmount(disconnect);

  const addBookmark = async (media: Bookmark) => {
    if (!uid.value) throw new Error('Not authorized');
    const refDoc = doc(db, 'users', uid.value, 'bookmarks', media.mediaId.toString());
    await setDoc(refDoc, media, { merge: true });
  };

  const removeBookmark = async (docId: string | number) => {
    if (!uid.value) throw new Error('Not authorized');
    await deleteDoc(doc(db, 'users', uid.value, 'bookmarks', docId.toString()));
  };

  return { items, loading, addBookmark, removeBookmark };
};
