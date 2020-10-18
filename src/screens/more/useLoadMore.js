import {useEffect, useState} from 'react';
import {loadMedia} from '../../data/Repository';

export default (category) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadNextPage = async () => {
    console.log('loadMoreData: ');
    await loadMore(page + 1);
    setPage(page + 1);
  };

  const loadMore = async (p) => {
    setLoading(true);
    console.log(`loadMore: page: ${p}, category: ${category}`);
    const response = await loadMedia(category, p);
    setLoading(false);
    setItems([...items, ...response]);
  };

  useEffect(() => {
    loadMore(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [items, loadNextPage, loading];
};
