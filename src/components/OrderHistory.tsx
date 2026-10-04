import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  onReorder: (order: Order) => void;
  onOpenToast: (msg: string) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  onReorder,
  onOpenToast,
}) => {
  const [filter, setFilter] = useState<'ALL' | OrderStatus>('ALL');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(orders[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((order) => {
    if (filter !== 'ALL' && order.status !== filter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchOrderNum = order.orderNumber.toLowerCase().includes(q);
      const matchItem = order.items.some(
        (i) => i.name.toLowerCase().includes(q) || i.flavor.toLowerCase().includes(q)
      );
      return matchOrderNum || matchItem;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#f59e0b]/15 text-[#fbbf24] border border-[#f59e0b]/40 px-2.5 py-1 text-xs font-space font-extrabold uppercase shadow-[2px_2px_0px_#000000]">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse" />
            PROCESSING // LAB PACKING
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/40 px-2.5 py-1 text-xs font-space font-extrabold uppercase shadow-[2px_2px_0px_#000000]">
            <span className="material-symbols-outlined text-xs">local_shipping</span>
            IN TRANSIT // ON TRUCK
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#c3f400]/15 text-[#c3f400] border border-[#c3f400]/40 px-2.5 py-1 text-xs font-space font-extrabold uppercase shadow-[2px_2px_0px_#000000]">
            <span className="material-symbols-outlined text-xs">verified</span>
            DELIVERED
          </span>
        );
      default:
        return (
          <span className="bg-[#2a292e] text-[#8f919d] px-2 py-0.5 text-xs font-space font-bold uppercase">
            {status}
          </span>
        );
    }
  };

  const handleCopyTracking = (tracking: string) => {
    navigator.clipboard?.writeText(tracking);
    onOpenToast(`✓ COPIED TRACKING NUMBER: ${tracking}`);
  };

  const handleDownloadInvoice = (orderNumber: string) => {
    onOpenToast(`📄 INVOICE FOR ${orderNumber} GENERATED AND DOWNLOADED!`);
  };

  const handleViewCOA = (orderNumber: string) => {
    onOpenToast(`🔬 BATCH #014 EUROFINS COA LAB REPORT OPENED FOR ${orderNumber}!`);
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2a292e]">
        <div>
          <h3 className="font-syne font-extrabold text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <span>ORDER HISTORY &amp; SHIPMENTS</span>
            <span className="text-xs font-space font-bold bg-[#2a292e] text-[#c3f400] px-2 py-0.5 border border-[#353439]">
              {orders.length} TOTAL
            </span>
          </h3>
          <p className="font-space text-xs text-[#8f919d] mt-1">
            Real-time batch tracking, fulfillment cleanroom telemetry, and one-click restocks.
          </p>
        </div>

        {/* Search by Order # or Product */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order or formula..."
            className="w-full bg-[#131317] border border-[#353439] focus:border-[#c3f400] text-xs font-space text-white px-3 py-2 outline-none pl-8"
          />
          <span className="material-symbols-outlined absolute left-2 top-2 text-[#8f919d] text-base">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-2 text-[#8f919d] hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['ALL', 'Processing', 'Shipped', 'Delivered'] as const).map((tab) => {
          const count =
            tab === 'ALL'
              ? orders.length
              : orders.filter((o) => o.status === tab).length;

          const isActive = filter === tab;

          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`font-space font-bold text-xs uppercase px-3.5 py-1.5 transition-all shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#c3f400] text-[#0e0e12] border border-[#c3f400]'
                  : 'bg-[#19181d] text-[#8f919d] border border-[#2a292e] hover:border-white hover:text-white'
              }`}
            >
              <span>{tab === 'ALL' ? 'ALL ORDERS' : tab}</span>
              <span
                className={`text-[10px] px-1 py-0.2 rounded font-extrabold ${
                  isActive ? 'bg-[#0e0e12] text-[#c3f400]' : 'bg-[#2a292e] text-[#8f919d]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-[#131317] border-2 border-dashed border-[#2a292e] p-12 text-center">
          <span className="material-symbols-outlined text-[#8f919d] text-4xl mb-2">
            package_2
          </span>
          <h4 className="font-syne font-bold text-lg uppercase text-white mb-1">
            NO ORDERS FOUND
          </h4>
          <p className="font-space text-xs text-[#8f919d] max-w-sm mx-auto">
            No purchases match the selected filter &quot;{filter}&quot; or search query. Check your other tabs or head to the active drops vault.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-[#19181d] border-2 border-[#2a292e] hover:border-[#353439] transition-all shadow-[4px_4px_0px_#000000] overflow-hidden"
              >
                {/* Order Summary Strip */}
                <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#141418] border-b border-[#2a292e]">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div>
                      <span className="font-space text-[10px] uppercase text-[#8f919d] block">
                        ORDER NUMBER
                      </span>
                      <span className="font-syne font-extrabold text-base sm:text-lg text-white tracking-wider">
                        #{order.orderNumber}
                      </span>
                    </div>

                    <div className="h-6 w-px bg-[#2a292e] hidden sm:block" />

                    <div>
                      <span className="font-space text-[10px] uppercase text-[#8f919d] block">
                        ORDER DATE
                      </span>
                      <span className="font-space font-bold text-xs text-[#e4e1e7]">
                        {order.date}
                      </span>
                    </div>

                    <div className="h-6 w-px bg-[#2a292e] hidden sm:block" />

                    <div>
                      <span className="font-space text-[10px] uppercase text-[#8f919d] block">
                        TOTAL AMOUNT
                      </span>
                      <span className="font-syne font-extrabold text-base text-[#c3f400]">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between lg:justify-end">
                    {getStatusBadge(order.status)}

                    <button
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="font-space text-xs font-bold text-[#8f919d] hover:text-[#c3f400] flex items-center gap-1 border border-[#2a292e] px-2.5 py-1.5 bg-[#19181d] transition-colors"
                    >
                      <span>{isExpanded ? 'COLLAPSE' : 'TRACK & DETAILS'}</span>
                      <span className="material-symbols-outlined text-sm">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Items Preview Row (Always visible brief thumbnail preview) */}
                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#131317] border border-[#2a292e] p-2.5 flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover shrink-0 border border-[#2a292e]"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-syne font-extrabold text-xs text-white uppercase truncate">
                            {item.name}
                          </h5>
                          <div className="font-space text-[10px] text-[#8f919d] truncate">
                            {item.flavor} • {item.size}
                          </div>
                          <div className="font-space font-bold text-xs text-[#c3f400] mt-0.5">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Quick Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#242329]">
                    <div className="flex items-center gap-2">
                      <span className="font-space text-[11px] text-[#8f919d]">
                        {order.status === 'Processing' && '⚡ Cleanroom compounding scheduled.'}
                        {order.status === 'Shipped' && `📦 In Transit via ${order.carrier} (${order.estimatedDelivery})`}
                        {order.status === 'Delivered' && `✓ ${order.estimatedDelivery}`}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleDownloadInvoice(order.orderNumber)}
                        className="font-space text-[11px] font-bold text-[#8f919d] hover:text-white px-2.5 py-1 border border-[#2a292e] hover:border-white transition-colors"
                      >
                        RECEIPT PDF
                      </button>

                      <button
                        onClick={() => handleViewCOA(order.orderNumber)}
                        className="font-space text-[11px] font-bold text-[#c3f400] hover:underline px-2 py-1"
                      >
                        VIEW LAB COA ↗
                      </button>

                      <button
                        onClick={() => onReorder(order)}
                        className="bg-[#c3f400] text-[#0e0e12] font-space font-extrabold text-xs uppercase px-4 py-1.5 shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                      >
                        ⚡ REORDER STACK
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Tracking Timeline & Order Breakdown */}
                {isExpanded && (
                  <div className="bg-[#111115] border-t-2 border-[#2a292e] p-4 sm:p-6 space-y-6 animate-fadeIn">
                    {/* Carrier & Tracking Bar */}
                    {order.trackingNumber && (
                      <div className="bg-[#19181d] border border-[#2a292e] p-3.5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#2a292e] flex items-center justify-center text-[#00e5ff]">
                            <span className="material-symbols-outlined text-base">
                              local_shipping
                            </span>
                          </div>
                          <div>
                            <span className="font-space text-[10px] text-[#8f919d] uppercase block">
                              CARRIER &amp; TRACKING IDENTIFIER
                            </span>
                            <span className="font-space font-bold text-xs text-white">
                              {order.carrier} — {order.trackingNumber}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyTracking(order.trackingNumber!)}
                            className="bg-[#242329] hover:bg-[#2a292e] text-white font-space text-[11px] font-bold px-3 py-1.5 border border-[#353439] flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-xs">content_copy</span>
                            COPY TRACKING
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Visual Vertical Stepper Timeline */}
                    <div>
                      <h6 className="font-syne font-extrabold text-xs uppercase text-[#8f919d] tracking-wider mb-4">
                        LIVE PROGRESSION TELEMETRY
                      </h6>

                      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#2a292e] space-y-6">
                        {order.timeline.map((step, idx) => {
                          let dotBg = 'bg-[#2a292e] border-[#353439]';
                          if (step.completed) {
                            dotBg = 'bg-[#c3f400] border-[#c3f400] shadow-[0_0_8px_#c3f400]';
                          } else if (step.current) {
                            dotBg = 'bg-[#00e5ff] border-[#00e5ff] shadow-[0_0_10px_#00e5ff] animate-pulse';
                          }

                          return (
                            <div key={idx} className="relative">
                              {/* Step dot */}
                              <span
                                className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border-2 ${dotBg} transition-all`}
                              />

                              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                <h6
                                  className={`font-syne font-extrabold text-sm uppercase ${
                                    step.completed
                                      ? 'text-white'
                                      : step.current
                                      ? 'text-[#00e5ff]'
                                      : 'text-[#8f919d]'
                                  }`}
                                >
                                  {step.title}
                                </h6>
                                <span className="font-space text-[10px] text-[#8f919d]">
                                  {step.timestamp}
                                </span>
                              </div>
                              <p className="font-space text-xs text-[#8f919d] mt-0.5">
                                {step.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Breakdown & Delivery Address Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#2a292e]">
                      <div className="bg-[#19181d] p-3.5 border border-[#2a292e]">
                        <span className="font-space text-[10px] text-[#8f919d] uppercase block mb-1">
                          DESTINATION ADDRESS
                        </span>
                        <p className="font-space text-xs text-white font-medium">
                          {order.shippingAddress}
                        </p>
                      </div>

                      <div className="bg-[#19181d] p-3.5 border border-[#2a292e] font-space text-xs space-y-1">
                        <div className="flex justify-between text-[#8f919d]">
                          <span>Subtotal:</span>
                          <span className="text-white">${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#8f919d]">
                          <span>VIP Member Discount:</span>
                          <span className="text-[#c3f400]">-${order.discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#8f919d]">
                          <span>Express Shipping:</span>
                          <span className="text-white">
                            {order.shipping === 0 ? 'FREE ($0.00)' : `$${order.shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between font-syne font-extrabold text-sm text-white pt-1 border-t border-[#2a292e]">
                          <span>Total Paid:</span>
                          <span className="text-[#c3f400]">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
