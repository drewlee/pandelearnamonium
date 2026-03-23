function numberOfPhotos(photoSizeMb, hardDriveSizeGb) {
  return Math.floor((hardDriveSizeGb * 1000) / photoSizeMb);
}
