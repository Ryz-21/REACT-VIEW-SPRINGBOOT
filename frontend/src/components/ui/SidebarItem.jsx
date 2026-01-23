
export default function SidebarItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-3 w-full px-4 py-2 rounded-lg
                text-left transition
                ${active
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"}
            `}
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </button>
    );
}
