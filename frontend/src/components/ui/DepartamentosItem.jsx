export default function DepartamentosItem({label, icon: Icon, active, onClick       }){
    return(
        <button
            onClick={onClick}
            className={`
                w-full flex items-center gap-3
                px-4 py-3 rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${
                    active
                        ? "bg-[#6c63ff]/10 text-[#6c63ff]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
            `}
        >
            {Icon && (
                <Icon
                    size={20}
                    className={active ? "text-[#6c63ff]" : "text-slate-400"}
                />
            )}

            <span>{label}</span>
        </button>
    )
}