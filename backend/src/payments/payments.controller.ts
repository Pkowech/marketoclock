import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service'; // Ensure this file exists

@Controller('payments')
export class PaymentsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-intent')
  async createPaymentIntent(@Body() { amount }: { amount: number }) {
    return this.stripeService.createPaymentIntent(amount);
  }
}