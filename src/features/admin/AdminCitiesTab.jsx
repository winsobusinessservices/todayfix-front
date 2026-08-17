import React, { useState } from "react";
import { DataTable, StatusBadge, AdminModal } from "../../components/ui/AdminShared";
import { MapPin, Plus } from "lucide-react";
import toast from "react-hot-toast";

const MOCK_CITIES = [
  { id: "CTY-101", city: "Bengaluru", state: "Karnataka", providers: 1205, businesses: 240, requests: 14500, status: "Active" },
  { id: "CTY-102", city: "Hyderabad", state: "Telangana", providers: 840, businesses: 112, requests: 9200, status: "Active" },
  { id: "CTY-103", city: "Mumbai", state: "Maharashtra", providers: 1530, businesses: 320, requests: 18400, status: "Active" },
  { id: "CTY-104", city: "Chennai", state: "Tamil Nadu", providers: 620, businesses: 85, requests: 5400, status: "Active" },
  { id: "CTY-105", city: "Pune", state: "Maharashtra", providers: 410, businesses: 45, requests: 3200, status: "Active" },
  { id: "CTY-106", city: "Delhi", state: "Delhi", providers: 120, businesses: 15, requests: 800, status: "Pending Launch" },
];

const AdminCitiesTab = () => {
  const [cities, setCities] = useState(MOCK_CITIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Row Click Modal State
  const [selectedCity, setSelectedCity] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Form State
  const [newCity, setNewCity] = useState({ city: "", state: "" });

  const columns = [
    { 
      header: "City", 
      accessor: "city",
      render: (row) => (
        <div>
          <p className="font-bold text-text-primary flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-500" /> {row.city}
          </p>
          <p className="text-xs text-text-secondary">{row.state}</p>
        </div>
      )
    },
    { header: "Active Providers", accessor: "providers", render: (row) => <span className="font-medium text-text-primary">{row.providers.toLocaleString()}</span> },
    { header: "Businesses", accessor: "businesses", render: (row) => <span className="font-medium text-text-primary">{row.businesses.toLocaleString()}</span> },
    { header: "Total Requests", accessor: "requests", render: (row) => <span className="font-medium text-text-primary">{row.requests.toLocaleString()}</span> },
    { header: "Status", accessor: "status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  const handleActionChange = (e) => {
    const action = e.target.value;
    e.target.value = ""; // Reset dropdown
    
    if (action === "launch") {
      setCities(cities.map(c => c.id === selectedCity.id ? { ...c, status: "Active" } : c));
      toast.success(`${selectedCity.city} is now Active!`);
      setIsDetailsModalOpen(false);
    } else if (action === "pause") {
      setCities(cities.map(c => c.id === selectedCity.id ? { ...c, status: "Suspended" } : c));
      toast.error(`Operations in ${selectedCity.city} paused.`);
      setIsDetailsModalOpen(false);
    } else if (action === "remove") {
      setCities(cities.filter(c => c.id !== selectedCity.id));
      toast.success(`Removed ${selectedCity.city} from platform.`);
      setIsDetailsModalOpen(false);
    }
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!newCity.city || !newCity.state) {
      toast.error("Please fill all fields");
      return;
    }
    
    const cityData = {
      id: `CTY-${Math.floor(Math.random() * 900) + 100}`,
      city: newCity.city,
      state: newCity.state,
      providers: 0,
      businesses: 0,
      requests: 0,
      status: "Pending Launch"
    };

    setCities([...cities, cityData]);
    setNewCity({ city: "", state: "" });
    setIsAddModalOpen(false);
    toast.success(`${cityData.city} added successfully!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Cities & Locations</h2>
          <p className="text-text-secondary font-medium mt-1">Manage geographic coverage and city operations.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark text-text-inverted border border-border-tertiary rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer">
          <Plus className="w-4 h-4" /> Add City
        </button>
      </div>

      <DataTable 
        columns={columns}
        data={cities}
        searchPlaceholder="Search cities or states..."
        onRowClick={(row) => {
          setSelectedCity(row);
          setIsDetailsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedCity(row);
          setIsDetailsModalOpen(true);
        }}
      />
      
      {selectedCity && (
        <AdminModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="City Operations"
          footer={
            <div className="w-full sm:w-auto">
              <select
                onChange={handleActionChange}
                className="w-full sm:w-auto px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl border border-border-primary outline-none focus:border-purple-500 cursor-pointer transition-colors"
                defaultValue=""
              >
                <option value="" disabled hidden>Select Action...</option>
                {selectedCity.status !== "Active" && <option value="launch">Launch Operations</option>}
                {selectedCity.status === "Active" && <option value="pause">Pause Operations</option>}
                <option value="remove">Remove City</option>
              </select>
            </div>
          }
        >
          <div className="space-y-4 text-text-primary">
            <p><strong>City:</strong> {selectedCity.city}</p>
            <p><strong>State:</strong> {selectedCity.state}</p>
            <p><strong>Providers:</strong> {selectedCity.providers}</p>
            <div>
              <strong className="mr-2">Current Status:</strong> 
              <StatusBadge status={selectedCity.status} />
            </div>
            
            <p className="text-sm text-text-secondary mt-4">
              Use the dropdown below to change this city's operational status.
            </p>
          </div>
        </AdminModal>
      )}

      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New City"
        footer={
          <>
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddCity}
              className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-500/20"
            >
              Add City
            </button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddCity}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">City Name</label>
            <input 
              type="text" 
              placeholder="e.g. Jaipur"
              value={newCity.city}
              onChange={(e) => setNewCity({...newCity, city: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 uppercase">State</label>
            <input 
              type="text" 
              placeholder="e.g. Rajasthan"
              value={newCity.state}
              onChange={(e) => setNewCity({...newCity, state: e.target.value})}
              className="w-full px-4 py-2.5 bg-surface-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-purple-500"
            />
          </div>
          <p className="text-xs text-text-secondary mt-2">
            New cities are added in "Pending Launch" state. You must explicitly launch operations when ready.
          </p>
        </form>
      </AdminModal>
    </div>
  );
};

export default AdminCitiesTab;
