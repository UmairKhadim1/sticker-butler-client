import { gql } from '@apollo/client';
export const connectShop = gql`
  mutation connectShop(
    $shop: String!
    $code: String!
    $state: String!
    $hmac: String!
  ) {
    connect(input: { hmac: $hmac, shop: $shop, state: $state, code: $code }) {
      name
      createdAt
      updatedAt
      id
    }
  }
`;
export const getShops = gql`
  query {
    getShops {
      name
      id
      createdAt
      createdAt
      scope
    }
  }
`;
export const getShopifyOrders = gql`
  query {
    getOrders {
      id
      contact_email
      created_at
      total_price
      order_number
      user_id
      email
      customer {
        first_name
        last_name
        orders_count
        email
        phone
        state
        last_order{
            id
      contact_email
      created_at
      total_price
      order_number
      user_id
      
        }
        total_spent
        default_address {
          id
          customer_id
          first_name
          last_name
          company
          address1
          address2
          city
          province
          country
          zip
          phone
          name
          province_code
          country_code
          country_name
          default
        }
      }
    }
  }
`;

export const getDiscountCodes = gql`
  query getDiscountCodes {
    getDiscountPriceRules {
      id
      created_at
      value
      value_type
      title
      target_type
      target_selection
      starts_at
      ends_at
      usage_limit
      allocation_limit
      allocation_method
    }
  }
`;
export const createDiscountCodeMutation = gql`
  mutation createDiscountCodePriceRule(
    $title: String!
    $target_type: String!
    $target_selection: String!
    $allocation_method: String!
    $value_type: String!
    $value: String!
    $customer_selection: String!
    $starts_at: String!
    $discountCode: String!
    $usage_limit: String
    $once_per_customer: Boolean
  ) {
    createDiscountCodePriceRule(
      input: {
        title: $title
        target_type: $target_type
        target_selection: $target_selection
        allocation_method: $allocation_method
        value_type: $value_type
        value: $value
        customer_selection: $customer_selection
        starts_at: $starts_at
        discountCode: $discountCode
        usage_limit: $usage_limit
        once_per_customer: $once_per_customer
      }
    ) {
      price_rule_id
      codes
    }
  }
`;
