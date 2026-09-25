import React, { useState, useEffect } from "react";
import {
  DataTable,
  StatusBadge,
  AdminModal,
} from "../../components/ui/AdminShared";
import toast from "react-hot-toast";
import { Plus, FileText, MapPin } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";
import MapPicker from "../../components/modals/MapPicker";

const columns = [
  { header: "Business", accessor: "business" },
  { header: "Owner", accessor: "owner" },
  { header: "Category", accessor: "category" },
  { header: "Rank", accessor: "rank" },
  // { header: "Rating", accessor: "rating" },
  {
    header: "Verification",
    accessor: "verification",
    render: (row) => (
      <StatusBadge
        status={
          row.verification === "Verified"
            ? "success"
            : row.verification === "Pending"
              ? "warning"
              : "default"
        }
      >
        {row.verification}
      </StatusBadge>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    render: (row) => (
      <StatusBadge
        status={
          row.status === "Active"
            ? "success"
            : row.status === "Suspended"
              ? "error"
              : "warning"
        }
      >
        {row.status}
      </StatusBadge>
    ),
  },
  { header: "Joined", accessor: "joined" },
];

export default function AdminBusinessesTab() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["adminBusinessApplications"],
    queryFn: adminApi.getBusinessApplicationAccepted,
  });

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Profile edit state
  const [isDetailsEditMode, setIsDetailsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    business_type: "",
    category_uuid: "",
    is_active: true,
  });

  // Ranking state
  const [isRankEditMode, setIsRankEditMode] = useState(false);
  const [newRank, setNewRank] = useState("");

  const rankMutation = useMutation({
    mutationFn: ({ profileId, rank }) =>
      adminApi.updateBusinessRank(profileId, rank),
    onSuccess: () => {
      toast.success("Business profile rank updated successfully.");
      setIsRankEditMode(false);
      queryClient.invalidateQueries(["adminBusinessApplications"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update rank");
    },
  });

  const handleRankUpdate = () => {
    if (newRank === "") return toast.error("Please enter a valid rank");
    rankMutation.mutate({
      profileId: selectedRow?.raw?.business_profile?.business_profile_uuid,
      rank: parseInt(newRank, 10),
    });
  };

  const updateProfileMutation = useMutation({
    mutationFn: ({ profileId, data }) =>
      adminApi.updateBusinessProfile(profileId, data),
    onSuccess: () => {
      toast.success("Business profile updated successfully.");
      setIsDetailsEditMode(false);
      queryClient.invalidateQueries(["adminBusinessApplications"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      profileId: selectedRow?.raw?.business_profile?.business_profile_uuid,
      data: editFormData,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openEditMode = () => {
    const profile = selectedRow?.raw?.business_profile || {};
    setEditFormData({
      name: profile?.name || "",
      description: profile?.description || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      location: profile?.location || "",
      website: profile?.website || "",
      business_type: profile?.business_type || "INDIVIDUAL",
      category_uuid: profile.category_uuid || "",
      is_active: profile.is_active !== false,
    });
    setIsDetailsEditMode(true);
  };

  const rawBusinesses = Array.isArray(apiData?.data) ? apiData.data : [];
  // console.log(rawBusinesses);

  useEffect(() => {
    if (!rawBusinesses.length) return;

    const formattedData = rawBusinesses.map((app) => {
      let locationText = app.location || "N/A";
      if (locationText.includes("<iframe")) {
        locationText = "Map Location Set";
      }

      return {
        id: app.business_application_uuid?.split("-")[0].toUpperCase() || "N/A",
        business: app.business_profile?.name || app.user_email || "N/A",
        owner: app.bank_account?.account_holder_name || "N/A",
        category: app.business_type || "N/A",
        rank:
          app.business_profile.rank !== undefined &&
          app.business_profile.rank !== null
            ? app.business_profile.rank
            : "Unranked",
        // rating: "N/A",
        verification:
          app.status === "APPROVED"
            ? "Verified"
            : app.status === "PENDING"
              ? "Pending"
              : app.status || "N/A",
        status: app.status === "APPROVED" ? "Active" : "Review",
        joined: app.created_at
          ? new Date(app.created_at).toISOString().split("T")[0]
          : "N/A",
        raw: app,
      };
    });

    setData(formattedData);
  }, [apiData]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-primary tracking-tight">
            Businesses Management
          </h2>
          <p className="text-text-secondary font-medium mt-1">
            Manage registered agencies and companies.
          </p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsRankEditMode(false);
          setIsModalOpen(true);
        }}
        onActionClick={(row) => {
          setSelectedRow(row);
          setIsRankEditMode(false);
          setIsModalOpen(true);
        }}
      />

      {selectedRow && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsRankEditMode(false);
            setIsDetailsEditMode(false);
          }}
          title="Business Details"
          locationPreview={
            selectedRow.raw?.location?.includes("<iframe")
              ? selectedRow.raw?.location
              : null
          }
        >
          {isDetailsEditMode ? (
            <form
              onSubmit={handleProfileUpdate}
              className="space-y-4 text-text-primary h-96 overflow-y-auto pr-2"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="w-full mt-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="w-full mt-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm focus:outline-none focus:border-black"
                    rows="3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                      className="w-full mt-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditChange}
                      className="w-full mt-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase flex items-center justify-between">
                      <span>Location</span>
                      <button
                        type="button"
                        onClick={() => setIsMapOpen(true)}
                        className="text-[10px] bg-surface-secondary px-2 py-0.5 rounded border border-border-primary hover:bg-zinc-200 text-black flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" /> Pick Location
                      </button>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleEditChange}
                      placeholder="Click 'Pick Location' to set map coordinates"
                      className="w-full mt-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase">
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      value={editFormData.website}
                      onChange={handleEditChange}
                      className="w-full mt-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase">
                      Business Type
                    </label>
                    <select
                      name="business_type"
                      value={editFormData.business_type}
                      onChange={handleEditChange}
                      className="w-full mt-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm focus:outline-none focus:border-black"
                    >
                      <option value="INDIVIDUAL">Individual</option>
                      <option value="AGENCY">Agency</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase">
                      Category UUID
                    </label>
                    <input
                      type="text"
                      name="category_uuid"
                      value={editFormData.category_uuid}
                      onChange={handleEditChange}
                      className="w-full mt-1 px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={editFormData.is_active}
                    onChange={handleEditChange}
                    id="isActiveEdit"
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="isActiveEdit"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Profile Active
                  </label>
                </div>
              </div>
              <div className="pt-4 flex gap-3 border-t border-border-primary sticky bottom-0 bg-surface-primary pb-2">
                <button
                  type="button"
                  onClick={() => setIsDetailsEditMode(false)}
                  className="flex-1 px-4 py-2 bg-surface-secondary text-text-primary font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="flex-1 px-4 py-2 bg-black text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  {updateProfileMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-text-primary h-96 overflow-y-auto pr-2">
              <div className="flex justify-between items-center pb-3 border-b border-border-primary">
                <div>
                  <h4 className="text-lg font-bold">{selectedRow.business}</h4>
                  <p className="text-xs text-text-secondary">
                    Owner: {selectedRow.owner}
                  </p>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={selectedRow.verification} />
                  <StatusBadge status={selectedRow.status} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Business ID
                  </p>
                  <p className="font-semibold">{selectedRow.id}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Category
                  </p>
                  <p className="font-semibold">{selectedRow.category}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Rating
                  </p>
                  <p className="font-semibold">{selectedRow.rating}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-bold uppercase">
                    Joined Date
                  </p>
                  <p className="font-semibold">{selectedRow.joined}</p>
                </div>

                {/* Contact Info Section */}
                <div className="col-span-2 pt-2 border-t border-border-primary">
                  <p className="text-xs text-zinc-400 font-bold uppercase mb-2">
                    Contact Information
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase">Email</p>
                      <p
                        className="font-semibold truncate"
                        title={
                          selectedRow.raw?.business_profile?.email ||
                          selectedRow.raw?.user_email ||
                          "N/A"
                        }
                      >
                        {selectedRow.raw?.business_profile?.email ||
                          selectedRow.raw?.user_email ||
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase">Phone</p>
                      <p className="font-semibold">
                        {selectedRow.raw?.business_profile?.phone || "N/A"}
                      </p>
                    </div>
                    {selectedRow.raw?.business_profile?.website && (
                      <div className="col-span-2">
                        <p className="text-xs text-zinc-500 uppercase">
                          Website
                        </p>
                        <a
                          href={selectedRow.raw.business_profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {selectedRow.raw.business_profile.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Identity Info Section */}
                {selectedRow.raw?.identity && (
                  <div className="col-span-2 pt-2 border-t border-border-primary">
                    <p className="text-xs text-zinc-400 font-bold uppercase mb-2">
                      Identity Details
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedRow.raw.identity.pan_number && (
                        <div>
                          <p className="text-xs text-zinc-500 uppercase">
                            PAN Number
                          </p>
                          <p className="font-semibold">
                            {selectedRow.raw.identity.pan_number}
                          </p>
                        </div>
                      )}
                      {selectedRow.raw.identity.gst_number && (
                        <div>
                          <p className="text-xs text-zinc-500 uppercase">
                            GST Number
                          </p>
                          <p className="font-semibold">
                            {selectedRow.raw.identity.gst_number}
                          </p>
                        </div>
                      )}
                      {selectedRow.raw.identity.aadhaar_number && (
                        <div>
                          <p className="text-xs text-zinc-500 uppercase">
                            Aadhaar Number
                          </p>
                          <p className="font-semibold">
                            {selectedRow.raw.identity.aadhaar_number}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bank Details Section */}
                {selectedRow.raw?.bank_account && (
                  <div className="col-span-2 pt-2 border-t border-border-primary">
                    <p className="text-xs text-zinc-400 font-bold uppercase mb-2">
                      Bank Details
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase">
                          Bank Name
                        </p>
                        <p className="font-semibold">
                          {selectedRow.raw.bank_account.bank_name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase">
                          Branch Name
                        </p>
                        <p className="font-semibold">
                          {selectedRow.raw.bank_account.branch_name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase">
                          Account Holder
                        </p>
                        <p className="font-semibold">
                          {selectedRow.raw.bank_account.account_holder_name ||
                            "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase">
                          Account Number
                        </p>
                        <p className="font-semibold">
                          {selectedRow.raw.bank_account.account_number || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase">
                          IFSC Code
                        </p>
                        <p className="font-semibold">
                          {selectedRow.raw.bank_account.ifsc_code || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Priority Rank Section */}
                {selectedRow.raw?.business_profile?.business_profile_uuid && (
                  <div className="col-span-2 pt-2 border-t border-border-primary">
                    <p className="text-xs text-zinc-400 font-bold uppercase">
                      Priority Rank
                    </p>
                    {isRankEditMode ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          min="0"
                          value={newRank}
                          onChange={(e) => setNewRank(e.target.value)}
                          className="w-24 px-3 py-1.5 bg-surface-secondary border border-border-primary rounded-lg text-sm text-text-primary focus:outline-none focus:border-black"
                          placeholder="e.g. 1"
                        />
                        <button
                          onClick={handleRankUpdate}
                          disabled={rankMutation.isPending}
                          className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
                        >
                          {rankMutation.isPending ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setIsRankEditMode(false)}
                          className="px-4 py-1.5 bg-surface-secondary text-text-primary text-xs font-bold rounded-lg border border-border-primary hover:bg-zinc-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 mt-1">
                        <p className="font-black text-lg">
                          {selectedRow?.raw?.business_profile?.rank !==
                            undefined &&
                          selectedRow?.raw?.business_profile?.rank !== null
                            ? selectedRow?.raw?.business_profile?.rank
                            : "Unranked"}
                        </p>
                        <button
                          onClick={() => {
                            setNewRank(
                              selectedRow?.raw?.business_profile?.rank || 0,
                            );
                            setIsRankEditMode(true);
                          }}
                          className="px-3 py-1 bg-surface-secondary text-xs font-bold text-text-primary rounded-lg border border-border-primary hover:bg-zinc-200 transition-colors"
                        >
                          Update Rank
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-zinc-400 mt-1 mb-3">
                      Higher rank pushes business up in search results.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions Section */}
              {selectedRow.raw?.business_profile?.business_profile_uuid && (
                <div className="pt-4 border-t border-border-primary sticky bottom-0 bg-surface-primary flex justify-end pb-2">
                  <button
                    onClick={openEditMode}
                    className="px-4 py-2 bg-surface-secondary border border-border-primary text-text-primary font-bold rounded-lg hover:bg-zinc-200 transition-colors text-sm"
                  >
                    Edit Profile Details
                  </button>
                </div>
              )}
            </div>
          )}
        </AdminModal>
      )}

      {/* Map Picker Modal */}
      <MapPicker
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onConfirm={(iframeString) => {
          setEditFormData((prev) => ({
            ...prev,
            location: iframeString,
          }));
        }}
      />
    </div>
  );
}
