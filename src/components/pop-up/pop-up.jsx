import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Info,
  LoaderCircle,
  LogOut,
  Save,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export const popup = (header, desciption, type) => {
  const styles = {
    login: {
      border: "border-[#3FA65C]",
      bg: "bg-[#EFFBF1]",
      iconBg: "bg-[#3FA65C]",
      icon: "text-white",
    },

    logout: {
      border: "border-[#3A82D6]",
      bg: "bg-[#EFF6FF]",
      iconBg: "bg-transparent",
      icon: "text-[#2F80D9]",
    },

    register: {
      border: "border-[#3FA65C]",
      bg: "bg-[#EFFBF1]",
      iconBg: "bg-transparent",
      icon: "text-[#3FA65C]",
    },

    warning: {
      border: "border-[#E5B31B]",
      bg: "bg-[#FFF9E5]",
      iconBg: "bg-transparent",
      icon: "text-[#E7B31A]",
    },

    error: {
      border: "border-[#D73C3C]",
      bg: "bg-[#FFF0F0]",
      iconBg: "bg-transparent",
      icon: "text-[#D63838]",
    },

    info: {
      border: "border-[#3A82D6]",
      bg: "bg-[#EFF6FF]",
      iconBg: "bg-transparent",
      icon: "text-[#2F80D9]",
    },

    save: {
      border: "border-[#3FA65C]",
      bg: "bg-[#EFFBF1]",
      iconBg: "bg-transparent",
      icon: "text-[#3FA65C]",
    },

    loading: {
      border: "border-[#999999]",
      bg: "bg-[#F8F8F8]",
      iconBg: "bg-transparent",
      icon: "text-[#858585]",
    },
  };

  const style = styles[type] || styles.info;

  return toast.custom((t) => (
    <div
      className={`
        relative
        flex
        w-80
        items-center
        rounded-xl
        border
        ${style.border}
        ${style.bg}
        px-4
        py-3
        shadow-[0_12px_30px_rgba(0,0,0,0.16)]
      `}
    >
      {/* Close */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="
          absolute
          right-4
          top-4
          text-[#737A7C]
          transition
          hover:text-black
        "
      >
        <X size={20} strokeWidth={2.2} />
      </button>

      <div className="flex items-center gap-5">

        {/* Icon */}
        <div
          className={`
            flex
            items-center
            justify-center
            rounded-full
            ${style.iconBg}
          `}
        >
          {type === "login" && (
            <Check
              size={30}
              strokeWidth={2.5}
              className={style.icon}
            />
          )}

          {type === "logout" && (
            <LogOut
              size={30}
              strokeWidth={2.2}
              className={style.icon}
            />
          )}

          {type === "register" && (
            <UserRound
              size={30}
              strokeWidth={2.2}
              className={style.icon}
            />
          )}

          {type === "warning" && (
            <AlertTriangle
              size={30}
              strokeWidth={2.2}
              className={style.icon}
            />
          )}

          {type === "error" && (
            <XCircle
              size={30}
              strokeWidth={2.2}
              className={style.icon}
            />
          )}

          {type === "info" && (
            <Info
              size={30}
              strokeWidth={2.2}
              className={style.icon}
            />
          )}

          {type === "save" && (
            <Save
              size={30}
              strokeWidth={2.2}
              className={style.icon}
            />
          )}

          {type === "loading" && (
            <LoaderCircle
              size={30}
              strokeWidth={2.5}
              className={`animate-spin ${style.icon}`}
            />
          )}
        </div>

        {/* Text */}
        <div className="pr-5">
          <h3 className="text-xl font-semibold leading-tight text-black">
            {header}
          </h3>

          <p className="mt-2 leading-tight text-[#181818]">
            {desciption}
          </p>
        </div>

      </div>
    </div>
  ));
};
