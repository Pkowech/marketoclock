import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { Category } from '../categories/entities/category.entity';

export class ProductsModule {}
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}
  async findCategory(id: string): Promise<Category> {
    const category = await this.productRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(createProductDto: CreateProductDto, user: any): Promise<Product> {
    // Create the product entity without images
    const product = this.productRepository.create({
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      seller: user,
      category: { id: createProductDto.categoryId } as any, // TypeORM resolves the relation
    });

    // Save the product first
    const savedProduct = await this.productRepository.save(product);

    // Handle images if provided
    if (createProductDto.images && createProductDto.images.length > 0) {
      const productImages = createProductDto.images.map(url =>
        this.productImageRepository.create({ url, product: savedProduct }),
      );
      savedProduct.images = await this.productImageRepository.save(productImages);
    } else {
      savedProduct.images = []; // Initialize empty array if no images
    }

    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['seller', 'category', 'images'] });
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

  async update(id: string, updateProductDto: UpdateProductDto, user: any): Promise<Product> {
    const product = await this.findOne(id);
    if (product.seller.id !== user.id) {
      throw new BadRequestException('You can only update your own products');
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string, user: any): Promise<void> {
    const product = await this.findOne(id);
    if (product.seller.id !== user.id) {
      throw new BadRequestException('You can only delete your own products');
    }
    await this.productRepository.delete(id);
  }

  async getAllCategories(): Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  async createCategory(name: string, description: string | undefined): Promise<any> {
    return { name, description }; // Placeholder
  }
  async getCategory(id: string): Promise<any> {
    return { id }; // Placeholder
  }
  async updateCategory(id: string, name: string, description: string | undefined): Promise<any> {
    return { id, name, description }; // Placeholder
  }
  async deleteCategory(_id: string): Promise<void> {
    // Placeholder
  }
  async getProductsByCategoryAndSeller(categoryId: string, sellerId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { category: { id: categoryId }, seller: { id: sellerId } },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByCategoryAndPrice(categoryId: string, price: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { category: { id: categoryId }, price },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByCategoryAndStock(categoryId: string, stock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { category: { id: categoryId }, stock },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { category: { id: categoryId } },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsBySeller(sellerId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { seller: { id: sellerId } },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsBySearch(searchTerm: string): Promise<Product[]> {
    return this.productRepository.find({
      where: [
        { title: searchTerm },
        { description: searchTerm },
      ],
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductImages(productId: string): Promise<ProductImage[]> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['images'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product.images;
  }
  async addProductImage(productId: string, imageUrl: string): Promise<ProductImage> {
    const product = await this.findOne(productId);
    const productImage = this.productImageRepository.create({ url: imageUrl, product });
    return this.productImageRepository.save(productImage);
  }
  async removeProductImage(imageId: string): Promise<void> {
    const image = await this.productImageRepository.findOne({ where: { id: imageId } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${imageId} not found`);
    }
    await this.productImageRepository.delete(imageId);
  }
  async getProductImage(imageId: string): Promise<ProductImage> {
    const image = await this.productImageRepository.findOne({ where: { id: imageId } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${imageId} not found`);
    }
    return image;
  }
  async getProductsByPriceRange(min: number, max: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { price: Between(min, max) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByStock(stock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { stock },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByRating(rating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { rating },
      relations: ['seller', 'category', 'images'],
    });
  }

  async getProductsByPrice(price: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { price },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByStockRange(minStock: number, maxStock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { stock: Between(minStock, maxStock) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateRange(startDate: Date, endDate: Date): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: Between(startDate, endDate) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByRatingRange(minRating: number, maxRating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { rating: Between(minRating, maxRating) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByStockAndPrice(stock: number, price: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { stock, price },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByStockAndRating(stock: number, rating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { stock, rating },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDate(date: Date): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndPrice(date: Date, price: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, price },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndSellerAndCategory(date: Date, sellerId: string, categoryId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, seller: { id: sellerId }, category: { id: categoryId } },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndSeller(date: Date, sellerId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, seller: { id: sellerId } },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategory(date: Date, categoryId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId } },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndStock(date: Date, stock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, stock },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndStockAndPrice(date: Date, stock: number, price: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, stock, price },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndStockAndRating(date: Date, stock: number, rating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, stock, rating },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndRating(date: Date, rating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, rating },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndPriceRange(date: Date, min: number, max: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, price: Between(min, max) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndStockRange(date: Date, minStock: number, maxStock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, stock: Between(minStock, maxStock) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndRatingRange(date: Date, minRating: number, maxRating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, rating: Between(minRating, maxRating) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndStock(date: Date, categoryId: string, stock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, stock },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndRating(date: Date, categoryId: string, rating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, rating },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndPrice(date: Date, categoryId: string, price: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, price },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndStockRange(date: Date, categoryId: string, minStock: number, maxStock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, stock: Between(minStock, maxStock) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndRatingRange(date: Date, categoryId: string, minRating: number, maxRating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, rating: Between(minRating, maxRating) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndPriceRange(date: Date, categoryId: string, min: number, max: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, price: Between(min, max) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndPriceAndStock(date: Date, categoryId: string, price: number, stock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, price, stock },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndPriceAndRating(date: Date, categoryId: string, price: number, rating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, price, rating },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndStockAndRating(date: Date, categoryId: string, stock: number, rating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, stock, rating },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndStockAndPrice(date: Date, categoryId: string, stock: number, price: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, stock, price },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndStockAndRatingRange(date: Date, categoryId: string, stock: number, minRating: number, maxRating: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, stock, rating: Between(minRating, maxRating) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndStockAndPriceRange(date: Date, categoryId: string, stock: number, min: number, max: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, stock, price: Between(min, max) },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndRatingAndPrice(date: Date, categoryId: string, rating: number, price: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, rating, price },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndRatingAndStock(date: Date, categoryId: string, rating: number, stock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, rating, stock },
      relations: ['seller', 'category', 'images'],
    });
  }
  async getProductsByDateAndCategoryAndRatingAndStockRange(date: Date, categoryId: string, rating: number, minStock: number, maxStock: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { createdAt: date, category: { id: categoryId }, rating, stock: Between(minStock, maxStock) },
      relations: ['seller', 'category', 'images'],
    });
  }

}
