import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {

  constructor(private readonly imageService: ImageService) {}


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

  @Get('links') // New endpoint to get all uploaded file links.
  getAllFileLinks() {
    return "uploadedFileLinks";
  }
}
