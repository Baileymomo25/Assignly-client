// Pricing configuration for Assignly
export const pricingConfig = {
    basePricePerPage: 200, // 200 Naira per page
    diagramPrice: 100, // 100 Naira per diagram
    printingPricePerPage: 300, // 300 Naira per page for printing
    spiralBindingFee: 300, // 300 Naira for spiral binding
    impromptuFee: 500, // 500 Naira for tasks with < 3 days deadline
    
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
        pageCount,
        diagramCount = 0,
        deliveryType,
        deadline
      } = requirements;
  
      let total = 0;
  
      // Base writing cost
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
      const daysUntilDeadline = Math.ceil(
        (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysUntilDeadline < 3) {
        total += pricingConfig.impromptuFee;
      }
  
      return total;
    },
    
    // Get price breakdown for display
    getPriceBreakdown: (requirements) => {
      const {
        pageCount,
        diagramCount = 0,
        deliveryType,
        deadline
      } = requirements;
  
      const breakdown = [];
      const daysUntilDeadline = Math.ceil(
        (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
      );
  
      // Base writing
      breakdown.push({
        item: `Writing (${pageCount} pages × ₦${pricingConfig.basePricePerPage})`,
        amount: pageCount * pricingConfig.basePricePerPage
      });
  
      // Diagrams
      if (diagramCount > 0) {
        breakdown.push({
          item: `Diagrams (${diagramCount} × ₦${pricingConfig.diagramPrice})`,
          amount: diagramCount * pricingConfig.diagramPrice
        });
      }
  
      // Delivery type
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