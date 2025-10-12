// Pricing configuration for Assignly
export const pricingConfig = {
  // Base prices for each work type (in kobo - multiply by 100 for naira)
  basePrices: {
      assignment: 4999,      // ₦49.99 (existing)
      presentation: 299900,  // ₦3,000.00
      thesis: 499900,        // ₦5,000.00
      report: 699900,        // ₦7,000.00
      project: 999900       // ₦10,000.00
  },
  
  basePricePerPage: 20000,   // ₦200 per page (in kobo)
  diagramPrice: 10000,       // ₦100 per diagram (in kobo)
  printingPricePerPage: 30000, // ₦300 per page for printing (in kobo)
  spiralBindingFee: 30000,   // ₦300 for spiral binding (in kobo)
  impromptuFee: 50000,       // ₦500 for tasks with < 3 days deadline (in kobo)
  
  deliveryTypes: {
    SOFT_COPY: 'soft_copy',
    PRINTED: 'printed',
    PRINTED_SPIRAL: 'printed_spiral'
  },
  
  deliveryTypeLabels: {
    soft_copy: 'Soft Copy Only',
    printed: 'Printed Document',
    printed_spiral: 'Printed & Spiral Bound'
  },
  
  // Calculate total price based on requirements
  calculatePrice: (requirements) => {
    const {
      workType,
      pageCount,
      diagramCount = 0,
      deliveryType,
      deadline
    } = requirements;

    let total = 0;

    // Base price for work type
    if (pricingConfig.basePrices[workType]) {
      total += pricingConfig.basePrices[workType];
    } else {
      // Default base price if work type not found
      total += pricingConfig.basePrices.assignment;
    }

    // Base writing cost (per page)
    total += pageCount * pricingConfig.basePricePerPage;

    // Diagrams cost
    total += diagramCount * pricingConfig.diagramPrice;

    // Delivery type cost
    if (deliveryType === pricingConfig.deliveryTypes.PRINTED) {
      total += pageCount * pricingConfig.printingPricePerPage;
    } else if (deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
      total += pageCount * pricingConfig.printingPricePerPage;
      total += pricingConfig.spiralBindingFee;
    }

    // Impromptu fee (less than 3 days)
    if (deadline) {
      const daysUntilDeadline = Math.ceil(
        (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysUntilDeadline < 3) {
        total += pricingConfig.impromptuFee;
      }
    }

    return total;
  },
  
  // Get price breakdown for display
  getPriceBreakdown: (requirements) => {
    const {
      workType,
      pageCount,
      diagramCount = 0,
      deliveryType,
      deadline
    } = requirements;

    const breakdown = [];
    const daysUntilDeadline = deadline ? Math.ceil(
      (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
    ) : 0;

    // Base work type price
    const basePrice = pricingConfig.basePrices[workType] || pricingConfig.basePrices.assignment;
    breakdown.push({
      item: `${workType.charAt(0).toUpperCase() + workType.slice(1)} Base Price`,
      amount: basePrice / 100 // Convert to naira for display
    });

    // Base writing
    breakdown.push({
      item: `Writing (${pageCount} pages × ₦${pricingConfig.basePricePerPage / 100})`,
      amount: (pageCount * pricingConfig.basePricePerPage) / 100
    });

    // Diagrams
    if (diagramCount > 0) {
      breakdown.push({
        item: `Diagrams (${diagramCount} × ₦${pricingConfig.diagramPrice / 100})`,
        amount: (diagramCount * pricingConfig.diagramPrice) / 100
      });
    }

    // Delivery type
    if (deliveryType === pricingConfig.deliveryTypes.PRINTED) {
      breakdown.push({
        item: `Printing (${pageCount} pages × ₦${pricingConfig.printingPricePerPage / 100})`,
        amount: (pageCount * pricingConfig.printingPricePerPage) / 100
      });
    } else if (deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
      breakdown.push({
        item: `Printing (${pageCount} pages × ₦${pricingConfig.printingPricePerPage / 100})`,
        amount: (pageCount * pricingConfig.printingPricePerPage) / 100
      });
      breakdown.push({
        item: 'Spiral Binding',
        amount: pricingConfig.spiralBindingFee / 100
      });
    }

    // Impromptu fee
    if (daysUntilDeadline < 3) {
      breakdown.push({
        item: 'Impromptu Service Fee (< 3 days deadline)',
        amount: pricingConfig.impromptuFee / 100
      });
    }

    return breakdown;
  }
};

export default pricingConfig;