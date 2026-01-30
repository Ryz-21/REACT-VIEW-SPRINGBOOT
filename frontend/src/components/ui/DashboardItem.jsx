export default function DashboardItem({ icon, title, value, description, color }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <p className="text-3xl font-bold text-gray-800 my-2">{value}</p>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white`}>
                    {icon}
                </div>
            </div>
        </div>
    )
} 