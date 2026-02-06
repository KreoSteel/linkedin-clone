export { getAllPostsAction } from "./api/GET-posts-action";

// Schema and type exports
export { 
  postSchema, 
  createPostSchema, 
  updatePostSchema,
  postAuthorSchema,
  postCountsSchema,
  postWithAuthorSchema
} from "./model/post-schema";

export type { 
  TPost, 
  TPostWithAuthor, 
  TCreatePost,
  TUpdatePost,
  TPostAuthor,
  TPostCounts
} from "./model/post-schema";

// Constants
export { visibilityOptions, characterCount, maxCharacters, remainingCharacters } from "./model/const";
