import React from "react";

const ProfileServicesHistory = ({ serviceHistory }) => {
  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-2xl font-black mb-8">Service History</h2>
        <div className="space-y-4 max-w-4xl">
          {serviceHistory.map((service) => (
            <div
              key={service.id}
              className="bg-surface-secondary border border-border-secondary rounded-[1.5rem] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-text-primary transition-all group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                </div>
                <div>
                  <h3 className="text-lg font-black text-text-primary mb-1">
                    {service.service}
                  </h3>
                  <p className="text-sm font-medium text-text-secondary">
                    Provided by{" "}
                    <span className="text-text-primary font-bold underline decoration-border-secondary underline-offset-2">
                      {service.vendor}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-row-reverse md:flex-row items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-border-secondary">
                <div className="text-right md:text-right">
                  <p className="text-base font-black text-text-primary">
                    {service.price}
                  </p>
                  <p className="text-xs font-semibold text-text-muted mt-0.5">
                    {service.date}
                  </p>
                </div>
                <span
                  className={`px-3.5 py-1.5 text-xs font-black rounded-full uppercase tracking-widest ${
                    service.status === "Completed"
                      ? "bg-green-500/10 text-green-600 border border-green-500/20"
                      : "bg-red-500/10 text-red-600 border border-red-500/20"
                  }`}
                >
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileServicesHistory;
