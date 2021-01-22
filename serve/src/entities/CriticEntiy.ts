import { Type } from "class-transformer";
import { IsNotEmpty, validate } from "class-validator";

export class CriticEntiy  {
    @Type(()=>Number)
    criticId?: number;

    @IsNotEmpty({message:"articleId 不能为空"})
    @Type(()=>Number)
    articleId: number;

    @IsNotEmpty({message:"content 不能为空"})
    @Type(()=>String)
    content: string;

    @IsNotEmpty({message:"talker 不能为空"})
    @Type(()=>Number)
    talker: number;

    @IsNotEmpty({message:"ctime 不能为空"})
    ctime: Date;

    @IsNotEmpty({message:"parent 不能为空"})
    @Type(()=>Number)
    parent: number;

    public validateThis(isSkip = false){
      return   validate(this,{skipMissingProperties:isSkip});
    }
}
