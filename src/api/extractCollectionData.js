const extractCollectionData = ({ collection_id, name, count, mixes }) => ({
  id: Number(collection_id),
  name,
  count: Number(count),
  mixes: JSON.parse(mixes).map(id => Number(id))
});

export default extractCollectionData;
