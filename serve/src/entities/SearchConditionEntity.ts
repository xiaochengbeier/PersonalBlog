import { Type } from "class-transformer";
import { IsNotEmpty, validate } from "class-validator";

export  class SearchConditionEntity {
        key?:string = "";
        @IsNotEmpty({message:"每页尺寸不能为空"})
        @Type(()=>Number)
        size:number = 6;
        @IsNotEmpty({message:"页码件不能为空"})
        @Type(()=>Number)
        page:number=1;
        public validateThis?(isMis = false){
                return validate(this,{skipMissingProperties:isMis});
        }
}
