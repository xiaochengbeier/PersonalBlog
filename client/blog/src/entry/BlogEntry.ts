export  interface BlogEntry  {
    blogId?: number;
    userId?: number;
    title: string;
    content: string;
    tag: string;
    likes?: number;
    ctime?: Date;
    reads?: number;
}
