import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  Sparkles,
  ClipboardX
} from 'lucide-react';
import { FieldObservation } from '../types';

interface DataTableProps {
  observations: FieldObservation[];
  onAddFirstObservation?: () => void;
}

export const DataTable: React.FC<DataTableProps> = ({ 
  observations,
  onAddFirstObservation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [marketFilter, setMarketFilter] = useState('ALL');
  const [productFilter, setProductFilter] = useState('ALL');
  const [sortField, setSortField] = useState<'date' | 'price'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return observations.filter((item) => {
      const matchesSearch = 
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMarket = marketFilter === 'ALL' || item.market === marketFilter;
      const matchesProduct = productFilter === 'ALL' || item.product === productFilter;

      return matchesSearch && matchesMarket && matchesProduct;
    });
  }, [observations, searchTerm, marketFilter, productFilter]);

  // Sort Logic
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
    });
  }, [filteredData, sortField, sortOrder]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage]);

  const toggleSort = (field: 'date' | 'price') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const uniqueMarkets = Array.from(new Set(observations.map(o => o.market)));
  const uniqueProducts = Array.from(new Set(observations.map(o => o.product)));

  return (
    <div className="bg-white rounded-2xl border border-agri-dark/8 shadow-soft overflow-hidden">
      {/* Header controls */}
      <div className="p-5 border-b border-agri-dark/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-agri-dark flex items-center gap-2">
              Recent Field Observations
              <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf px-2 py-0.5 rounded font-bold uppercase">
                Demo Data
              </span>
            </h3>
            <p className="text-xs text-agri-slateText">
              Real-time logs recorded by field investigators across Tamil Nadu markets.
            </p>
          </div>

          <div className="text-xs font-semibold text-agri-slateText bg-agri-offwhite px-3 py-1.5 rounded-xl border border-agri-dark/10 self-start sm:self-auto">
            Total Records: <strong className="text-agri-dark">{observations.length}</strong>
          </div>
        </div>

        {/* Search & Filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-agri-slateText absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search product, market, notes..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-3 py-2 bg-agri-offwhite border border-agri-dark/15 rounded-xl text-xs font-medium focus:ring-2 focus:ring-agri-leaf focus:bg-white transition-all"
            />
          </div>

          {/* Market filter */}
          <select
            value={marketFilter}
            onChange={(e) => { setMarketFilter(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-2 bg-agri-offwhite border border-agri-dark/15 rounded-xl text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf cursor-pointer"
          >
            <option value="ALL">All Markets ({uniqueMarkets.length})</option>
            {uniqueMarkets.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {/* Product filter */}
          <select
            value={productFilter}
            onChange={(e) => { setProductFilter(e.target.value); setCurrentPage(1); }}
            className="w-full px-3 py-2 bg-agri-offwhite border border-agri-dark/15 rounded-xl text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf cursor-pointer"
          >
            <option value="ALL">All Products ({uniqueProducts.length})</option>
            {uniqueProducts.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-agri-offwhite/80 border-b border-agri-dark/5 text-[11px] font-bold text-agri-slateText uppercase tracking-wider">
              <th className="py-3 px-4">
                <button 
                  onClick={() => toggleSort('date')}
                  className="flex items-center gap-1 hover:text-agri-dark transition-colors"
                >
                  Date <ArrowUpDown className="w-3 h-3 text-agri-gold" />
                </button>
              </th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Market</th>
              <th className="py-3 px-4">
                <button 
                  onClick={() => toggleSort('price')}
                  className="flex items-center gap-1 hover:text-agri-dark transition-colors"
                >
                  Price / kg <ArrowUpDown className="w-3 h-3 text-agri-gold" />
                </button>
              </th>
              <th className="py-3 px-4">Availability</th>
              <th className="py-3 px-4">Demand</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-agri-dark/5 text-xs">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <div className="max-w-xs mx-auto space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-agri-offwhite text-agri-slateText flex items-center justify-center mx-auto border border-agri-dark/10">
                      <ClipboardX className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-agri-dark">No field observations found</h4>
                    <p className="text-xs text-agri-slateText">Try clearing filters or search terms.</p>
                    {onAddFirstObservation && (
                      <button
                        onClick={onAddFirstObservation}
                        className="px-4 py-2 bg-agri-leaf text-white font-bold rounded-xl text-xs shadow hover:bg-agri-leafHover transition-all"
                      >
                        + Add First Observation
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-agri-lightLeaf/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-agri-dark">
                    {row.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-agri-dark">{row.product}</div>
                    <div className="text-[10px] text-agri-slateText">{row.variety}</div>
                  </td>
                  <td className="py-3.5 px-4 text-agri-dark font-medium">
                    {row.market}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-agri-leaf text-sm">
                    ₹{row.price}
                    <span className="text-[10px] font-normal text-agri-slateText ml-0.5">/kg</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      row.availability === 'High' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : row.availability === 'Medium'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {row.availability}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      row.demand === 'High' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : row.demand === 'Medium'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {row.demand}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                      row.status === 'Verified' ? 'text-emerald-700' : 'text-agri-leaf'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-agri-dark/5 bg-agri-offwhite/50 flex items-center justify-between text-xs">
        <span className="text-agri-slateText">
          Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({sortedData.length} records)
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-1.5 rounded-lg border border-agri-dark/15 text-agri-dark disabled:opacity-40 hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-1.5 rounded-lg border border-agri-dark/15 text-agri-dark disabled:opacity-40 hover:bg-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
