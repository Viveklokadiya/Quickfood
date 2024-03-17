const mongoose = require('mongoose');

const CheckoutSessionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    object: { type: String, required: true },
    after_expiration: { type: String }, // Update data type if necessary
    allow_promotion_codes: { type: Boolean },
    amount_subtotal: { type: Number, required: true },
    amount_total: { type: Number, required: true },
    automatic_tax: {
        enabled: { type: Boolean },
        liability: { type: String },
        status: { type: String }
    },
    billing_address_collection: { type: String }, // Update data type if necessary
    cancel_url: { type: String },
    client_reference_id: { type: String },
    client_secret: { type: String },
    consent: { type: String }, // Update data type if necessary
    consent_collection: { type: String }, // Update data type if necessary
    created: { type: Date },
    currency: { type: String, required: true },
    currency_conversion: { type: String }, // Update data type if necessary
    custom_fields: [String], // Update data type if necessary
    custom_text: {
        after_submit: { type: String },
        shipping_address: { type: String },
        submit: { type: String },
        terms_of_service_acceptance: { type: String }
    },
    customer: { type: String }, // Update data type if necessary
    customer_creation: { type: String },
    customer_details: {
        address: {
            city: { type: String },
            country: { type: String },
            line1: { type: String },
            line2: { type: String },
            postal_code: { type: String },
            state: { type: String }
        },
        email: { type: String },
        name: { type: String },
        phone: { type: String },
        tax_exempt: { type: String },
        tax_ids: [String] // Update data type if necessary
    },
    customer_email: { type: String },
    expires_at: { type: Date },
    invoice: { type: String }, // Update data type if necessary
    invoice_creation: {
        enabled: { type: Boolean },
        invoice_data: {
            account_tax_ids: [String], // Update data type if necessary
            custom_fields: [String], // Update data type if necessary
            description: { type: String },
            footer: { type: String },
            issuer: { type: String },
            metadata: { type: mongoose.Schema.Types.Mixed }, // Update data type if necessary
            rendering_options: { type: String }
        }
    },
    livemode: { type: Boolean },
    locale: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed }, // Update data type if necessary
    mode: { type: String },
    payment_intent: { type: String }, // Update data type if necessary
    payment_link: { type: String },
    payment_method_collection: { type: String }, // Update data type if necessary
    payment_method_configuration_details: { type: String }, // Update data type if necessary
    payment_method_options: {
        card: {
            request_three_d_secure: { type: String } // Update data type if necessary
        }
    },
    payment_method_types: [String], // Update data type if necessary
    payment_status: { type: String },
    phone_number_collection: {
        enabled: { type: Boolean }
    },
    recovered_from: { type: String }, // Update data type if necessary
    setup_intent: { type: String }, // Update data type if necessary
    shipping_address_collection: {
        allowed_countries: [String] // Update data type if necessary
    },
    shipping_cost: { type: Number }, // Update data type if necessary
    shipping_details: {
        address: {
            city: { type: String },
            country: { type: String },
            line1: { type: String },
            line2: { type: String },
            postal_code: { type: String },
            state: { type: String }
        },
        name: { type: String }
    },
    shipping_options: [String], // Update data type if necessary
    status: { type: String },
    submit_type: { type: String }, // Update data type if necessary
    subscription: { type: String }, // Update data type if necessary
    success_url: { type: String },
    total_details: {
        amount_discount: { type: Number }, // Update data type if necessary
        amount_shipping: { type: Number }, // Update data type if necessary
        amount_tax: { type: Number } // Update data type if necessary
    },
    ui_mode: { type: String },
    url: { type: String }
});

const CheckoutSession = mongoose.model('CheckoutSession', CheckoutSessionSchema);

module.exports = CheckoutSession;