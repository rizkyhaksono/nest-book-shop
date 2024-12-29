import * as path from "path";
import { join } from "path";
import * as fs from "fs";
import { unlink } from "fs";
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "src/lib/prisma.service";
import { BookDTO } from "./dto/book.dto";

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createBookDTO: BookDTO, file: Express.Multer.File) {
    const { title, author, description } = createBookDTO;

    const book = await this.prisma.book.create({
      data: {
        title,
        author,
        description,
        image: file.filename
      }
    });

    return {
      status: 201,
      data: book,
    };
  }

  async serveImage(imgpath: string) {
    return fs.createReadStream(join(process.cwd(), 'uploads', imgpath));
  }

  async getAllBooks() {
    const books = await this.prisma.book.findMany();
    return books.map((book) => {
      if (book.image) {
        const imageName = book.image.split('\\').pop();
        book.image = `${process.env.BASE_URL}/book/image/${imageName}`;
      }
      return book;
    })
  }

  async getBookById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!book) {
      throw new NotFoundException(`Book not found with id: ${id}`);
    }

    if (book.image) {
      const imageName = book.image.split('\\').pop();
      book.image = `${process.env.BASE_URL}/book/image/${imageName}`;
    }

    return book;
  }

  async updateBook(id: number, updateBookDTO: BookDTO, file: Express.Multer.File) {
    const { title, author, description } = updateBookDTO;

    const book = await this.prisma.book.findUnique({
      where: {
        id: id
      }
    });

    if (!book) {
      throw new NotFoundException(`Book not found with id: ${id}`);
    }

    if (!id) {
      throw new NotFoundException("id is required");
    }

    if (book.image) {
      const previousImage = join(
        process.cwd(),
        book.image.split('/').pop(),
      )
      try {
        fs.unlinkSync(previousImage);
      } catch (err) {
        console.error(err);
      }
    }

    const updatedBook = await this.prisma.book.update({
      where: {
        id: id
      },
      data: {
        title,
        author,
        description,
        image: file.path
      }
    });

    return {
      status: 200,
      data: updatedBook
    }
  }

  async deleteBook(id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!book) {
      throw new NotFoundException(`Book not found with id: ${id}`);
    }

    if (book.image) {
      const imagePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'uploads',
        book.image,
      );

      if (fs.existsSync(imagePath)) {
        unlink(imagePath, (err) => {
          if (err) {
            throw new NotFoundException(`The file ${book.image} does not exist.`);
          }
        });
      }
    }

    await this.prisma.book.delete({
      where: {
        id: parseInt(id)
      }
    });

    return book;
  }
}