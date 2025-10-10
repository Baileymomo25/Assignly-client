// Add this to your Payment component, in the Order Summary section
<div className="space-y-3">
  <div className="flex justify-between">
    <span>Service Type:</span>
    <span className="font-medium capitalize">{requestData.workType}</span>
  </div>
  <div className="flex justify-between">
    <span>Pages:</span>
    <span className="font-medium">{requestData.pageCount} pages</span>
  </div>
  {requestData.diagramCount > 0 && (
    <div className="flex justify-between">
      <span>Diagrams:</span>
      <span className="font-medium">{requestData.diagramCount} diagrams</span>
    </div>
  )}
  <div className="flex justify-between">
    <span>Delivery:</span>
    <span className="font-medium">
      {pricingConfig.deliveryTypeLabels[requestData.deliveryType]}
    </span>
  </div>
  <div className="flex justify-between">
    <span>Deadline:</span>
    <span className="font-medium">
      {new Date(requestData.deadline).toLocaleDateString()}
      {getDaysUntilDeadline(requestData.deadline) < 3 && (
        <span className="text-red-600 ml-1">(Impromptu)</span>
      )}
    </span>
  </div>
  
  {/* Price Breakdown */}
  <div className="pt-3 border-t space-y-2">
    {requestData.priceBreakdown?.map((item, index) => (
      <div key={index} className="flex justify-between text-sm">
        <span>{item.item}</span>
        <span>₦{item.amount.toLocaleString()}</span>
      </div>
    ))}
  </div>
  
  <div className="flex justify-between text-lg font-semibold pt-3 border-t">
    <span>Total:</span>
    <span className="text-primary-600">₦{requestData.totalPrice.toLocaleString()}</span>
  </div>
</div>