import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
  Body,
  UseInterceptors,
  UploadedFile,
  NotAcceptableException,
  Res
} from '@nestjs/common';
import { BookService } from './book.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { BookDTO } from './dto/book.dto';
import { BookEntity } from './entity/book.entity';
import { JwtAuthGuard } from 'src/lib/jwt.guard';
import * as path from "path";

@Controller("book")
@ApiTags("book")
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: path.resolve(__dirname, '..', '..', '..', 'uploads'),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}.jpg`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!/\.(jpg|jpeg|png)$/.exec(file.originalname)) {
          return cb(new NotAcceptableException('Only jpg, jpeg, png files are allowed!'), false);
        }
        cb(null, true);
      },
    })
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a book with an image file',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        description: { type: 'string', nullable: true },
        image: { type: 'string', format: 'binary' },
      },
      required: ['title', 'author', 'image'],
    },
  })
  @ApiCreatedResponse({ type: Object })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBookDTO: BookDTO
  ) {
    return await this.bookService.create(createBookDTO, file);
  }

  @ApiBearerAuth()
  @Get('image/:imgpath')
  async serveImage(@Param('imgpath') imgpath: string, @Res() res: Response) {
    return await this.bookService.serveImage(`uploads/${imgpath}`);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  async findAll() {
    const books = await this.bookService.getAllBooks();
    return books.map((book) => new BookEntity(book));
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity })
  async findByUser(@Param('uuid') id: string) {
    await this.bookService.getBookById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BookEntity })
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "../../../uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
        }
      }),
      fileFilter: (req, file, cb) => {
        if (!/\.(jpg|jpeg|png)$/.exec(file.originalname)) {
          return cb(new NotAcceptableException('Only jpg, jpeg, png files are allowed!'), false);
        }
        cb(null, true);
      }
    })
  )
  async updateBook(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateBook: BookDTO,
  ) {
    return await this.bookService.updateBook(id, updateBook, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity })
  async remove(@Param('id') id: string) {
    return await this.bookService.deleteBook(id);
  }
}