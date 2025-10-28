// Pricing configuration for Assignly
export const pricingConfig = {
  // Base prices for each work type (in Naira)
  basePrices: {
      assignment: 0,         // ₦0 - assignment is purely per-page
      presentation: 3000,    // ₦3,000.00 (flat rate)
      thesis: 7000,          // ₦7,000.00 (flat rate)
      report: 7000,          // ₦7,000.00 (flat rate)
      project: 15000,        // ₦15,000.00 (flat rate)
      writing_notes: 0       // ₦0 - writing notes is purely per-page
  },
  
  // Per-item pricing (in Naira)
  basePricePerPage: 300,            // ₦300 per page
  writingNotesPricePerPage: 300,    // ₦300 per page
  handwrittenPricePerPage: 400,     // ₦400 per page
  printingPricePerPage: 100,        // ₦100 per page
  diagramPrice: 200,                // ₦200 per diagram
  spiralBindingFee: 300,            // ₦300 for spiral binding
  impromptuFee: 500,                // ₦500 for tasks with < 3 days deadline
  
  deliveryTypes: {
    SOFT_COPY: 'soft_copy',
    PRINTED: 'printed',
    PRINTED_SPIRAL: 'printed_spiral',
    HANDWRITTEN: 'handwritten'
  },
  
  deliveryTypeLabels: {
    soft_copy: 'Soft Copy Only',
    printed: 'Printed Document',
    printed_spiral: 'Printed & Spiral Bound',
    handwritten: 'Handwritten'
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
    }

    // For assignments ONLY, add per-page writing cost
    if (workType === 'assignment') {
      if (deliveryType === pricingConfig.deliveryTypes.SOFT_COPY) {
        total += pageCount * pricingConfig.basePricePerPage;
      } else if (deliveryType === pricingConfig.deliveryTypes.PRINTED || 
                 deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
        total += pageCount * (pricingConfig.basePricePerPage + pricingConfig.printingPricePerPage);
      } else if (deliveryType === pricingConfig.deliveryTypes.HANDWRITTEN) {
        total += pageCount * pricingConfig.handwrittenPricePerPage;
      }
    }

    // For writing_notes, add per-page writing cost
    if (workType === 'writing_notes') {
      total += pageCount * pricingConfig.writingNotesPricePerPage;
    }

    // Diagrams cost (applies to all work types)
    total += diagramCount * pricingConfig.diagramPrice;

    // Delivery type cost for non-assignment work types
    if (workType !== 'assignment') {
      if (deliveryType === pricingConfig.deliveryTypes.PRINTED) {
        total += pageCount * pricingConfig.printingPricePerPage;
      } else if (deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
        total += pageCount * pricingConfig.printingPricePerPage;
        total += pricingConfig.spiralBindingFee;
      } else if (deliveryType === pricingConfig.deliveryTypes.HANDWRITTEN) {
        total += pageCount * pricingConfig.handwrittenPricePerPage;
      }
    }

    // Spiral binding fee for assignment printed spiral
    if (workType === 'assignment' && deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
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
    const basePrice = pricingConfig.basePrices[workType] || 0;
    if (basePrice > 0) {
      breakdown.push({
        item: `${workType.charAt(0).toUpperCase() + workType.slice(1)} Base Price`,
        amount: basePrice
      });
    }

    // For assignments, show per-page writing cost based on delivery type
    if (workType === 'assignment') {
      if (deliveryType === pricingConfig.deliveryTypes.SOFT_COPY) {
        breakdown.push({
          item: `Writing (${pageCount} pages × ₦${pricingConfig.basePricePerPage})`,
          amount: pageCount * pricingConfig.basePricePerPage
        });
      } else if (deliveryType === pricingConfig.deliveryTypes.PRINTED || 
                 deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
        breakdown.push({
          item: `Writing & Printing (${pageCount} pages × ₦${pricingConfig.basePricePerPage + pricingConfig.printingPricePerPage})`,
          amount: pageCount * (pricingConfig.basePricePerPage + pricingConfig.printingPricePerPage)
        });
      } else if (deliveryType === pricingConfig.deliveryTypes.HANDWRITTEN) {
        breakdown.push({
          item: `Handwritten (${pageCount} pages × ₦${pricingConfig.handwrittenPricePerPage})`,
          amount: pageCount * pricingConfig.handwrittenPricePerPage
        });
      }
    }

    // For writing_notes, show per-page writing cost
    if (workType === 'writing_notes') {
      breakdown.push({
        item: `Writing Service (${pageCount} pages × ₦${pricingConfig.writingNotesPricePerPage})`,
        amount: pageCount * pricingConfig.writingNotesPricePerPage
      });
    }

    // Diagrams
    if (diagramCount > 0) {
      breakdown.push({
        item: `Diagrams (${diagramCount} × ₦${pricingConfig.diagramPrice})`,
        amount: diagramCount * pricingConfig.diagramPrice
      });
    }

    // Delivery type for non-assignment work types
    if (workType !== 'assignment') {
      if (deliveryType === pricingConfig.deliveryTypes.PRINTED) {
        breakdown.push({
          item: `Printing (${pageCount} pages × ₦${pricingConfig.printingPricePerPage})`,
          amount: pageCount * pricingConfig.printingPricePerPage
        });
      } else if (deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
        breakdown.push({
          item: `Printing (${pageCount} pages × ₦${pricingConfig.printingPricePerPage})`,
          amount: pageCount * pricingConfig.printingPricePerPage
        });
        breakdown.push({
          item: 'Spiral Binding',
          amount: pricingConfig.spiralBindingFee
        });
      } else if (deliveryType === pricingConfig.deliveryTypes.HANDWRITTEN) {
        breakdown.push({
          item: `Handwritten (${pageCount} pages × ₦${pricingConfig.handwrittenPricePerPage})`,
          amount: pageCount * pricingConfig.handwrittenPricePerPage
        });
      }
    }

    // Spiral binding for assignment printed spiral
    if (workType === 'assignment' && deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
      breakdown.push({
        item: 'Spiral Binding',
        amount: pricingConfig.spiralBindingFee
      });
    }

    // Impromptu fee
    if (daysUntilDeadline < 3) {
      breakdown.push({
        item: 'Impromptu Service Fee (< 3 days deadline)',
        amount: pricingConfig.impromptuFee
      });
    }

    return breakdown;
  }
};

export default pricingConfig;