import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, FindOptionsWhere } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductImage } from './entities/product-image.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FilterProductsDto } from '../dto/filter-products.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User): Promise<Product> {
    const { categoryId, images = [], ...productDetails } = createProductDto;

    // Find category
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Create and save product
    const product = this.productRepository.create({
      ...productDetails,
      category,
      seller: user,
    });
    
    await this.productRepository.save(product);

    // Add images if provided
    if (images.length > 0) {
      const productImages = images.map(url => 
        this.productImageRepository.create({ url, product })
      );
      await this.productImageRepository.save(productImages);
      product.images = productImages;
    }

    return product;
  }

  async findAll(filterDto: FilterProductsDto) {
    const { search, categoryId, minPrice, maxPrice, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = filterDto;
    
    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<Product> = {};

    // Apply filters
    if (search) {
      where.title = Like(`%${search}%`);
    }

    if (categoryId) {
      where.category = { id: categoryId };
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.price = Between(minPrice, Number.MAX_SAFE_INTEGER);
    } else if (maxPrice !== undefined) {
      where.price = Between(0, maxPrice);
    }

    // Get products with pagination
    const [products, total] = await this.productRepository.findAndCount({
      where,
      relations: ['category', 'seller', 'images'],
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'seller', 'images'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User): Promise<Product> {
    const product = await this.findOne(id);

    // Check if user is the seller
    if (product.seller.id !== user.id) {
      throw new BadRequestException('You can only update your own products');
    }

    const { categoryId, images, ...productDetails } = updateProductDto;

    // Update category if provided
    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
      product.category = category;
    }

    // Update basic product details
    Object.assign(product, productDetails);
    await this.productRepository.save(product);

    // Update images if provided
    if (images) {
      // Remove existing images
      await this.productImageRepository.delete({ product: { id } });
      
      // Add new images
      if (images.length > 0) {
        const productImages = images.map(url => 
          this.productImageRepository.create({ url, product })
        );
        await this.productImageRepository.save(productImages);
        product.images = productImages;
      }
    }

    return this.findOne(id);
  }

  async remove(id: string, user: User): Promise<void> {
    const product = await this.findOne(id);

    // Check if user is the seller
    if (product.seller.id !== user.id) {
      throw new BadRequestException('You can only delete your own products');
    }

    await this.productRepository.delete(id);
  }

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  async createCategory(name: string, description?: string) {
    const category = this.categoryRepository.create({ name, description });
    return this.categoryRepository.save(category);
  }
}