import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      User: {
        loggedIn: false,
        username: null,
        guest: false,
        setLoggedIn: (loggedIn) =>
          set((state) => ({ User: { ...state.User, loggedIn } })),
        setUsername: (username) =>
          set((state) => ({ User: { ...state.User, username } })),
        setGuest: (guest) =>
          set((state) => ({ User: { ...state.User, guest } })),
      },
      Auth: {
        guest: false,
        error: null,
        showLogin: false,
        showGuide: false,
        loading: false,
        setGuide: (showGuide) =>
          set((state) => ({ Auth: { ...state.Auth, showGuide } })),
        setError: (error) =>
          set((state) => ({ Auth: { ...state.Auth, error } })),
        setShowLogin: (showLogin) =>
          set((state) => ({ Auth: { ...state.Auth, showLogin } })),
        setLoading: (loading) =>
          set((state) => ({ Auth: { ...state.Auth, loading } })),
        setGuest: (guest) =>
          set((state) => ({ Auth: { ...state.Auth, guest } })),
      },
      Music: {
        searching: false,
        musicID: null,
        spotifyID: null,
        albumID: null,
        artistID: null,
        image: null,
        artist: null,
        title: null,
        album: null,
        duration: null,
        setSearching: (searching) =>
          set((state) => ({ Music: { ...state.Music, searching } })),
        setMusicID: (id) =>
          set((state) => ({ Music: { ...state.Music, musicID: id } })),
        setSpotifyID: (id) =>
          set((state) => ({ Music: { ...state.Music, spotifyID: id } })),
        setAlbumID: (id) =>
          set((state) => ({ Music: { ...state.Music, albumID: id } })),
        setArtistID: (id) =>
          set((state) => ({ Music: { ...state.Music, artistID: id } })),
        setImage: (image) =>
          set((state) => ({ Music: { ...state.Music, image } })),
        setArtist: (artist) =>
          set((state) => ({ Music: { ...state.Music, artist } })),
        setTitle: (title) =>
          set((state) => ({ Music: { ...state.Music, title } })),
        setAlbum: (album) =>
          set((state) => ({ Music: { ...state.Music, album } })),
        setDuration: (duration) =>
          set((state) => ({ Music: { ...state.Music, duration } })),
      },
      Lyrics: {
        showLyrics: false,
        lyrics: null,
        setShowLyrics: (showLyrics) =>
          set((state) => ({ Lyrics: { ...state.Lyrics, showLyrics } })),
        setLyrics: (lyrics) =>
          set((state) => ({ Lyrics: { ...state.Lyrics, lyrics } })),
      },
      Player: {
        timestamp: 0,
        currentTrackIndex: 0,
        lyricsSeek: 0,
        lyricsScrolled: false,
        actionsBlocked: false,
        setActionsBlocked: (actionsBlocked) =>
          set((state) => ({ Player: { ...state.Player, actionsBlocked } })),
        setTimestamp: (timestamp) =>
          set((state) => ({ Player: { ...state.Player, timestamp } })),
        setCurrentTrackIndex: (currentTrackIndex) =>
          set((state) => ({
            Player: { ...state.Player, currentTrackIndex },
          })),
        setLyricsSeek: (lyricsSeek) =>
          set((state) => ({ Player: { ...state.Player, lyricsSeek } })),
        setLyricsScrolled: (lyricsScrolled) =>
          set((state) => ({ Player: { ...state.Player, lyricsScrolled } })),
      },
      Search: {
        tracks: null,
        albums: null,
        artists: null,
        searching: false,
        searchOpen: false,
        setTracks: (tracks) =>
          set((state) => ({ Search: { ...state.Search, tracks } })),
        setAlbums: (albums) =>
          set((state) => ({ Search: { ...state.Search, albums } })),
        setArtists: (artists) =>
          set((state) => ({ Search: { ...state.Search, artists } })),
        setSearching: (searching) =>
          set((state) => ({ Search: { ...state.Search, searching } })),
        setSearchOpen: (searchOpen) =>
          set((state) => ({ Search: { ...state.Search, searchOpen } })),
      },
      Tracklist: {
        tracks: null,
        setTracks: (tracks) =>
          set((state) => ({ Tracklist: { ...state.Tracklist, tracks } })),
      },
      TrackOrder: {
        showTrackOrder: false,
        setShowTrackOrder: (showTrackOrder) =>
          set((state) => ({
            TrackOrder: { ...state.TrackOrder, showTrackOrder },
          })),
      },
      NewReleases: {
        newReleases: null,
        color: null,
        setNewReleases: (newReleases) =>
          set((state) => ({
            NewReleases: { ...state.NewReleases, newReleases },
          })),
        setColor: (color) =>
          set((state) => ({ NewReleases: { ...state.NewReleases, color } })),
      },
      TopTracks: {
        topTracks: null,
        setTopTracks: (topTracks) =>
          set((state) => ({ TopTracks: { ...state.TopTracks, topTracks } })),
      },
      Genres: {
        genres: null,
        selectedGenre: null,
        tracks: null,
        tracksLoading: false,
        tracksOpen: false,
        setGenres: (genres) =>
          set((state) => ({ Genres: { ...state.Genres, genres } })),
        setSelectedGenre: (selectedGenre) =>
          set((state) => ({
            Genres: { ...state.Genres, selectedGenre },
          })),
        setGenreTracks: (tracks) =>
          set((state) => ({ Genres: { ...state.Genres, tracks } })),
        setTracksLoading: (tracksLoading) =>
          set((state) => ({ Genres: { ...state.Genres, tracksLoading } })),
        setTracksOpen: (tracksOpen) =>
          set((state) => ({ Genres: { ...state.Genres, tracksOpen } })),
      },
      Album: {
        data: null,
        tracks: null,
        albumLoading: false,
        setAlbumData: (data) =>
          set((state) => ({ Album: { ...state.Album, data } })),
        setAlbumTracks: (tracks) =>
          set((state) => ({ Album: { ...state.Album, tracks } })),
        setAlbumLoading: (albumLoading) =>
          set((state) => ({ Album: { ...state.Album, albumLoading } })),
      },
      Artist: {
        data: null,
        toptracks: null,
        albums: null,
        loading: false,
        setLoading: (loading) =>
          set((state) => ({ Artist: { ...state.Artist, loading } })),
        setArtistData: (data) =>
          set((state) => ({ Artist: { ...state.Artist, data } })),
        setArtistTopTracks: (toptracks) =>
          set((state) => ({ Artist: { ...state.Artist, toptracks } })),
        setArtistAlbums: (albums) =>
          set((state) => ({ Artist: { ...state.Artist, albums } })),
      },
      RecentlyPlayed: {
        loading: true,
        albums: null,
        tracks: null,
        changed: true,
        setLoading: (loading) =>
          set((state) => ({ RecentlyPlayed: { ...state.RecentlyPlayed, loading } })),
        setAlbums: (albums) =>
          set((state) => ({ RecentlyPlayed: { ...state.RecentlyPlayed, albums } })),
        setTracks: (tracks) =>
          set((state) => ({ RecentlyPlayed: { ...state.RecentlyPlayed, tracks } })),
        setChanged: (changed) =>
          set((state) => ({ RecentlyPlayed: { ...state.RecentlyPlayed, changed } })),
      },
      Favorites: {
        loadingTracks: true,
        loadingAlbums: true,
        tracks: null,
        albums: null,
        trackIDs: null,
        albumIDs: null,
        changedAlbums: true,
        changedTracks: true,
        setLoadingTracks: (loadingTracks) =>
          set((state) => ({ Favorites: { ...state.Favorites, loadingTracks } })),
        setLoadingAlbums: (loadingAlbums) =>
          set((state) => ({ Favorites: { ...state.Favorites, loadingAlbums } })),
        setTracks: (tracks) =>
          set((state) => ({ Favorites: { ...state.Favorites, tracks } })),
        setAlbums: (albums) =>
          set((state) => ({ Favorites: { ...state.Favorites, albums } })),
        setTrackIDs: (trackIDs) =>
          set((state) => ({ Favorites: { ...state.Favorites, trackIDs } })),
        setAlbumIDs: (albumIDs) =>
          set((state) => ({ Favorites: { ...state.Favorites, albumIDs } })),
        setChangedAlbums: (changedAlbums) =>
          set((state) => ({ Favorites: { ...state.Favorites, changedAlbums } })),
        setChangedTracks: (changedTracks) =>
          set((state) => ({ Favorites: { ...state.Favorites, changedTracks } })), 
      },
      TrackCorrection: {
        status: null,
        message: null,
        showCorrection: false,
        loading: false,
        setLoading: (loading) =>
          set((state) => ({ TrackCorrection: { ...state.TrackCorrection, loading } })),
        setShowCorrection: (showCorrection) =>
          set((state) => ({ TrackCorrection: { ...state.TrackCorrection, showCorrection } })),
        setStatus: (status) =>
          set((state) => ({ TrackCorrection: { ...state.TrackCorrection, status } })),
        setMessage: (message) =>
          set((state) => ({ TrackCorrection: { ...state.TrackCorrection, message } }))
      },
      Sidebar: {
        showSidebar: false,
        setShowSidebar: (showSidebar) =>
          set((state) => ({ Sidebar: { ...state.Sidebar, showSidebar } })),
      },
      Playlists: {
        id: null,
        name: null,
        username: null,
        trackNo: null,
        tracks: null,
        isPublic: false,  
        showCreatePlaylist: false,
        showAddToPlaylist: false,
        addToPlaylistID: null,
        addToPlaylistTitle: null,
        addToPlaylistLoading: false,
        addToPlaylistMessage: null,
        playlists: null,
        publicPlaylists: null,
        loadingPlaylistData: false,
        loading: false,
        setPublicPlaylists: (publicPlaylists) =>
          set((state) => ({ Playlists: { ...state.Playlists, publicPlaylists } })),
        setLoading: (loading) =>
          set((state) => ({ Playlists: { ...state.Playlists, loading } })),
        setLoadingPlaylistData: (loadingPlaylistData) =>
          set((state) => ({ Playlists: { ...state.Playlists, loadingPlaylistData } })),
        setPlaylists: (playlists) =>
          set((state) => ({ Playlists: { ...state.Playlists, playlists } })),
        setShowCreatePlaylist: (showCreatePlaylist) =>
          set((state) => ({ Playlists: { ...state.Playlists, showCreatePlaylist } })),
        setID: (id) => set((state) => ({ Playlists: { ...state.Playlists, id } })),
        setName: (name) => set((state) => ({ Playlists: { ...state.Playlists, name } })),
        setUsername: (username) =>
          set((state) => ({ Playlists: { ...state.Playlists, username } })),
        setTracks: (tracks) =>
          set((state) => ({ Playlists: { ...state.Playlists, tracks } })),
        setIsPublic: (isPublic) =>
          set((state) => ({ Playlists: { ...state.Playlists, isPublic } })),        
        setTrackNo: (trackNo) =>
          set((state) => ({ Playlists: { ...state.Playlists, trackNo } })),
        setShowAddToPlaylist: (showAddToPlaylist) =>
          set((state) => ({ Playlists: { ...state.Playlists, showAddToPlaylist } })),
        setAddToPlaylistID: (addToPlaylistID) =>
          set((state) => ({ Playlists: { ...state.Playlists, addToPlaylistID } })),
        setAddToPlaylistTitle: (addToPlaylistTitle) =>
          set((state) => ({ Playlists: { ...state.Playlists, addToPlaylistTitle } })),
        setAddToPlaylistLoading: (addToPlaylistLoading) =>
          set((state) => ({ Playlists: { ...state.Playlists, addToPlaylistLoading } })),
        setAddToPlaylistMessage: (addToPlaylistMessage) =>
          set((state) => ({ Playlists: { ...state.Playlists, addToPlaylistMessage } })),
      },
      APICheck: {
        status: false,
        setStatus: (status) =>
          set((state) => ({ APICheck: { ...state.APICheck, status } })),
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        User: {
          loggedIn: state.User.loggedIn,
          username: state.User.username,
          guest: state.User.guest
        }
      }),
    }
  )
);

export default useStore;
