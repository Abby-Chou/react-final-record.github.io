export default function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="dot-wave-loader">
          Loading
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      )}
    </>
  );
}
