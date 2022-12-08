import { categories } from '../constants';
import fetchNews from '../lib/fetchNews';

async function Homepage() {

  //fetch nexs data
  const news: NewsResponse = await fetchNews(categories.join(','));

  console.log(news);


  return <div>
    {/*News list*/}
  </div>
}

export default Homepage