function favoriteSongs(playlist) {
  playlist.sort((a, b) => b.plays - a.plays);
  return [playlist[0].title, playlist[1].title];
}
