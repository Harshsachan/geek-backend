import { Controller, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from './image.service';
import * as fs from "fs";
import * as path from "path"

@Controller('image')
export class ImageController {

  constructor(private  imageService: ImageService) {}


  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file',{
    storage: diskStorage({
    destination:'./files',
    filename:(req,file,callback)=>{
      const uniqueSuffix = Date.now()+'-'+Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename=`${uniqueSuffix}${ext}`;
      callback(null,filename)
    },
  }),
}),)
async handleUpload(@UploadedFile() file: Express.Multer.File,) {
  return { originalname: file.originalname, filename: file.filename };
}

@Get("/links")
async getImageLinks() {
    try {
        // let filesPath: string = "path to files folder with / ending"
        // s="../../file"
        //let filesPath: string = "/Users/harshit.s/Documents/GitHub/geek-backend/files"
        let filesPath: string = path.join(__dirname,"../../files")
        //let filesPath: string = "/../../files"
        let images: any = fs.readdirSync(filesPath);
        return images;
    } catch (err) {
        console.log(err);
        return new HttpException('Some internal server error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


@Get("/images/:fileName")
async getFile( @Res() res: any, @Param("fileName") fileName: string) {
    try {
        // let filesPath: string = "path to files folder with / ending"
        let filesPath: string = path.join(__dirname,"../../files/")
        let imageStream = fs.createReadStream(filesPath+fileName);
        return imageStream.pipe(res);
    } catch (err) {
        console.log(err);
        return new HttpException('Some internal server error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
