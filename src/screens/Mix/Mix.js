import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectMix from '../../selectors/selectMix';
import selectMixStatus from '../../selectors/selectMixStatus';
import selectMixFromQuery from '../../selectors/selectMixFromQuery';
import fetchMix from '../../actions/fetchMix';
import { Helmet } from 'react-helmet';
import he from 'he';
import Aside from '../../components/Aside';
import MixDetails from '../../components/MixDetails';
import MixBody from '../../components/MixBody';
import MixComments from '../../components/MixComments';
import NotFound from '../../screens/NotFound';
import styles from './Mix.module.css';
import MetaTags from '../../components/MetaTags';

const Mix = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const cache = useSelector(selectMixFromQuery(slug));
  const mix = useSelector(selectMix(slug));
  const statusText = useSelector(selectMixStatus);

  const {
    id,
    content,
    description,
    title,
    artists,
    genres,
    tags,
    published,
    poster,
    thumbnail,
    plays,
    downloads,
    duration,
    quality,
    fileSize,
    comments
  } = cache.id ? cache : mix.id ? mix : {};

  useEffect(() => {
    if (!id) {
      const action = fetchMix(slug);
      dispatch(action);
    }
  }, [id, slug, dispatch]);

  if (statusText !== null) return <NotFound />;

  if (!id) return null;

  return (
    <div className={styles.root}>
      <MetaTags
        title={`${he.decode(artists.map(({ name }) => name).join(', '))} - ${title} | Tjoonz.com`}
        description={description}
        canonicalUrl={`https://www.tjoonz.com/mix/${slug}/`}
      />
      <Aside>
        <MixDetails
          id={id}
          slug={slug}
          thumbnail={thumbnail}
          poster={poster}
          published={published}
          artists={artists}
          title={title}
          genres={genres}
          tags={tags}
          duration={duration}
          description={description}
          plays={plays}
          downloads={downloads}
          quality={quality}
          fileSize={fileSize}
        />
      </Aside>
      <Aside>
        <MixBody content={content} />
      </Aside>
      <Aside>
        <MixComments comments={comments} id={id} />
      </Aside>
    </div>
  );
};

export default Mix;
