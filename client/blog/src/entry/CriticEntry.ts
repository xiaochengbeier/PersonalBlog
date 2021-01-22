export interface CriticEntry {
    criticId?: number;
    articleId: number;
    content: string;
    talker: number;
    ctime: Date;
    parent?: number;
}
