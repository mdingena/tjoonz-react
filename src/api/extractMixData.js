import he from 'he';

/**
 * Convert WordPress post response into Tjoonz mix data.
 * @param {Object} mix Post JSON with mix data.
 */
const extractMixData = ({
  id,
  slug,
  title: { rendered: title },
  content: { rendered: content },
  date_gmt: published,
  meta: {
    _yoast_wpseo_metadesc: description,
    _tjnz_plays: plays,
    _tjnz_downloads: downloads,
    _tjnz_duration: duration,
    _tjnz_bitrate: quality,
    _tjnz_filesize: fileSize
  },
  _embedded: {
    'wp:term': terms,
    'wp:featuredmedia': featuredImage,
    replies: comments
  }
}) => ({
  id,
  slug,
  content: he.decode(content),
  description: he.decode(description),
  title: he.decode(title),
  artists: extractTermsByTaxonomy(terms, 'artist'),
  genres: extractTermsByTaxonomy(terms, 'genre'),
  tags: extractTermsByTaxonomy(terms, 'post_tag'),
  published: toPublishDate(published),
  poster: extractArtworkSrc(featuredImage, 'full'),
  thumbnail: extractArtworkSrc(featuredImage, 'thumbnail'),
  plays,
  downloads,
  duration: toDuration(duration),
  quality: toKbps(quality),
  fileSize: toMegabytes(fileSize),
  comments: extractComments(comments)
});

export default extractMixData;

/**
 * Extracts WP Terms based on taxonomy name.
 * @param {Array} container Array with arrays of objects, which *might* contain taxonomy.
 * @param {String} taxonomy The taxonomy to find and extract.
 * @returns {Array} Array of terms matching the taxonomy.
 */
export const extractTermsByTaxonomy = (wpTerms, taxonomy) => {
  // Filters the wpTerms array to only contain the child array where its elements are objects with the needed taxonomy.
  // The filter function handles empty arrays as well as objects without a `taxonomy` property.
  const filtered = wpTerms.filter(terms => ((terms || [])[0] || {}).taxonomy === taxonomy);
  // Flatten Array.Array -> Array
  const terms = [...(filtered[0] || [])];
  return terms.map(({ id, name, slug }) => ({ id, name, slug }));
};

/**
 * Formats a given timestamp into the publish date format.
 * @param {String} dateGmt The timestamp in GMT timezone.
 * @returns {String} The timestamp in YYYY-MM-DD format.
 */
export const toPublishDate = dateGmt => {
  const date = new Date(`${dateGmt}Z`);
  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`;
};

/**
 * Formats a duration.
 * @param {Number} seconds The duration in seconds.
 * @returns {String} The duration in hh:mm:ss format.
 */
export const toDuration = seconds => {
  if (!seconds) return null;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds - (hours * 3600);
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - (minutes * 60);
  return `${hours}:${(100 + minutes).toString().substr(1)}:${(100 + seconds).toString().substr(1)}`;
};

/**
* Formats a bit rate.
* @param {Number} bps Rate in bits per second.
* @returns {Number} Rate in kilobits per second.
*/
export const toKbps = bps => {
  return Number((bps / 1000).toFixed(0));
};

/**
* Formats a file size.
* @param {Number} bytes File size in bytes.
* @returns {Number} File size in megabytes.
*/
export const toMegabytes = bytes => {
  return Math.ceil(bytes / 1048576);
};

/**
 * Extract the URL of the media.
 * @param {Object} media The WP Featured Media object from which to extract the URL.
 * @param {String} size The size of the image to return.
 * @returns {String} The URL of the matched media.
 */
export const extractArtworkSrc = (media, size = 'full') => {
  const url = (((((media || [])[0] || {}).media_details || {}).sizes || {})[size] || {}).source_url;
  return url || null;
};

export const extractComments = wpReplies => {
  const comments = (wpReplies || [])[0] || [];
  return comments.map(({
    id,
    author_name: authorName,
    author_url: authorUrl,
    author_avatar_urls: { 96: authorAvatar },
    date: published,
    content: { rendered: content }
  }) => ({
    id,
    authorName: he.decode(authorName),
    authorUrl,
    authorAvatar,
    published: toPublishDate(published),
    content: he.decode(content)
  }));
};
