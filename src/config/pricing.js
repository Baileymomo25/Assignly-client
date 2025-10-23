// Pricing configuration for Assignly
export const pricingConfig = {
  // Base prices for each work type (in kobo)
  basePrices: {
      assignment: 0,         // ₦0 - assignment is purely per-page
      presentation: 300000,  // ₦3,000.00 (flat rate)
      thesis: 700000,        // ₦7,000.00 (flat rate) - UPDATED
      report: 700000,        // ₦7,000.00 (flat rate)
      project: 1500000,      // ₦15,000.00 (flat rate) - UPDATED
      writing_notes: 0       // ₦0 - writing notes is purely per-page
  },
  
  // Per-item pricing (in kobo)
  basePricePerPage: 30000,   // ₦300 per page (for assignments and writing service) - UPDATED
  writingNotesPricePerPage: 30000, // ₦300 per page for writing service - UPDATED
  handwrittenPricePerPage: 40000, // ₦400 per page for handwritten - UPDATED
  printingPricePerPage: 10000, // ₦100 per page for printing - UPDATED
  diagramPrice: 20000,       // ₦200 per diagram - UPDATED
  spiralBindingFee: 30000,   // ₦300 for spiral binding
  impromptuFee: 50000,       // ₦500 for tasks with < 3 days deadline
  
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
        total += pageCount * pricingConfig.basePricePerPage; // ₦300 per page
      } else if (deliveryType === pricingConfig.deliveryTypes.PRINTED || 
                 deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
        total += pageCount * (pricingConfig.basePricePerPage + pricingConfig.printingPricePerPage); // ₦300 + ₦100 = ₦400 per page
      } else if (deliveryType === pricingConfig.deliveryTypes.HANDWRITTEN) {
        total += pageCount * pricingConfig.handwrittenPricePerPage; // ₦400 per page
      }
    }

    // For writing_notes, add per-page writing cost (always ₦300 per page)
    if (workType === 'writing_notes') {
      total += pageCount * pricingConfig.writingNotesPricePerPage; // ₦300 per page
    }

    // Diagrams cost (applies to all work types)
    total += diagramCount * pricingConfig.diagramPrice; // ₦200 per diagram

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

    // Spiral binding fee for printed spiral (for assignment, already included in per-page cost)
    if (workType !== 'assignment' && deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
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
        amount: basePrice / 100
      });
    }

    // For assignments, show per-page writing cost based on delivery type
    if (workType === 'assignment') {
      if (deliveryType === pricingConfig.deliveryTypes.SOFT_COPY) {
        breakdown.push({
          item: `Writing (${pageCount} pages × ₦${pricingConfig.basePricePerPage / 100})`,
          amount: (pageCount * pricingConfig.basePricePerPage) / 100
        });
      } else if (deliveryType === pricingConfig.deliveryTypes.PRINTED || 
                 deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
        breakdown.push({
          item: `Writing & Printing (${pageCount} pages × ₦${(pricingConfig.basePricePerPage + pricingConfig.printingPricePerPage) / 100})`,
          amount: (pageCount * (pricingConfig.basePricePerPage + pricingConfig.printingPricePerPage)) / 100
        });
      } else if (deliveryType === pricingConfig.deliveryTypes.HANDWRITTEN) {
        breakdown.push({
          item: `Handwritten (${pageCount} pages × ₦${pricingConfig.handwrittenPricePerPage / 100})`,
          amount: (pageCount * pricingConfig.handwrittenPricePerPage) / 100
        });
      }
    }

    // For writing_notes, show per-page writing cost
    if (workType === 'writing_notes') {
      breakdown.push({
        item: `Writing Service (${pageCount} pages × ₦${pricingConfig.writingNotesPricePerPage / 100})`,
        amount: (pageCount * pricingConfig.writingNotesPricePerPage) / 100
      });
    }

    // Diagrams
    if (diagramCount > 0) {
      breakdown.push({
        item: `Diagrams (${diagramCount} × ₦${pricingConfig.diagramPrice / 100})`,
        amount: (diagramCount * pricingConfig.diagramPrice) / 100
      });
    }

    // Delivery type for non-assignment work types
    if (workType !== 'assignment') {
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
      } else if (deliveryType === pricingConfig.deliveryTypes.HANDWRITTEN) {
        breakdown.push({
          item: `Handwritten (${pageCount} pages × ₦${pricingConfig.handwrittenPricePerPage / 100})`,
          amount: (pageCount * pricingConfig.handwrittenPricePerPage) / 100
        });
      }
    }

    // Spiral binding for assignment printed spiral
    if (workType === 'assignment' && deliveryType === pricingConfig.deliveryTypes.PRINTED_SPIRAL) {
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