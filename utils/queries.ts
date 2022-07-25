import { QueryFunctionContext } from "@tanstack/react-query";
import { iPost } from "../interfaces/iposts";

export const getPosts = async (context: QueryFunctionContext) => {
    // console.log('Inside getPosts');
    // console.log(context);
    let response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let posts: iPost[] = await response.json();
    return posts;
}
