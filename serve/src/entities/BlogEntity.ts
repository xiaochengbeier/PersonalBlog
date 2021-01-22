import {Type}from "class-transformer";
import { IsArray, IsDate, IsNotEmpty ,validate} from "class-validator";
import "reflect-metadata"
export default class BlogEntity  {
    @Type(()=>Number)
    blogId?: number;

    @IsNotEmpty({message:"userId不能为空"})
    @Type(()=>Number)
    userId: number;

    @IsNotEmpty({message:"title不能为空"})
    @Type(()=>String)
    title: string;

    @IsNotEmpty({message:"content不能为空"})
    @Type(()=>String)
    content: string;
    @IsNotEmpty({message:"tag不能为空"})
    @Type(()=>String)
    tag: string;

    likes?: number;
    @IsDate({message:"创建时间必须日期格式"})
    ctime: Date;
    reads?: number;
    /**
     * 校验当前对象数据
     * @param isSkipMissing 是否跳过校验为空的数据默认值 为 fasle 不跳过
     */
    public validateTthis(isSkipMissing=false){
       return validate(this,{skipMissingProperties:isSkipMissing});
    }
}
