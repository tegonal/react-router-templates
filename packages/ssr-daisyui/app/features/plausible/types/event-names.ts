export enum EcommerceEvents {
  AddToCart = 'ecommerce.addToCart',
  ClearCart = 'ecommerce.clearCart',
  InitiateCheckout = 'ecommerce.initiateCheckout',
  ProductView = 'ecommerce.productView',
  RemoveFromCart = 'ecommerce.removeFromCart',
  SimilarProductClick = 'ecommerce.similarProductClick',
  UpdateCartQuantity = 'ecommerce.updateCartQuantity',
  VariantSelect = 'ecommerce.variantSelect',
  ViewCart = 'ecommerce.viewCart',
}

export enum GenericAppEvents {
  Error = 'app.error',
  PageView = 'pageview',
}

export enum UserActionEvents {
  ContactClick = 'user.contactClick',
}

export type PlausibleEventNames = EcommerceEventNames | GenericAppEventNames | UserActionEventNames

type EcommerceEventNames = (typeof EcommerceEvents)[keyof typeof EcommerceEvents]

type GenericAppEventNames = (typeof GenericAppEvents)[keyof typeof GenericAppEvents]

type UserActionEventNames = (typeof UserActionEvents)[keyof typeof UserActionEvents]
