// files.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ImageService {
  constructor(
    // @InjectRepository(ImageEntity)
    // private readonly imageRepository: Repository<ImageEntity>,
  ) {}

//   async getImagesByUserEmail(userEmail: string) {
//     // Use TypeORM to fetch images associated with the user's email.
//     const images = await this.imageRepository.find({
//       where: {
//         user: {
//           email: userEmail,
//         },
//       },
//     });
//     return images;
//   }
}
