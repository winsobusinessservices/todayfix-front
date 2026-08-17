import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  Filter,
  MoreVertical,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export const AdminModal = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg bg-surface-primary border border-border-primary shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between shrink-0">
              <h3 id="admin-modal-title" className="text-lg font-black text-text-primary">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 text-zinc-400 hover:text-text-primary rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 overflow-y-auto styled-scrollbar flex-1">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 bg-surface-secondary/50 border-t border-border-primary flex justify-end gap-3 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const StatusBadge = ({ status, children }) => {
  const colorConfig = {
    active: "bg-emerald-50 text-emerald-600 border-emerald-200",
    success: "bg-emerald-50 text-emerald-600 border-emerald-200",
    verified: "bg-emerald-50 text-emerald-600 border-emerald-200",
    published: "bg-emerald-50 text-emerald-600 border-emerald-200",
    resolved: "bg-emerald-50 text-emerald-600 border-emerald-200",
    
    pending: "bg-amber-50 text-amber-600 border-amber-200",
    review: "bg-amber-50 text-amber-600 border-amber-200",
    warning: "bg-amber-50 text-amber-600 border-amber-200",
    investigating: "bg-amber-50 text-amber-600 border-amber-200",
    
    suspended: "bg-red-50 text-red-600 border-red-200",
    rejected: "bg-red-50 text-red-600 border-red-200",
    hidden: "bg-red-50 text-red-600 border-red-200",
    error: "bg-red-50 text-red-600 border-red-200",
    
    assigned: "bg-blue-50 text-blue-600 border-blue-200",
    broadcasting: "bg-blue-50 text-blue-600 border-blue-200",
    
    default: "bg-zinc-100 text-zinc-700 border-zinc-200"
  };

  const statusKey = status?.toLowerCase() || "default";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${colorConfig[statusKey] || colorConfig.default}`}>
      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-75"></div>
      {children || status}
    </span>
  );
};

export const DataTable = ({
  columns,
  data,
  searchPlaceholder = "Search...",
  onRowClick,
  onActionClick,
  rowActions, // function: (row) => [{ label, onClick, destructive, icon }]
  onFilter,
  onExport,
}) => {
  const [openDropdownRowIndex, setOpenDropdownRowIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (openDropdownRowIndex === null) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdownRowIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownRowIndex]);

  // Deep search filter — flattens nested objects so searching "Arjun" finds {user: {name: "Arjun"}}
  const flattenValues = (obj) => {
    const vals = [];
    for (const val of Object.values(obj)) {
      if (val && typeof val === "object" && !Array.isArray(val)) {
        vals.push(...flattenValues(val));
      } else {
        vals.push(String(val));
      }
    }
    return vals;
  };

  const filteredData = data.filter((item) =>
    flattenValues(item).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleFilterClick = () => {
    if (onFilter) {
      onFilter();
    } else {
      toast("Filter panel toggled", { icon: "🔍" });
    }
  };

  const handleExportClick = () => {
    if (onExport) {
      onExport();
    } else {
      toast.success("Table data exported successfully!");
    }
  };

  return (
    <div className="bg-surface-primary border border-border-primary rounded-[1.25rem] shadow-sm flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 md:p-5 border-b border-border-primary flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button 
            onClick={handleFilterClick}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-surface-secondary transition-colors cursor-pointer"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button 
            onClick={handleExportClick}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-surface-secondary transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-secondary border-b border-border-secondary">
              <th className="px-5 py-3 w-12 text-center">
                <input type="checkbox" className="rounded border-zinc-300" />
              </th>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
              {(onActionClick || rowActions) && <th className="px-5 py-3 text-right"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-secondary">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1 + (onActionClick || rowActions ? 1 : 0)}
                  className="px-5 py-16 text-center text-zinc-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search className="w-8 h-8 text-zinc-300" />
                    <p className="font-medium text-sm">
                      No results found matching your search.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-surface-secondary/50 transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
                >
                  <td
                    className="px-5 py-4 w-12 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="rounded border-zinc-300"
                    />
                  </td>
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-5 py-4 text-sm text-text-primary align-middle"
                    >
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {(onActionClick || rowActions) && (
                    <td
                      className="px-5 py-4 text-right align-middle relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (rowActions) {
                          setOpenDropdownRowIndex(openDropdownRowIndex === rowIndex ? null : rowIndex);
                        } else if (onActionClick) {
                          onActionClick(row);
                        }
                      }}
                    >
                      <button className="p-1.5 text-zinc-400 hover:text-text-primary rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {rowActions && openDropdownRowIndex === rowIndex && (
                        <div 
                          ref={dropdownRef}
                          className="absolute right-8 top-10 w-48 bg-surface-primary border border-border-primary rounded-xl shadow-xl z-50 py-1 flex flex-col animate-in fade-in zoom-in-95 duration-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {rowActions(row).map((action, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => {
                                setOpenDropdownRowIndex(null);
                                action.onClick(row);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-secondary flex items-center gap-2 ${action.destructive ? "text-red-500 hover:text-red-600" : "text-text-primary"}`}
                            >
                              {action.icon && <action.icon className="w-4 h-4" />}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border-primary flex items-center justify-between bg-surface-secondary/30">
          <p className="text-xs font-medium text-zinc-500">
            Showing{" "}
            <span className="font-bold text-text-primary">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-text-primary">
              {Math.min(currentPage * itemsPerPage, filteredData.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-text-primary">
              {filteredData.length}
            </span>{" "}
            results
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-border-primary text-text-primary hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 text-sm font-bold text-text-primary">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-border-primary text-text-primary hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

