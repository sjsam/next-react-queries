import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link';
import { iPost } from '../../../interfaces/iposts';
import styles from '../../../styles/Home.module.css';

const PostPage: NextPage<{ post: iPost }> = ({ post }) => {
    return (
       post?(<>
       <div className={styles.bibleVerse}>
        Life begins when fear ends.
           <p className={styles.bibleRef}>Osho</p>
       </div>
       <div className="blog">
           <h3>My blog posts</h3>
           <div className={styles.blogItem} key={post.id}>
               <span className={styles.title}>{post.title}</span>
               <span className={styles.description}>{post.body}</span>
           </div>
       </div>
       <Link href={'http://localhost:3000'}>Go to homepage</Link>
   </>):<div>Loading</div>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    let pid = context?.params?.pid;
    // console.log(`inside getStaticProps PID : ${pid}`)
    // Induce a delay
    let x = await new Promise<void>((res,rej)=>{setTimeout(()=>res(),5000)})
    let response:Response = await fetch(`https://jsonplaceholder.typicode.com/posts/${pid}`);
    let post:iPost = await response.json();
    return {
        props: {
            post
        },
    }
}

// Run only during build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Todo : Use React Query here.
  let response:Response = await fetch('https://jsonplaceholder.typicode.com/posts');
  let posts:iPost[] = await response.json();
    return {
        paths: posts.filter((p)=>(p.id%2==0)).map((p)=>({params:{pid:`${p.id}`}})) ,
        fallback: true
    }
}

export default PostPage
