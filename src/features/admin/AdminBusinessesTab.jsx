import React, { useState, useEffect } from "react";
import {
  DataTable,
  StatusBadge,
  AdminModal,
} from "../../components/ui/AdminShared";
import toast from "react-hot-toast";
import { Plus, FileText } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";

const columns = [
  { header: "Business", accessor: "business" },
  { header: "Owner", accessor: "owner" },
  { header: "Category", accessor: "category" },
  { header: "Rank", accessor: "rank" },
  { header: "Rating", accessor: "rating" },
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
    queryFn: adminApi.getBusinessApplications,
  });

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ranking state
  const [isRankEditMode, setIsRankEditMode] = useState(false);
  const [newRank, setNewRank] = useState("");

  const rankMutation = useMutation({
    mutationFn: ({ profileId, rank }) => adminApi.updateBusinessRank(profileId, rank),
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
      profileId: selectedRow.raw.business_profile_uuid,
      rank: parseInt(newRank, 10),
    });
  };

  const rawBusinesses = Array.isArray(apiData?.data) ? apiData.data : [];

  useEffect(() => {
    if (!rawBusinesses.length) return;

    const formattedData = rawBusinesses.map((app) => {
      let locationText = app.location || "N/A";
      if (locationText.includes("<iframe")) {
        locationText = "Map Location Set";
      }

      return {
        id: app.business_application_uuid?.split("-")[0].toUpperCase() || "N/A",
        business:
          app.bank_account?.account_holder_name || app.user_email || "N/A",
        owner: app.bank_account?.account_holder_name || "N/A",
        category: app.business_type || "N/A",
        rank: app.rank !== undefined && app.rank !== null ? app.rank : "Unranked",
        rating: "N/A",
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
          }}
          title="Business Details"
          locationPreview={
            selectedRow.raw?.location?.includes("<iframe")
              ? selectedRow.raw.location
              : null
          }
        >
          <div className="space-y-4 text-text-primary">
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

              {/* Priority Rank Section */}
              {selectedRow.raw?.business_profile_uuid && (
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
                        {selectedRow.raw.rank !== undefined && selectedRow.raw.rank !== null
                          ? selectedRow.raw.rank
                          : "Unranked"}
                      </p>
                      <button
                        onClick={() => {
                          setNewRank(selectedRow.raw.rank || 0);
                          setIsRankEditMode(true);
                        }}
                        className="px-3 py-1 bg-surface-secondary text-xs font-bold text-text-primary rounded-lg border border-border-primary hover:bg-zinc-200 transition-colors"
                      >
                        Update Rank
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-zinc-400 mt-1">
                    Higher rank pushes business up in search results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
