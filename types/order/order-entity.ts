import { SimpleProductEntity } from '../product';

export interface SimpleOrderEntity {
  orderNo: number;
  orderId: string;
  createdAt: string;
  totalValue: number;
}

export interface DetailedOrderEntity {
  productId: string;
  orderedQty: number;
}

export interface OrderedProductEntity extends SimpleProductEntity, DetailedOrderEntity {}

export interface OrderDTO {
  products: OrderedProductEntity[];
  totalQty: number;
  totalValue: number;
  userId: string;
}

export interface OrderEntity extends OrderDTO {
  orderNo: number;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'dispatched' | 'completed';
}

export interface NewOrderEntity
  extends Omit<OrderEntity, 'orderId' | 'createdAt' | 'updatedAt' | 'orderNo' | 'status'> {
  orderNo?: number;
  orderId?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: 'pending' | 'dispatched' | 'completed';
}

export interface SuccessOrderResponse {
  status: number;
  message: string;
  orderNumber: number;
  orderId: string;
  paypalResponse: any;
}

export interface StripeSessionResponse extends Omit<SuccessOrderResponse, 'orderId'> {
  session: StripeSession;
}

type StripeSession = {
  id: string;
  object: string;
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
  balance: number;
  created: number;
  currency: string | null;
  default_source: string | null;
  delinquent: boolean;
  description: string | null;
  discount: any;
  email: string | null;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields: any[] | null;
    default_payment_method: string | null;
    footer: string | null;
    rendering_options: any | null;
  };
  livemode: boolean;
  metadata: {
    order_id: string;
  };
  name: string | null;
  next_invoice_sequence: number;
  phone: string | null;
  preferred_locales: string[];
  shipping: any;
  tax_exempt: string;
};
