import React, { useState } from "react";

const ProfileDetails = ({
  userData,
  handleInputChange,
  handleSaveProfile,
  isSaving,
  addresses,
  handleEditClick,
  editingAddressId,
  editForm,
  handleAddressChange,
  handleSaveAddress,
  handleCancelEdit,
  handleSetDefault,
}) => {
  const [addAddress, setAddAddress] = useState(false);

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* SECTION: Basic Info */}
        <div className="mb-14">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3 ml-0 md:ml-11">
            {/* <span className="w-8 h-8 rounded-full bg-surface-dark text-text-inverted flex items-center justify-center text-sm">
                    1
                  </span> */}
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
                  value={userData.firstName}
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
                  value={userData.lastName}
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
                value={userData.email}
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
                value={userData.phone}
                onChange={handleInputChange}
                className="w-full md:w-1/2 bg-surface-secondary border border-border-secondary text-text-primary rounded-2xl px-5 py-4 focus:outline-none focus:border-text-primary focus:ring-1 focus:ring-text-primary transition-all font-semibold"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-8 py-4 bg-surface-dark text-text-inverted font-black rounded-xl hover:bg-zinc-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg"
              >
                {isSaving ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full h-px bg-border-primary my-12"></div>

        {/* SECTION: Saved Addresses */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 max-w-4xl gap-4">
            <h2 className="text-2xl font-black flex items-center gap-3 ml-0 md:ml-11">
              {/* <span className="w-8 h-8 rounded-full bg-surface-dark text-text-inverted flex items-center justify-center text-sm">
                      2
                    </span> */}
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
              {/* Add address card */}
              {addAddress && (
                <div className="space-y-5 animate-in fade-in duration-300 bg-surface-primary p-3 md:p-6 rounded-2xl border border-border-primary shadow-inner">
                  <div className="flex items-center gap-2 mb-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                        Label (e.g. Home, Office)
                      </label>
                      <input
                        type="text"
                        name="label"
                        //   value={editForm.label}
                        //   onChange={handleAddressChange}
                        className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street"
                        //   value={editForm.street}
                        //   onChange={handleAddressChange}
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
                        //   value={editForm.city}
                        //   onChange={handleAddressChange}
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
                          // value={editForm.state}
                          // onChange={handleAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          // value={editForm.zip}
                          // onChange={handleAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 bg-surface-secondary p-4 rounded-xl border border-border-secondary">
                    <input
                      type="checkbox"
                      // id={`default-${address.id}`}
                      name="isDefault"
                      // checked={editForm.isDefault}
                      // onChange={handleAddressChange}
                      className="w-5 h-5 rounded border-border-secondary bg-surface-primary text-text-primary focus:ring-text-primary focus:ring-offset-0 cursor-pointer"
                    />
                    <label
                      // htmlFor={`default-${address.id}`}
                      className="ml-3 text-sm font-bold text-text-primary cursor-pointer"
                    >
                      Make this my default address
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-5 mt-2">
                    <button
                      onClick={() => handleSaveAddress(address.id)}
                      className="px-6 py-3 bg-surface-dark text-text-inverted font-black rounded-xl hover:bg-zinc-800 transition-all text-sm shadow-md active:scale-95"
                    >
                      Save Changes
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
            </>
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-surface-secondary border border-border-secondary rounded-2xl transition-all hover:border-text-primary group"
              >
                {/* VIEW MODE */}
                {editingAddressId !== address.id ? (
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        {address.label.toLowerCase() === "home" ? (
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
                            {address.label}
                          </h3>
                          {address.isDefault && (
                            <span className="px-2.5 py-1 bg-surface-dark text-text-inverted rounded text-[10px] font-black uppercase tracking-widest shadow-sm">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed font-medium">
                          {address.street}
                          <br />
                          {address.city}, {address.state} {address.zip}
                        </p>
                      </div>
                    </div>

                    {/* Actions (Edit / Make Default) */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto max-md:justify-between justify-end mt-4 sm:mt-0">
                      {!address.isDefault ? (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4 decoration-border-secondary hover:decoration-text-primary"
                        >
                          Set as Default
                        </button>
                      ) : (
                        <span></span>
                      )}
                      <button
                        onClick={() => handleEditClick(address)}
                        className="w-10 h-10 rounded-full bg-surface-primary hover:bg-surface-dark  hover:text-text-inverted text-text-primary flex items-center justify-center transition-all border border-border-primary shadow-sm active:scale-95"
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
                    </div>
                  </div>
                ) : (
                  /* EDIT MODE */
                  <div className="space-y-5 animate-in fade-in duration-300 bg-surface-primary p-3 md:p-6 rounded-2xl border border-border-primary shadow-inner">
                    <div className="flex items-center gap-2 mb-4">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          Label (e.g. Home, Office)
                        </label>
                        <input
                          type="text"
                          name="label"
                          value={editForm.label}
                          onChange={handleAddressChange}
                          className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={editForm.street}
                          onChange={handleAddressChange}
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
                          onChange={handleAddressChange}
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
                            onChange={handleAddressChange}
                            className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            name="zip"
                            value={editForm.zip}
                            onChange={handleAddressChange}
                            className="w-full bg-surface-secondary border border-border-secondary rounded-xl px-4 py-3.5 text-text-primary focus:border-text-primary focus:ring-1 focus:ring-text-primary outline-none text-sm font-semibold transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mt-4 bg-surface-secondary p-4 rounded-xl border border-border-secondary">
                      <input
                        type="checkbox"
                        id={`default-${address.id}`}
                        name="isDefault"
                        checked={editForm.isDefault}
                        onChange={handleAddressChange}
                        className="w-5 h-5 rounded border-border-secondary bg-surface-primary text-text-primary focus:ring-text-primary focus:ring-offset-0 cursor-pointer"
                      />
                      <label
                        htmlFor={`default-${address.id}`}
                        className="ml-3 text-sm font-bold text-text-primary cursor-pointer"
                      >
                        Make this my default address
                      </label>
                    </div>

                    <div className="flex items-center gap-3 pt-5 mt-2">
                      <button
                        onClick={() => handleSaveAddress(address.id)}
                        className="px-6 py-3 bg-surface-dark text-text-inverted font-black rounded-xl hover:bg-zinc-800 transition-all text-sm shadow-md active:scale-95"
                      >
                        Save Changes
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
      </div>
    </>
  );
};

export default ProfileDetails;
