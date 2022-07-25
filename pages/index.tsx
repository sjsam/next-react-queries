import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { dehydrate,  QueryClient,  useQuery } from '@tanstack/react-query';
import { getPosts } from '../utils/queries';

const Home:NextPage<{name:string}> = ({name})=>{
  const { data } = useQuery(['posts'], {
    queryFn: getPosts,
    staleTime: 5000// 24 * 60 * 60 * 1000
  });

  // console.log(`From Home - posts : `)
  // console.log(data);
  let posts = data!;
  return (
    posts ? (<>
      <div className={styles.bibleVerse}>
      <p>My blog named {name}</p>
      Life begins when fear ends.
        <p className={styles.bibleRef}> - Osho</p>
      </div>
      <div className="blog">
        <h3>My blog posts</h3>
        {posts.filter((p) => p.id <= 10).map((post) => (<div className={styles.blogItem} key={post.id}>
          <span className={styles.title}>{post.id}.{post.title}</span>
          <span className={styles.description}>{`${post.body.substring(0, 20)}...`}<span className={styles.green}><Link href={`/posts/${post.id}`}>View post</Link></span></span>
        </div>))}
      </div>
    </>) : (<div>loading</div>)
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Todo : Use React Query here.
  const queryClient = new QueryClient();
  //(context: QueryFunctionContext) => Promise<TData>
  await queryClient.prefetchQuery(['posts'], {
    queryFn: getPosts,
    staleTime: 24 * 60 * 60 * 1000
  })
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      name:'My Blog'
    },
  }
}

export default Home;