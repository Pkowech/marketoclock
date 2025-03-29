import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FilterProductsDto } from '../dto/filter-products.dto';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { User } from '../users/entities/user.entity'; // Adjust path if needed

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User): Promise<Product> {
    const product = this.productRepository.create({
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      seller: user,
      category: { id: createProductDto.categoryId } as any,
    });

    const savedProduct = await this.productRepository.save(product);

    if (createProductDto.images && createProductDto.images.length > 0) {
      const productImages = createProductDto.images.map(url =>
        this.productImageRepository.create({ url, product: savedProduct }),
      );
      savedProduct.images = await this.productImageRepository.save(productImages);
    } else {
      savedProduct.images = [];
    }

    return savedProduct;
  }

  async findAll(filterProductsDto?: FilterProductsDto): Promise<{ products: Product[]; totalPages: number }> {
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.seller', 'seller')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images');

    if (filterProductsDto) {
      const { sort, search, userId } = filterProductsDto;
      if (search) query.where('product.name LIKE :search', { search: `%${search}%` });
      if (userId) query.andWhere('product.userId = :userId', { userId });
      if (sort === 'popular') query.orderBy('product.views', 'DESC');
    }

    const products = await query.getMany();
    return { products, totalPages: 1 };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['seller', 'category', 'images'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User): Promise<Product> {
    const product = await this.findOne(id);
    if (product.seller.id !== user.id) {
      throw new BadRequestException('You can only update your own products');
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string, user: User): Promise<void> {
    const product = await this.findOne(id);
    if (sort === 'popular') query.orderBy('product.views', 'DESC'); // Example sorting
    const products = await query.getMany();
    return { products, totalPages: 1 }; // Add pagination logic if needed
  } 
}