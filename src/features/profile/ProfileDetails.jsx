import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../../services/addressApi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle } from "lucide-react";
import { updateProfile } from "../../services/userApi";
import { validatePhone } from "../../utils/phoneValidator";

const ProfileDetails = ({ userData, setUserData }) => {
  const queryClient = useQueryClient();
  const [addAddress, setAddAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (userData && !initialData) {
      setInitialData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        profileImage: userData.profileImage,
      });
    }
  }, [userData, initialData]);
  const initialAddressForm = {
    address_line: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
    location: "",
    address_type: "HOME",
    is_default: false,
  };
  const [addressForm, setAddressForm] = useState(initialAddressForm);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const {
    data: addresses,
    isLoading: addressesLoading,
    error: addressesError,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  useEffect(() => {
    if (addresses) {
      setAddress(addresses);
    }
  }, [addresses]);

  const { mutate: addAddressMutate, isPending: isAddingAddress } = useMutation({
    mutationFn: createAddress,
    onSuccess: (response) => {
      toast.success("Address added successfully");
      setAddAddress(false);
      setAddressForm(initialAddressForm);
      queryClient.invalidateQueries(["addresses"]);
    },
    onError: () => toast.error("Failed to add address"),
  });

  const { mutate: updateAddressMutate, isPending: isUpdatingAddress } =
    useMutation({
      mutationFn: updateAddress,
      onSuccess: () => {
        toast.success("Address updated successfully");
        setEditingAddressId(null);
        queryClient.invalidateQueries(["addresses"]);
      },
      onError: () => toast.error("Failed to update address"),
    });

  const { mutate: deleteAddressMutate, isPending: isDeletingAddress } =
    useMutation({
      mutationFn: deleteAddress,
      onSuccess: () => {
        toast.success("Address deleted successfully");
        queryClient.invalidateQueries(["addresses"]);
      },
      onError: () => toast.error("Failed to delete address"),
    });

  const {
    mutate: updateProfileMutate,
    isPending: isUpdatingProfile,
    error,
    isError,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data?.message);
      setInitialData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        profileImage: userData.profileImage,
      });
      queryClient.invalidateQueries(["user"]);
    },
    onError: (data) => toast.error(data?.response?.data?.message),
  });

  const handleGetCurrentLocation = (formSetter) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          formSetter((prev) => ({
            ...prev,
            location:
              position.coords.latitude.toString() +
              "," +
              position.coords.longitude.toString(),
            // latitude: position.coords.latitude.toString(),
            // longitude: position.coords.longitude.toString(),
          }));
          toast.success("Location retrieved successfully");
        },
        (error) => {
          toast.error("Error getting location. Please allow location access.");
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const errors = {};

    const phoneErrors = validatePhone(userData.phone);
    if (phoneErrors.length > 0) {
      errors.phone = "Phone number " + phoneErrors[0] + ".";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors({});
    }

    const hasChanged =
      userData.firstName !== initialData?.firstName ||
      userData.lastName !== initialData?.lastName ||
      userData.phone !== initialData?.phone ||
      (userData.profileImage || "") !== (initialData?.profileImage || "");

    if (!hasChanged) {
      toast.success("No changes detected in your profile.");
      return;
    }

    updateProfileMutate({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      profileImage: userData.profileImage || "",
    });
  };

  const getFieldError = (fieldName) => {
    if (validationErrors[fieldName]) return validationErrors[fieldName];
    if (isError && error?.response?.data?.[fieldName]) {
      const err = error.response.data[fieldName];
      return Array.isArray(err) ? err[0] : err;
    }
    return null;
  };

  const handleEditClick = (addr) => {
    setEditingAddressId(addr.id);
    setEditForm({ ...addr });
  };

  const handleSaveNewAddress = () => {
    addAddressMutate(addressForm);
  };

  const handleSaveEditAddress = (id) => {
    updateAddressMutate({ addressId: id, addressData: editForm });
  };

  const handleSetDefault = (addr) => {
    updateAddressMutate({
      addressId: addr.id,
      addressData: { ...addr, is_default: true },
    });
  };

  const handleDeleteAddress = (id) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = () => {
    if (confirmDeleteId) {
      deleteAddressMutate(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingAddressId(null);
    setEditForm({});
  };

  const handleEditAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-14">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3 ml-0 md:ml-11">
            Account Settings
          </h2>
          <form
            onSubmit={handleSaveProfile}
            className="space-y-6 max-w-3xl ml-0 md:ml-11"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={userData?.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={userData?.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2">
                Email Address
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </label>
              <input
                type="email"
                value={userData?.email}
                disabled
                className="w-full bg-surface-secondary/50 border border-border-secondary rounded-2xl px-5 py-4 text-text-muted cursor-not-allowed select-none font-semibold"
              />
              <p className="text-xs text-text-muted mt-2 font-medium">
                To change your email address, please contact support.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={userData?.phone}
                onChange={handleInputChange}
                className="w-full md:w-1/2 bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all font-semibold"
              />
              {getFieldError("phone") && (
                <p className="text-xs text-red-500 mt-1">
                  {getFieldError("phone")}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="px-8 py-4 bg-surface-dark text-text-inverted font-black rounded-xl hover:bg-zinc-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg disabled:opacity-70"
              >
                {isUpdatingProfile ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full h-px bg-border-primary my-12"></div>
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 max-w-4xl gap-4">
            <h2 className="text-2xl font-black flex items-center gap-3 ml-0 md:ml-11">
              Saved Addresses
            </h2>
            <button
              onClick={() => setAddAddress(!addAddress)}
              className="text-sm font-bold text-text-primary hover:opacity-70 transition-opacity flex items-center gap-2 bg-surface-secondary px-4 py-2 rounded-full border border-border-secondary"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {addAddress ? "Cancel Edit" : "Add New Address"}
            </button>
          </div>

          <div className="space-y-6 max-w-4xl ml-0 md:ml-11">
            <>
              {addAddress && (
                <div className="space-y-5 animate-in fade-in duration-300 bg-surface-primary p-3 md:p-6 rounded-2xl border border-border-primary shadow-inner">
                  <div className="flex items-center gap-2 mb-4 justify-between">
                    <h3 className="font-black text-lg text-text-primary flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Add New Address
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleGetCurrentLocation(setAddressForm)}
                      className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-200 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Use Current Location
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                        Address Type
                      </label>
                      <select
                        name="address_type"
                        value={addressForm.address_type}
                        onChange={handleNewAddressChange}
                        className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                      >
                        <option value="HOME">Home</option>
                        <option value="WORK">Work</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                        Address Line
                      </label>
                      <input
                        type="text"
                        name="address_line"
                        value={addressForm.address_line}
                        onChange={handleNewAddressChange}
                        className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                        Locality
                      </label>
                      <input
                        type="text"
                        name="locality"
                        value={addressForm.locality}
                        onChange={handleNewAddressChange}
                        className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={addressForm.city}
                        onChange={handleNewAddressChange}
                        className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleNewAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={addressForm.pincode}
                          onChange={handleNewAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 bg-surface-secondary p-4 rounded-xl border border-border-secondary">
                    <input
                      type="checkbox"
                      id="new-is-default"
                      name="is_default"
                      checked={addressForm.is_default}
                      onChange={handleNewAddressChange}
                      className="w-5 h-5 rounded border-border-secondary bg-surface-primary text-text-primary focus:ring-text-primary focus:ring-offset-0 cursor-pointer"
                    />
                    <label
                      htmlFor="new-is-default"
                      className="ml-3 text-sm font-bold text-text-primary cursor-pointer"
                    >
                      Make this my default address
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-5 mt-2">
                    <button
                      onClick={handleSaveNewAddress}
                      disabled={isAddingAddress}
                      className="px-6 py-3 bg-surface-dark text-text-inverted font-black rounded-xl hover:bg-zinc-800 transition-all text-sm shadow-md active:scale-95 disabled:opacity-70"
                    >
                      {isAddingAddress ? "Saving..." : "Save Address"}
                    </button>
                    <button
                      onClick={() => setAddAddress(false)}
                      className="px-6 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-surface-primary transition-all text-sm border border-border-secondary active:scale-95"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
            {addresses?.data?.map((address) => (
              <div
                key={address?.id}
                className="bg-surface-secondary border border-border-secondary rounded-2xl transition-all hover:border-text-primary group"
              >
                {editingAddressId !== address?.id ? (
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        {address?.address_type?.toUpperCase() === "HOME" ? (
                          <svg
                            className="w-5 h-5 text-text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-black text-xl text-text-primary">
                            {address?.address_type}
                          </h3>
                          {address?.is_default && (
                            <span className="px-2.5 py-1 bg-surface-dark text-text-inverted rounded text-[10px] font-black uppercase tracking-widest shadow-sm">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium">
                          {address?.address_line}{" "}
                          {address?.locality ? `, ${address.locality}` : ""}
                          <br />
                          {address?.city}, {address?.state} {address?.pincode}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto max-md:justify-start justify-end mt-4 sm:mt-0">
                      {!address?.is_default && (
                        <button
                          onClick={() => handleSetDefault(address)}
                          className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4 decoration-border-secondary hover:decoration-text-primary"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => handleEditClick(address)}
                        className="w-10 h-10 rounded-full bg-surface-primary  hover:bg-surface-dark  hover:text-text-inverted text-text-primary flex items-center justify-center transition-all border border-border-primary shadow-sm active:scale-95"
                        title="Edit Address"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address?.id)}
                        disabled={isDeletingAddress}
                        className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition-all border border-red-100 shadow-sm active:scale-95"
                        title="Delete Address"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* EDIT MODE */
                  <div className="space-y-5 animate-in fade-in duration-300 bg-surface-primary p-3 md:p-6 rounded-2xl border border-border-primary shadow-inner">
                    <div className="flex items-center gap-2 mb-4 justify-between">
                      <h3 className="font-black text-lg text-text-primary flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit Address
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleGetCurrentLocation(setEditForm)}
                        className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Use Current Location
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          Address Type
                        </label>
                        <select
                          name="address_type"
                          value={editForm.address_type}
                          onChange={handleEditAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        >
                          <option value="HOME">Home</option>
                          <option value="WORK">Work</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          Address Line
                        </label>
                        <input
                          type="text"
                          name="address_line"
                          value={editForm.address_line}
                          onChange={handleEditAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          Locality
                        </label>
                        <input
                          type="text"
                          name="locality"
                          value={editForm.locality || ""}
                          onChange={handleEditAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={editForm.city}
                          onChange={handleEditAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={editForm.state}
                            onChange={handleEditAddressChange}
                            className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                            Pincode
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={editForm.pincode}
                            onChange={handleEditAddressChange}
                            className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mt-4 bg-surface-secondary p-4 rounded-xl border border-border-secondary">
                      <input
                        type="checkbox"
                        id={`default-${address?.id}`}
                        name="is_default"
                        checked={editForm.is_default}
                        onChange={handleEditAddressChange}
                        className="w-5 h-5 rounded border-border-secondary bg-surface-primary text-text-primary focus:ring-text-primary focus:ring-offset-0 cursor-pointer"
                      />
                      <label
                        htmlFor={`default-${address?.id}`}
                        className="ml-3 text-sm font-bold text-text-primary cursor-pointer"
                      >
                        Make this my default address
                      </label>
                    </div>

                    <div className="flex items-center gap-3 pt-5 mt-2">
                      <button
                        onClick={() => handleSaveEditAddress(address?.id)}
                        disabled={isUpdatingAddress}
                        className="px-6 py-3 bg-surface-dark text-text-inverted font-black rounded-xl hover:bg-zinc-800 transition-all text-sm shadow-md active:scale-95 disabled:opacity-70"
                      >
                        {isUpdatingAddress ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-surface-primary transition-all text-sm border border-border-secondary active:scale-95"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {confirmDeleteId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm border">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface-primary border border-border-primary rounded-3xl p-6 max-w-sm w-full shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4 text-red-500">
                  <AlertCircle size={24} />
                  <h3 className="text-xl font-bold text-text-primary">
                    Delete Address?
                  </h3>
                </div>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                  Are you sure you want to delete this address? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="flex-1 px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    No, Keep it
                  </button>
                  <button
                    onClick={executeDelete}
                    className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProfileDetails;
