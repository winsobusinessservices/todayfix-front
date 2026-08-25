const AppleLogin = () => {
  return (
    <>
      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface-primary border border-border-primary rounded-xl text-sm font-bold text-text-primary hover:bg-surface-secondary hover:border-border-secondary transition-all shadow-sm active:scale-95">
        <svg
          className="w-5 h-5 text-black"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.27-.77 3.65-.77 1.41.05 2.53.5 3.31 1.48-2.65 1.54-2.18 5.25.4 6.37-1.11 2.37-2.14 4.54-2.44 5.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        Apple
      </button>
    </>
  );
};

export default AppleLogin;