export function buildInquiryRecord(formData, inquiryItems) {
  return {
    id: Date.now(),
    ...formData,
    products: inquiryItems,
    createdAt: new Date().toISOString()
  };
}

export function buildInquiryMessage(formData, inquirySummary) {
  return [
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    `Category: ${formData.category}`,
    `Interested Products: ${inquirySummary}`,
    `Requirement: ${formData.message}`
  ].join("\n");
}

export function buildOrderDraft(customer, lineItems, subtotal) {
  return {
    id: Date.now(),
    customer,
    items: lineItems,
    subtotal,
    status: "inquiry-draft",
    createdAt: new Date().toISOString()
  };
}
