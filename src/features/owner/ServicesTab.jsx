import React, { useState } from "react";
import { Plus, IndianRupee, Edit2, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_SERVICES = [
  {
    id: 1,
    name: "Deep Home Cleaning",
    price: "4500",
    active: true,
    description:
      "Complete deep cleaning of 3BHK including bathrooms and kitchen.",
  },
  {
    id: 2,
    name: "AC Servicing & Repair",
    price: "1200",
    active: true,
    description: "Standard jet cleaning and gas check for split ACs.",
  },
  {
    id: 3,
    name: "Sofa Dry Cleaning",
    price: "800",
    active: false,
    description: "Per seat dry cleaning with industrial vacuum.",
  },
];

const ToggleSwitch = ({ active, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 shrink-0 ${active ? "bg-text-primary" : "bg-surface-secondary border border-border-primary"}`}
  >
    <div
      className={`w-4 h-4 rounded-full transition-transform duration-300 ${active ? "bg-surface-primary translate-x-6" : "bg-zinc-500 translate-x-0"}`}
    />
  </button>
);

const ServicesTab = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const toggleService = (id) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  };

  const deleteService = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", description: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      price: service.price,
      description: service.description,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setServices(
        services.map((s) => (s.id === editingId ? { ...s, ...formData } : s)),
      );
    } else {
      setServices([...services, { id: Date.now(), ...formData, active: true }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">
            My Services
          </h1>
          <p className="text-zinc-400">
            Manage what you offer and your pricing.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md"
        >
          <Plus size={20} />
          Add New Service
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-surface-primary rounded-3xl border p-6 shadow-2xl shadow-black/5 transition-all duration-300 ${
              service.active
                ? "border-border-primary"
                : "border-border-primary opacity-60 grayscale"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-1 text-2xl font-black tracking-tight text-text-primary">
                <IndianRupee className="w-5 h-5 text-zinc-400" />
                {Number(service.price).toLocaleString()}
              </div>
              <ToggleSwitch
                active={service.active}
                onToggle={() => toggleService(service.id)}
              />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-text-primary mb-2">
              {service.name}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2 mb-6">
              {service.description}
            </p>

            <div className="flex justify-end gap-2 pt-4 border-t border-border-primary">
              <button
                onClick={() => openEditModal(service)}
                className="p-2 text-zinc-500 hover:text-text-primary transition-colors bg-surface-secondary rounded-lg border border-transparent hover:border-border-primary"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => deleteService(service.id)}
                className="p-2 text-zinc-500 hover:text-red-500 transition-colors bg-surface-secondary rounded-lg border border-transparent hover:border-red-500/20 hover:bg-red-500/10"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="col-span-full text-center py-20 bg-surface-primary rounded-3xl border border-border-primary">
            <p className="text-zinc-500 font-medium">No services added yet.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface-primary rounded-3xl border border-border-primary shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-border-primary flex justify-between items-center">
                <h2 className="text-xl font-black text-text-primary tracking-tight">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-text-primary"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-1">
                    Service Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors"
                    placeholder="e.g. Sofa Cleaning"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-1">
                    Price (₹)
                  </label>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors"
                    placeholder="e.g. 500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 text-text-primary font-medium focus:outline-none focus:border-text-primary transition-colors resize-none h-24"
                    placeholder="Describe what is included..."
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-border-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesTab;
