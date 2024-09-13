export default function Modal({ source, onclose }) {
    const handleCloseOnOverlayClick = (e) => {
        onclose();
        if (!e.target.closest(".popup-card-content")) {
          onclose();
        }
      };
    return (
        <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 backdrop-blur-sm rounded-lg z-50"
      onClick={handleCloseOnOverlayClick}
        >

            <div className="fixed flex-col top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden z-50">
                <img src={source} width={300} height={20} alt="please wait..." />
            </div>
      </div>
    );
  }